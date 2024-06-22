import { useEffect, useState } from "react";

import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  updateProject,
} from "../../services/master/Project";

const Projek = () => {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [namaProjek, setNamaProjek] = useState("");
  const [telp, setTelp] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    namaProjek: "",
    telp: "",
  });

  // fungsinya untuk memvalidasi isi form bahwa form ini tidak boleh kosong
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (namaProjek.trim()) {
      errorsCopy.namaProjek = "";
    } else {
      errorsCopy.namaProjek = "Kode Layanan wajib di isi";
      valid = false;
    }

    if (telp.trim()) {
      errorsCopy.telp = "";
    } else {
      errorsCopy.telp = "Nama Layanan wajib di isi";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  //   fungsinya untuk melakukan simpan atau update data
  function saveOrUpdateProject(e) {
    e.preventDefault();

    if (validateForm()) {
      const project = { namaProjek, telp, fax, email };

      if (projectId) {
        updateProject(projectId, project)
          .then((response) => {
            console.log(response.data);
            setProjectId("");
            setUpdatePopupOpen(false);
            getAllProjects();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createProject(project)
          .then((response) => {
            console.log(response.data);
            setCreatePopupOpen(false);
            getAllProjects();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  // untuk respon data projek list
  function getAllProjects() {
    listProjects()
      .then((response) => {
        setProjects(response.data || []); // Ensure projects is an array
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Untuk menampilkan list
  // useEffect(() => {
  //   getAllProjects();
  // }, []);

  useEffect(() => {
    if (selectedProject) {
      getProject(selectedProject)
        .then((response) => {
          setNamaProjek(response.data.namaProjek);
          setTelp(response.data.telp);
          setFax(response.data.fax);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getAllProjects();
    }
  }, [selectedProject]);

  const removeProject = (id) => {
    deleteProject(id)
      .then(() => {
        setDeletePopupOpen(false);
        getAllProjects();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (id) => {
    const selectedProject = projects.find((project) => project.idProjek === id);
    if (selectedProject) {
      setNamaProjek(selectedProject.namaProjek);
      setTelp(selectedProject.telp);
      setFax(selectedProject.fax);
      setEmail(selectedProject.email);
      setProjectId(id); // Set the projekid here
      setUpdatePopupOpen(true);
    } else {
      console.error(`Projek with id ${id} not found.`);
    }
  };

  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  return (
    <div className="master">
      <h2>Projek</h2>

      <div>
        <button
          onClick={() => {
            setCreatePopupOpen(true);
            setProjectId("");
          }}
          className="btn btn-primary mx-2"
        >
          Create Projek
        </button>
      </div>

      {isCreatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Create Projek</h3>
            <input
              type="text"
              name="namaProjek"
              placeholder="Nama Projek"
              className={` ${errors.namaProjek ? "is-invalid" : ""}`}
              onChange={(e) => setNamaProjek(e.target.value)}
            ></input>
            {errors.namaProjek && (
              <div className="invalid-feedback"> {errors.namaProjek} </div>
            )}
            <input
              type="text"
              name="telp"
              placeholder="Telepon / WhatsApp"
              className={` ${errors.telp ? "is-invalid" : ""}`}
              onChange={(e) => setTelp(e.target.value)}
            ></input>
            {errors.telp && (
              <div className="invalid-feedback"> {errors.telp} </div>
            )}
            <input
              type="text"
              name="fax"
              onChange={(e) => setFax(e.target.value)}
              placeholder="Fax"
            />
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button onClick={saveOrUpdateProject}>Create</button>
            <button onClick={() => setCreatePopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Edit Projek</h3>
            <input
              type="text"
              name="namaProjek"
              value={namaProjek}
              className={` ${errors.namaProjek ? "is-invalid" : ""}`}
              onChange={(e) => setNamaProjek(e.target.value)}
            ></input>
            {errors.namaProjek && (
              <div className="invalid-feedback"> {errors.namaProjek} </div>
            )}
            <input
              type="text"
              name="telp"
              value={telp}
              className={` ${errors.telp ? "is-invalid" : ""}`}
              onChange={(e) => setTelp(e.target.value)}
            ></input>
            {errors.telp && (
              <div className="invalid-feedback"> {errors.telp} </div>
            )}
            <input
              type="text"
              name="fax"
              value={fax}
              onChange={(e) => setFax(e.target.value)}
              placeholder="Fax"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button onClick={saveOrUpdateProject}>Update</button>
            <button
              onClick={() => {
                setUpdatePopupOpen(false);
                setProjectId("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Kode Projek</th>
            <th>Nama Projek</th>
            <th>Telp/Fax</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.idProjek}>
              <td>{project.namaProjek}</td>
              <td>{project.telp}</td>
              <td>{project.fax}</td>
              <td>{project.email}</td>
              <td>
                <button onClick={() => handleEdit(project.idProjek)}>
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeletePopupOpen(true);
                  }}
                >
                  Delete
                </button>
                {isDeletePopupOpen && (
                  <div className="popup-box">
                    <div className="popup">
                      <h3>Delete Projek</h3>
                      <p>Are you sure you want to delete this project?</p>
                      <button onClick={() => removeProject(project.idProjek)}>
                        Yes
                      </button>
                      <button
                        onClick={() => {
                          setProjectId("");
                          setDeletePopupOpen(false);
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projek;
