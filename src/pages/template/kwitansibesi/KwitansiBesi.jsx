import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  createMyService,
  deleteMyService,
  listMyServices,
  updateMyService,
} from "../../../services/master/MyServiceService";

const KwitansiBesi = () => {
  const [myServices, setMyServices] = useState([
    {
        index: 1,
        namaPerusahaan: "PT Maju Jaya",
        npwpPerusahaan: "01.234.567.8-901.000",
        alamatNPWP: "Jl. Sudirman No. 1, Jakarta",
        proyek: "Pembangunan Gedung Perkantoran",
        alamatProyek: "Jl. Gatot Subroto No. 2, Jakarta",
        telpFaxProyek: "021-1234567",
        namaPengirim: "John Doe",
        tanggalMasuk: "2022-01-01",
        email: "2EwKl@example.com",
        telpFaxPengirim: "021-9876543"
      },
      {
        index: 2,
        namaPerusahaan: "PT Sejahtera Abadi",
        npwpPerusahaan: "02.345.678.9-012.000",
        alamatNPWP: "Jl. Thamrin No. 5, Jakarta",
        proyek: "Pembangunan Jembatan",
        alamatProyek: "Jl. Merdeka No. 3, Jakarta",
        telpFaxProyek: "021-2345678",
        namaPengirim: "John Doe",
        tanggalMasuk: "2022-01-01",
        email: "2EwKl@example.com",
        telpFaxPengirim: "021-9876543"
      },
      {
        index: 3,
        namaPerusahaan: "PT Sukses Mandiri",
        npwpPerusahaan: "03.456.789.0-123.000",
        alamatNPWP: "Jl. Kebon Sirih No. 10, Jakarta",
        proyek: "Pembangunan Jalan Raya",
        alamatProyek: "Jl. Diponegoro No. 4, Jakarta",
        telpFaxProyek: "021-3456789",
        namaPengirim: "John Doe",
        tanggalMasuk: "2022-01-01",
        email: "2EwKl@example.com",
        telpFaxPengirim: "021-9876543"
      }
  ]);
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [npwpPerusahaan, setNpwpPerusahaan] = useState('');
  const [alamatNPWP, setAlamatNPWP] = useState('');
  const [proyek, setProyek] = useState('');
  const [alamatProyek, setAlamatProyek] = useState('');
  const [telpFaxProyek, setTelpFaxProyek] = useState('');
  const [namaPengirim, setNamaPengirim] = useState('');
  const [tanggalMasuk, setTanggalMasuk] = useState('');
  const [email, setEmail] = useState('');
  const [telpFaxPengirim, setTelpFaxPengirim] = useState('');

  const [errors, setErrors] = useState({
    namaPerusahaan: '',
    npwpPerusahaan: '',
    alamatNPWP: '',
    proyek: '',
    alamatProyek: '',
    telpFaxProyek: '',
    namaPengirim: '',
    tanggalMasuk: '',
    email: '',
    telpFaxPengirim: ''
  });

  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    getAllMyServices();
  }, []);

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!namaPerusahaan.trim()) {
      errorsCopy.namaPerusahaan = "Nama Perusahaan wajib di isi";
      valid = false;
    } else {
      errorsCopy.namaPerusahaan = "";
    }

    // Add more validations as needed for other fields

    setErrors(errorsCopy);
    return valid;
  }

  function saveOrUpdateMyService(e) {
    e.preventDefault();

    if (validateForm()) {
      const myService = {
        namaPerusahaan,
        npwpPerusahaan,
        alamatNPWP,
        proyek,
        alamatProyek,
        telpFaxProyek,
        namaPengirim,
        tanggalMasuk,
        email,
        telpFaxPengirim
      };

      if (myServices.length > 0) {
        updateMyService(myServices[0].id, myService)
          .then((response) => {
            console.log(response.data);
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

  function getAllMyServices() {
    listMyServices()
      .then((response) => {
        setMyServices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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

  const handleEdit = (id) => {
    const selectedService = myServices.find((service) => service.id === id);
    if (selectedService) {
      setNamaPerusahaan(selectedService.namaPerusahaan);
      setNpwpPerusahaan(selectedService.npwpPerusahaan);
      setAlamatNPWP(selectedService.alamatNPWP);
      setProyek(selectedService.proyek);
      setAlamatProyek(selectedService.alamatProyek);
      setTelpFaxProyek(selectedService.telpFaxProyek);
      setNamaPengirim(selectedService.namaPengirim);
      setTanggalMasuk(selectedService.tanggalMasuk);
      setEmail(selectedService.email);
      setTelpFaxPengirim(selectedService.telpFaxPengirim);
      setUpdatePopupOpen(true);
    } else {
      console.error(`Service with id ${id} not found.`);
    }
  };

  function viewServiceType(id) {
    navigator(`/layanan/${id}/kategori`);
  }

  return (
    <div className="kwitansi-besi">
      <h2>Kwitansi Besi</h2>
      <div>
        <button
          onClick={() => {
            setNamaPerusahaan('');
            setCreatePopupOpen(true);
          }}
          className="btn btn-primary mx-2"
        >
          Create Data
        </button>
      </div>


        <h2>Perusahaan</h2>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama Perusahaan</th>
              <th>NPWP Perusahaan</th>
              <th>Alamat sesuai NPWP</th>
              <th>Proyek</th>
              <th>Alamat</th>
              <th>Telp./Fax</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {myServices.map((myService, index) => (
              <tr key={myService.id}>
                <td>{index + 1}</td>
                <td>{myService.namaPerusahaan}</td>
                <td>{myService.npwpPerusahaan}</td>
                <td>{myService.alamatNPWP}</td>
                <td>{myService.proyek}</td>
                <td>{myService.alamatProyek}</td>
                <td>{myService.telpFaxProyek}</td>
                <td>
                  <button onClick={() => handleEdit(myService.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => {
                    setServiceId(myService.id);
                    setDeletePopupOpen(true);
                  }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button
                    onClick={() => viewServiceType(myService.id)}
                    style={{ margin: "1px" }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))} */}
            {myServices.map((myService, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{myService.namaPerusahaan}</td>
            <td>{myService.npwpPerusahaan}</td>
            <td>{myService.alamatNPWP}</td>
            <td>{myService.proyek}</td>
            <td>{myService.alamatProyek}</td>
            <td>{myService.telpFaxProyek}</td>
            <td>
                  <button onClick={() => handleEdit(myService.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => {
                    setServiceId(myService.id);
                    setDeletePopupOpen(true);
                  }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button
                    onClick={() => viewServiceType(myService.id)}
                    style={{ margin: "1px" }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
          </tr>
        ))}

          </tbody>
        </table>


     
        <h2>Pengirim</h2>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama Pengirim</th>
              <th>Tanggal Masuk</th>
              <th>Email</th>
              <th>Telp./Fax</th>
            </tr>
          </thead>
          <tbody>
           {/* {myServices.map((myService, index) => (
              <tr key={myService.id}>
                <td>{index + 1}</td>
            <td>{myService.namaPengirim}</td>
            <td>{myService.tanggalMasuk}</td>
            <td>{myService.email}</td>
            <td>{myService.telpFaxPengirim}</td>
              </tr>
            ))} */}
            {myServices.map((myService, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{myService.namaPengirim}</td>
            <td>{myService.tanggalMasuk}</td>
            <td>{myService.email}</td>
            <td>{myService.telpFaxPengirim}</td>
          </tr>
        ))}
          </tbody>
        </table>


      <div>
      {isCreatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Create Data Kwitansi</h3>
            <h1 style={{ textAlign: "center", fontSize: "14px", marginBottom: "10px" }}>Perusahaan</h1>
            <input
              type="text"
              placeholder="Masukkan Nama Perusahaan"
              name="namaPerusahaan"
              className={` ${errors.namaPerusahaan ? "is-invalid" : ""}`}
              value={namaPerusahaan}
              onChange={(e) => setNamaPerusahaan(e.target.value)}
            />
            {errors.namaPerusahaan && (
              <div className="invalid-feedback">{errors.namaPerusahaan}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan NPWP Perusahaan"
              name="npwpPerusahaan"
              className={` ${errors.npwpPerusahaan ? "is-invalid" : ""}`}
              value={npwpPerusahaan}
              onChange={(e) => setNpwpPerusahaan(e.target.value)}
            />
            {errors.npwpPerusahaan && (
              <div className="invalid-feedback">{errors.npwpPerusahaan}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Alamat NPWP"
              name="alamatNPWP"
              className={` ${errors.alamatNPWP ? "is-invalid" : ""}`}
              value={alamatNPWP}
              onChange={(e) => setAlamatNPWP(e.target.value)}
            />
            {errors.alamatNPWP && (
              <div className="invalid-feedback">{errors.alamatNPWP}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Nama Proyek"
              name="proyek"
              className={` ${errors.proyek ? "is-invalid" : ""}`}
              value={proyek}
              onChange={(e) => setProyek(e.target.value)}
            />
            {errors.proyek && (
              <div className="invalid-feedback">{errors.proyek}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Alamat Proyek"
              name="alamatProyek"
              className={` ${errors.alamatProyek ? "is-invalid" : ""}`}
              value={alamatProyek}
              onChange={(e) => setAlamatProyek(e.target.value)}
            />
            {errors.alamatProyek && (
              <div className="invalid-feedback">{errors.alamatProyek}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Telp/Fax Proyek"
              name="telpFaxProyek"
              className={` ${errors.telpFaxProyek ? "is-invalid" : ""}`}
              value={telpFaxProyek}
              onChange={(e) => setTelpFaxProyek(e.target.value)}
            />
            {errors.telpFaxProyek && (
              <div className="invalid-feedback">{errors.telpFaxProyek}</div>
            )}
            {/* Pengirim */}
            <h1 style={{ textAlign: "center", fontSize: "14px", marginBottom: "10px" }}>Pengirim</h1>
            <input
              type="text"
              placeholder="Masukkan Nama Pengirim"
              name="namaPengirim"
              className={` ${errors.namaPengirim ? "is-invalid" : ""}`}
              value={namaPengirim}
              onChange={(e) => setNamaPengirim(e.target.value)}
            />
            {errors.namaPengirim && (
              <div className="invalid-feedback">{errors.namaPengirim}</div>
            )}
            <input
              type="date"
              placeholder="Masukkan Tanggal Masuk"
              name="tanggalMasuk"
              className={` ${errors.tanggalMasuk ? "is-invalid" : ""}`}
              value={tanggalMasuk}
              onChange={(e) => setTanggalMasuk(e.target.value)}
            />
            {errors.tanggalMasuk && (
              <div className="invalid-feedback">{errors.tanggalMasuk}</div>
            )}
            <input
              type="email"
              placeholder="Masukkan Email"
              name="email"
              className={` ${errors.email ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Telp/Fax Pengirim"
              name="telpFaxPengirim"
              className={` ${errors.telpFaxPengirim ? "is-invalid" : ""}`}
              value={telpFaxPengirim}
              onChange={(e) => setTelpFaxPengirim(e.target.value)}
            />
            {errors.telpFaxPengirim && (
              <div className="invalid-feedback">{errors.telpFaxPengirim}</div>
            )}

            <button onClick={saveOrUpdateMyService}>Create</button>
            <button onClick={() => setCreatePopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Edit Data Kwitansi</h3>
            <h1 style={{ textAlign: "center", fontSize: "14px", marginBottom: "10px" }}>Perusahaan</h1>
            <input
              type="text"
              placeholder="Masukkan Nama Perusahaan"
              name="namaPerusahaan"
              value={namaPerusahaan}
              className={` ${errors.namaPerusahaan ? "is-invalid" : ""}`}
              onChange={(e) => setNamaPerusahaan(e.target.value)}
            />
            {errors.namaPerusahaan && (
              <div className="invalid-feedback">{errors.namaPerusahaan}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan NPWP Perusahaan"
              name="npwpPerusahaan"
              value={npwpPerusahaan}
              className={` ${errors.npwpPerusahaan ? "is-invalid" : ""}`}
              onChange={(e) => setNpwpPerusahaan(e.target.value)}
            />
            {errors.npwpPerusahaan && (
              <div className="invalid-feedback">{errors.npwpPerusahaan}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Alamat NPWP"
              name="alamatNPWP"
              value={alamatNPWP}
              className={` ${errors.alamatNPWP ? "is-invalid" : ""}`}
              onChange={(e) => setAlamatNPWP(e.target.value)}
            />
            {errors.alamatNPWP && (
              <div className="invalid-feedback">{errors.alamatNPWP}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Nama Proyek"
              name="proyek"
              value={proyek}
              className={` ${errors.proyek ? "is-invalid" : ""}`}
              onChange={(e) => setProyek(e.target.value)}
            />
            {errors.proyek && (
              <div className="invalid-feedback">{errors.proyek}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Alamat Proyek"
              name="alamatProyek"
              value={alamatProyek}
              className={` ${errors.alamatProyek ? "is-invalid" : ""}`}
              onChange={(e) => setAlamatProyek(e.target.value)}
            />
            {errors.alamatProyek && (
              <div className="invalid-feedback">{errors.alamatProyek}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Telp/Fax Proyek"
              name="telpFaxProyek"
              value={telpFaxProyek}
              className={` ${errors.telpFaxProyek ? "is-invalid" : ""}`}
              onChange={(e) => setTelpFaxProyek(e.target.value)}
            />
            {errors.telpFaxProyek && (
              <div className="invalid-feedback">{errors.telpFaxProyek}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Nama Pengirim"
              name="namaPengirim"
              value={namaPengirim}
              className={` ${errors.namaPengirim ? "is-invalid" : ""}`}
              onChange={(e) => setNamaPengirim(e.target.value)}
            />
            {errors.namaPengirim && (
              <div className="invalid-feedback">{errors.namaPengirim}</div>
            )}
              <h1 style={{ textAlign: "center", fontSize: "14px", marginBottom: "10px" }}>Pengirim</h1>
            <input
              type="date"
              placeholder="Masukkan Tanggal Masuk"
              name="tanggalMasuk"
              value={tanggalMasuk}
              className={` ${errors.tanggalMasuk ? "is-invalid" : ""}`}
              onChange={(e) => setTanggalMasuk(e.target.value)}
            />
            {errors.tanggalMasuk && (
              <div className="invalid-feedback">{errors.tanggalMasuk}</div>
            )}
            <input
              type="email"
              placeholder="Masukkan Email"
              name="email"
              value={email}
              className={` ${errors.email ? "is-invalid" : ""}`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <input
              type="text"
              placeholder="Masukkan Telp/Fax Pengirim"
              name="telpFaxPengirim"
              value={telpFaxPengirim}
              className={` ${errors.telpFaxPengirim ? "is-invalid" : ""}`}
              onChange={(e) => setTelpFaxPengirim(e.target.value)}
            />
            {errors.telpFaxPengirim && (
              <div className="invalid-feedback">{errors.telpFaxPengirim}</div>
            )}

            <button onClick={saveOrUpdateMyService}>Update</button>
            <button onClick={() => setUpdatePopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>

      {isDeletePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Delete Layanan</h3>
            <p>Are you sure you want to delete this service?</p>
            <button onClick={() => removeMyService(serviceId)}>Yes</button>
            <button onClick={() => setDeletePopupOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default KwitansiBesi;
