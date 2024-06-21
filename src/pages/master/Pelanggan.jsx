import { useEffect, useState } from "react";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  listCustomers,
  updateCustomer,
} from "../../services/master/Customer";

const Pelanggan = () => {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [kodePelanggan, setKodePelanggan] = useState("");
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [npwp, setNpwp] = useState("");
  const [alamat, setAlamat] = useState("");

  const [errors, setErrors] = useState({
    kodePelanggan: "",
    namaPelanggan: "",
  });

  // untuk respon data customer list
  function getAllCustomers() {
    listCustomers()
      .then((response) => {
        setCustomers(response.data || []); // Ensure customers is an array
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // fungsinya untuk memvalidasi isi form bahwa form ini tidak boleh kosong
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (kodePelanggan.trim()) {
      errorsCopy.serviceCode = "";
    } else {
      errorsCopy.serviceCode = "Kode Layanan wajib di isi";
      valid = false;
    }

    if (namaPelanggan.trim()) {
      errorsCopy.serviceName = "";
    } else {
      errorsCopy.serviceName = "Nama Layanan wajib di isi";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function saveOrUpdateCustomer(e) {
    e.preventDefault();
    if (validateForm()) {
      const customer = {
        kodePelanggan,
        namaPelanggan,
        npwp,
        alamat,
      };

      if (customerId) {
        updateCustomer(customerId, customer)
          .then((response) => {
            console.log(response.data);
            setCustomerId("");
            setUpdatePopupOpen(false);
            getAllCustomers();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createCustomer(customer)
          .then((response) => {
            console.log(response.data);
            setCreatePopupOpen(false);
            getAllCustomers();
          })
          .catch((error) => {
            console.error("There was an error creating the customer!", error);
          });
      }
    }
  }

  useEffect(() => {
    if (selectedCustomer) {
      getCustomer(selectedCustomer)
        .then((response) => {
          setKodePelanggan(response.data.kodePelanggan);
          setNamaPelanggan(response.data.namaPelanggan);
          setNpwp(response.data.npwp);
          setAlamat(response.data.alamat);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getAllCustomers();
    }
  }, [selectedCustomer]);

  const removeRequest = (id) => {
    deleteCustomer(id)
      .then(() => {
        setDeletePopupOpen(false);
        getAllCustomers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const handleEdit = (id) => {
    const selectedCustomer = customers.find(
      (customer) => customer.idPelanggan === id
    );
    if (selectedCustomer) {
      setKodePelanggan(selectedCustomer.kodePelanggan);
      setNamaPelanggan(selectedCustomer.namaPelanggan);
      setNpwp(selectedCustomer.npwp);
      setAlamat(selectedCustomer.alamat);
      setCustomerId(id); // Set the customerId here
      setUpdatePopupOpen(true);
    } else {
      console.error(`Customer with id ${id} not found.`);
    }
  };

  return (
    <div className="pelanggan">
      <h2>Pelanggan</h2>

      <div>
        <button
          onClick={() => {
            setCustomerId("");
            setCreatePopupOpen(true);
          }}
          className="btn btn-primary mx-2"
        >
          Create Pelanggan
        </button>
      </div>

      {isCreatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Create Pelanggan</h3>
            <input
              type="text"
              placeholder="Masukkan Kode Pelanggan"
              name="kodePelanggan"
              className={` ${errors.kodePelanggan ? "is-invalid" : ""}`}
              onChange={(e) => setKodePelanggan(e.target.value)}
            ></input>
            {errors.kodePelanggan && (
              <div className="invalid-feedback"> {errors.kodePelanggan} </div>
            )}
            <input
              type="text"
              placeholder="Masukkan Nama Pelanggan"
              name="namaPelanggan"
              className={` ${errors.namaPelanggan ? "is-invalid" : ""}`}
              onChange={(e) => setNamaPelanggan(e.target.value)}
            ></input>
            {errors.namaPelanggan && (
              <div className="invalid-feedback"> {errors.namaPelanggan} </div>
            )}
            <input
              type="text"
              placeholder="NPWP"
              name="npwp"
              onChange={(e) => setNpwp(e.target.value)}
            />
            <input
              type="text"
              placeholder="Alamat"
              name="alamat"
              onChange={(e) => setAlamat(e.target.value)}
            />
            <button onClick={saveOrUpdateCustomer}>Create</button>
            <button onClick={() => setCreatePopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Edit Pelanggan</h3>
            <input
              type="text"
              placeholder="Masukkan Kode Pelanggan"
              name="kodePelanggan"
              value={kodePelanggan}
              className={` ${errors.kodePelanggan ? "is-invalid" : ""}`}
              onChange={(e) => setKodePelanggan(e.target.value)}
            ></input>
            {errors.kodePelanggan && (
              <div className="invalid-feedback"> {errors.kodePelanggan} </div>
            )}
            <input
              type="text"
              placeholder="Masukkan Nama Pelanggan"
              name="namaPelanggan"
              value={namaPelanggan}
              className={` ${errors.namaPelanggan ? "is-invalid" : ""}`}
              onChange={(e) => setNamaPelanggan(e.target.value)}
            ></input>
            {errors.namaPelanggan && (
              <div className="invalid-feedback"> {errors.namaPelanggan} </div>
            )}
            <input
              type="text"
              placeholder="NPWP"
              name="npwp"
              value={npwp}
              onChange={(e) => setNpwp(e.target.value)}
            />
            <input
              type="text"
              placeholder="Alamat"
              name="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
            <button onClick={saveOrUpdateCustomer}>Update</button>
            <button
              onClick={() => {
                setCustomerId("");
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
            <th>Kode Pelanggan</th>
            <th>Nama Pelanggan</th>
            <th>NPWP</th>
            <th>Alamat</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.idPelanggan}>
              <td>{customer.kodePelanggan}</td>
              <td>{customer.namaPelanggan}</td>
              <td>{customer.npwp}</td>
              <td>{customer.alamat}</td>
              <td>
                <button onClick={() => handleEdit(customer.idPelanggan)}>
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
                      <h3>Delete Pelanggan</h3>
                      <p>Are you sure you want to delete this customer?</p>
                      <button
                        onClick={() => removeRequest(customer.idPelanggan)}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => {
                          setCustomerId("");
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

export default Pelanggan;
