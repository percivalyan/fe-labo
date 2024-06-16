import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  createServiceType,
  deleteServiceType,
  getServiceType,
  listServiceTypeById,
  listServiceTypes,
  updateServiceType,
} from "../services/ServiceTypeService";

const Kategori = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceTypeCode, setServiceTypeCode] = useState("");
  const [serviceTypeName, setServiceTypeName] = useState("");
  const [reference, setReference] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  const { serviceId, serviceTypeId } = useParams();

  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  function addServiceType(e) {
    e.preventDefault();

    const serviceType = {
      // serviceId, //GANTI JIKA MAU serviceCode
      serviceTypeCode,
      serviceTypeName,
      reference,
      size,
      price,
    };
    console.log(serviceType);
    if (validateForm()) {
      createServiceType(serviceId, serviceType)
        .then((response) => {
          console.log(response.data);
          setCreatePopupOpen(false);
          getAllServiceTypeById(serviceId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Respon data semua
  function getAllServiceTypes() {
    listServiceTypes()
      .then((response) => {
        setServiceTypes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Respon data by id
  function getAllServiceTypeById(serviceId) {
    listServiceTypeById(serviceId)
      .then((response) => {
        setServiceTypes(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Menampilkan data ke UI
  useEffect(() => {
    if (serviceId) {
      getAllServiceTypeById(serviceId);
    } else if (serviceTypeId) {
      getServiceTypeById(serviceTypeId);
    } else {
      getAllServiceTypes();
    }
  }, [serviceId] || [serviceTypeId]);

  function getServiceTypeById(serviceTypeId) {
    getServiceType(serviceTypeId)
      .then((response) => {
        const { serviceTypeCode, serviceTypeName, reference, size, price } =
          response.data;
        setServiceTypeCode(serviceTypeCode);
        setServiceTypeName(serviceTypeName);
        setReference(reference);
        setSize(size);
        setPrice(price);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // UNTUK UPDATE DAN SIMPAN DATA
  function editServiceType(e) {
    e.preventDefault();
    const serviceType = {
      serviceTypeCode,
      serviceTypeName,
      reference,
      size,
      price,
    };

    if (validateForm()) {
      console.log(serviceType);

      updateServiceType(selectedId, serviceType)
        .then((response) => {
          console.log(response.data);
          setUpdatePopupOpen(false);
          setSelectedId("");
          if (serviceId) {
            getAllServiceTypeById(serviceId);
          } else {
            getAllServiceTypes();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // DELETE JENIS LAYANAN
  const removeServiceType = (id) => {
    deleteServiceType(id)
      .then(() => {
        setDeletePopupOpen(false);
        if (serviceId) {
          getAllServiceTypeById(serviceId);
        } else {
          getAllServiceTypes();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [errors, setErrors] = useState({
    serviceTypeCode: "",
    serviceTypeName: "",
  });

  // MENYATAKAN FORM INI TIDAK BOLEH KOSONG
  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (serviceTypeCode.trim()) {
      errorsCopy.serviceTypeCode = "";
    } else {
      errorsCopy.serviceTypeCode = "Kode JENIS Layanan wajib di isi";
      valid = false;
    }

    if (serviceTypeName.trim()) {
      errorsCopy.serviceTypeName = "";
    } else {
      errorsCopy.serviceTypeName = "Nama Layanan wajib di isi";
      valid = false;
    }
    setErrors(errorsCopy);

    return valid;
  }

  const openUpdatePopup = (id) => {
    setSelectedId(id);
    setUpdatePopupOpen(true);

    getServiceType(id)
      .then((response) => {
        const data = response.data;
        setServiceTypeCode(data.serviceTypeCode);
        setServiceTypeName(data.serviceTypeName);
        setReference(data.reference);
        setSize(data.size);
        setPrice(data.price);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openDeletePopup = (id) => {
    setSelectedId(id);
    setDeletePopupOpen(true);
  };

  // fungsinya untuk merubah nama form agar form nya bisa reusable
  function pageTitle() {
    if (serviceId) {
      return <h2 className="text-center"> Kategori Layanan 1 </h2>;
    } else {
      return <h2 className="text-center"> Kategori Semua Layanan </h2>;
    }
  }

  //menampilkan create button
  function showCreate() {
    if (serviceId) {
      return (
        <div>
          <button
            onClick={() => {
              setSelectedId("");
              setCreatePopupOpen(true);
            }}
            className="btn btn-primary mx-2"
          >
            Create Kategori
          </button>
        </div>
      );
    } else {
      return <h2> Kategori</h2>;
    }
  }

  return (
    <div className="kategori">
      {/* <h2>Kategori Layanan</h2> */}
      {pageTitle()}
      {showCreate()}

      {isCreatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Create Kategori</h3>
            <input
              type="text"
              placeholder="Masukkan Kode Jenis Layanan"
              name="serviceTypeCode"
              // value={serviceTypeCode}
              className={`form-control ${
                errors.serviceTypeCode ? "is-invalid" : ""
              }`}
              onChange={(e) => setServiceTypeCode(e.target.value)}
            ></input>
            {errors.serviceTypeCode && (
              <div className="invalid-feedback"> {errors.serviceTypeCode} </div>
            )}
            <input
              type="text"
              placeholder="Masukkan Nama Jenis Layanan"
              name="serviceTypeName"
              // value={serviceTypeName}
              className={`form-control ${
                errors.serviceTypeName ? "is-invalid" : ""
              }`}
              onChange={(e) => setServiceTypeName(e.target.value)}
            ></input>
            {errors.serviceTypeName && (
              <div className="invalid-feedback"> {errors.serviceTypeName} </div>
            )}
            <input
              type="text"
              placeholder="Masukkan Referensi"
              name="reference"
              // value={reference}
              className="form-control"
              onChange={(e) => setReference(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Masukkan Ukuran"
              name="size"
              // value={size}
              className="form-control"
              onChange={(e) => setSize(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Masukkan Harga"
              name="price"
              // value={price}
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            ></input>
            <button onClick={addServiceType}>Create</button>
            <button onClick={() => setCreatePopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Edit Kategori</h3>
            <input
              type="text"
              placeholder="Masukkan Kode Jenis Layanan"
              name="serviceTypeCode"
              value={serviceTypeCode}
              className={`form-control ${
                errors.serviceTypeCode ? "is-invalid" : ""
              }`}
              onChange={(e) => setServiceTypeCode(e.target.value)}
            ></input>
            {errors.serviceTypeCode && (
              <div className="invalid-feedback"> {errors.serviceTypeCode} </div>
            )}
            <input
              type="text"
              placeholder="Masukkan Nama Jenis Layanan"
              name="serviceTypeName"
              value={serviceTypeName}
              className={`form-control ${
                errors.serviceTypeName ? "is-invalid" : ""
              }`}
              onChange={(e) => setServiceTypeName(e.target.value)}
            ></input>
            {errors.serviceTypeName && (
              <div className="invalid-feedback"> {errors.serviceTypeName} </div>
            )}
            <input
              type="text"
              placeholder="Masukkan Referensi"
              name="reference"
              value={reference}
              className="form-control"
              onChange={(e) => setReference(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Masukkan Ukuran"
              name="size"
              value={size}
              className="form-control"
              onChange={(e) => setSize(e.target.value)}
            ></input>
            <input
              type="number"
              placeholder="Masukkan Harga"
              name="price"
              value={price}
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            ></input>
            <button onClick={editServiceType}>Update</button>
            <button
              onClick={() => {
                setSelectedId("");
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
            <th>Kode Kategori Layanan</th>
            <th>Nama Kategori Layanan</th>
            <th>Referensi</th>
            <th>Ukuran</th>
            <th>Harga</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceTypes.map((serviceType) => (
            <tr key={serviceType.id}>
              <td>{serviceType.serviceTypeCode}</td>
              <td>{serviceType.serviceTypeName}</td>
              <td>{serviceType.reference}</td>
              <td>{serviceType.size}</td>
              <td>{serviceType.price}</td>
              <td>
                <button
                  onClick={() => {
                    openUpdatePopup(serviceType.id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    openDeletePopup(serviceType.id);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    openDeletePopup(serviceType.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDeletePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Delete Kategori</h3>
            <p>Are you sure you want to delete this category?</p>
            <button onClick={() => removeServiceType(selectedId)}>Yes</button>
            <button
              onClick={() => {
                setSelectedId("");
                setDeletePopupOpen(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kategori;
