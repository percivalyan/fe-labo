import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createMyService,
  deleteMyService,
  getMyService,
  listMyServices,
  updateMyService,
} from "../services/MyServiceService";

import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Layanan = () => {
  const [myServices, setMyServices] = useState([]);
  const [selectedMyService, setSelectedMyService] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [serviceCode, setServiceCode] = useState("");
  const [serviceName, setServiceName] = useState("");

  // const { serviceId } = useParams();
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    serviceCode: "",
    serviceName: "",
  });

  useEffect(() => {
    if (selectedMyService) {
      getMyService(selectedMyService)
        .then((response) => {
          setServiceCode(response.data.serviceCode);
          setServiceName(response.data.serviceName);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getAllMyServices();
    }
  }, [selectedMyService]);

  // fungsinya untuk memvalidasi isi form bahwa form ini tidak boleh kosong
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (serviceCode.trim()) {
      errorsCopy.serviceCode = "";
    } else {
      errorsCopy.serviceCode = "Kode Layanan wajib di isi";
      valid = false;
    }

    if (serviceName.trim()) {
      errorsCopy.serviceName = "";
    } else {
      errorsCopy.serviceName = "Nama Layanan wajib di isi";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  //   fungsinya untuk melakukan simpan atau update data
  function saveOrUpdateMyService(e) {
    e.preventDefault();

    if (validateForm()) {
      const myService = { serviceCode, serviceName };

      if (serviceId) {
        updateMyService(serviceId, myService)
          .then((response) => {
            console.log(response.data);
            setServiceId("");
            setUpdatePopupOpen(false);
            getAllMyServices();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createMyService(myService)
          .then((response) => {
            console.log(response.data);
            setCreatePopupOpen(false);
            getAllMyServices();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }
  // Refresh

  const resetForm = () => {
    setServiceId("");
    setServiceCode("");
    setServiceName("");
    setErrors({
      serviceCode: "",
      serviceName: "",
    });
  };

  // untuk respon data list
  function getAllMyServices() {
    listMyServices()
      .then((response) => {
        setMyServices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // Untuk menampilkan di dalam table list
  // useEffect(() => {
  //   getAllMyServices();
  // }, []);

  const removeMyService = (id) => {
    deleteMyService(id)
      .then(() => {
        setDeletePopupOpen(false);
        getAllMyServices();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const handleEdit = (id) => {
    const selectedService = myServices.find((service) => service.id === id);
    if (selectedService) {
      setServiceCode(selectedService.serviceCode);
      setServiceName(selectedService.serviceName);
      setServiceId(id); // Set the serviceId here
      setUpdatePopupOpen(true);
    } else {
      console.error(`Service with id ${id} not found.`);
    }
  };

  // TOMBOL ADD NEW JENIS LAYANAN
  function viewServiceType(id) {
    navigator(`/layanan/${id}/kategori`);
  }

  return (
    <div className="layanan">
      <h2>Layanan</h2>
      <div>
        <button
          onClick={() => {
            setServiceId("");
            setCreatePopupOpen(true);
          }}
          className="btn btn-primary mx-2"
        >
          Create Layanan
        </button>
        {/* <button className="btn btn-secondary mx-2">
          Kategori Layanan
        </button> */}
        {/* Tombol untuk navigasi ke kategori layanan */}
        {/* <Link to="/kategori/layanan" className="btn btn-secondary mx-2">
          Kategori Layanan
        </Link> */}
        {/* <button className="btn btn-secondary mx-2">
          Cetak Data
        </button> */}
      </div>

      {isCreatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Create Layanan</h3>
            <input
              type="text"
              placeholder="Masukkan Kode Layanan"
              name="serviceCode"
              // value={serviceCode}
              className={` ${errors.serviceCode ? "is-invalid" : ""}`}
              onChange={(e) => setServiceCode(e.target.value)}
            ></input>
            {errors.serviceCode && (
              <div className="invalid-feedback"> {errors.serviceCode} </div>
            )}
            <input
              type="text"
              placeholder="Masukkan Nama Layanan"
              name="serviceName"
              // value={serviceName}
              className={` ${errors.serviceName ? "is-invalid" : ""}`}
              onChange={(e) => setServiceName(e.target.value)}
            ></input>
            {errors.serviceName && (
              <div className="invalid-feedback"> {errors.serviceName} </div>
            )}
            <button onClick={saveOrUpdateMyService}>Create</button>
            <button onClick={() => setCreatePopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Edit Layanan</h3>
            <input
              type="text"
              placeholder="Masukkan Kode Layanan"
              name="serviceCode"
              value={serviceCode}
              className={` ${errors.serviceCode ? "is-invalid" : ""}`}
              onChange={(e) => setServiceCode(e.target.value)}
            ></input>
            {errors.serviceCode && (
              <div className="invalid-feedback"> {errors.serviceCode} </div>
            )}
            <input
              type="text"
              placeholder="Masukkan Nama Layanan"
              name="serviceName"
              value={serviceName}
              className={`${errors.serviceName ? "is-invalid" : ""}`}
              onChange={(e) => setServiceName(e.target.value)}
            ></input>
            {errors.serviceName && (
              <div className="invalid-feedback"> {errors.serviceName} </div>
            )}
            <button onClick={saveOrUpdateMyService}>Update</button>
            <button
              onClick={() => {
                setServiceId("");
                setUpdatePopupOpen(false);
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
            <th>Kode Layanan</th>
            <th>Nama Layanan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myServices.map((myService) => (
            <tr key={myService.id}>
              <td>{myService.serviceCode}</td>
              <td>{myService.serviceName}</td>
              <td>
                <button onClick={() => handleEdit(myService.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>

                <button onClick={() => setDeletePopupOpen(true)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>

                <button
                  onClick={() => viewServiceType(myService.id)}
                  style={{ margin: "1px" }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                {isDeletePopupOpen && (
                  <div className="popup-box">
                    <div className="popup">
                      <h3>Delete Layanan</h3>
                      <p>Are you sure you want to delete this service?</p>
                      <button onClick={() => removeMyService(myService.id)}>
                        Yes
                      </button>
                      <button
                        onClick={() => {
                          setServiceId("");
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

export default Layanan;
