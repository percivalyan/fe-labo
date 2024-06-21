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

const KwitansiBesiHasil = () => {
  
  const [bendaUji, setBendaUji] = useState('');
  const [jenisUjiMaterial, setJenisUjiMaterial] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [hargaSatuan, setHargaSatuan] = useState('');
  const [hargaSatuanPPN, setHargaSatuanPPN] = useState('');
  const [totalBiaya, setTotalBiaya] = useState('');
  const [myServices, setMyServices] = useState([
    {
      id: 1,
      bendaUji: 'Besi 1',
      jenisUjiMaterial: 'Uji Tarik',
      jumlah: 10,
      hargaSatuan: 50000,
      hargaSatuanPPN: 55000,
      totalBiaya: 500000
    },
    {
      id: 2,
      bendaUji: 'Besi 2',
      jenisUjiMaterial: 'Uji Tekan',
      jumlah: 5,
      hargaSatuan: 60000,
      hargaSatuanPPN: 66000,
      totalBiaya: 300000
    }
    // Add more sample data as needed
  ]);
  const [serviceId, setServiceId] = useState(null);

  const [errors, setErrors] = useState({
    bendaUji: '',
    jenisUjiMaterial: '',
    jumlah: '',
    hargaSatuan: '',
    hargaSatuanPPN: '',
    totalBiaya: ''
  });
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    getAllMyServices();
  }, []);

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!bendaUji.trim()) {
      errorsCopy.bendaUji = "Benda Uji wajib di isi";
      valid = false;
    } else {
      errorsCopy.bendaUji = "";
    }

    // Add more validations as needed for other fields

    setErrors(errorsCopy);
    return valid;
  };

  const saveOrUpdateMyService = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const myService = {
        bendaUji,
        jenisUjiMaterial,
        jumlah,
        hargaSatuan,
        hargaSatuanPPN,
        totalBiaya
      };

      if (serviceId) {
        updateMyService(serviceId, myService)
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
  };

  const getAllMyServices = () => {
    listMyServices()
      .then((response) => {
        setMyServices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      setBendaUji(selectedService.bendaUji);
      setJenisUjiMaterial(selectedService.jenisUjiMaterial);
      setJumlah(selectedService.jumlah);
      setHargaSatuan(selectedService.hargaSatuan);
      setHargaSatuanPPN(selectedService.hargaSatuanPPN);
      setTotalBiaya(selectedService.totalBiaya);
      setServiceId(id);
      setUpdatePopupOpen(true);
    } else {
      console.error(`Service with id ${id} not found.`);
    }
  };

  const viewServiceType = (id) => {
    navigator(`/layanan/${id}/kategori`);
  };

  return (
    <div className="kwitansi-besi">
      <h2>Kwitansi Besi</h2>
      <div>
        <button
          onClick={() => {
            setBendaUji('');
            setJenisUjiMaterial('');
            setJumlah('');
            setHargaSatuan('');
            setHargaSatuanPPN('');
            setTotalBiaya('');
            setCreatePopupOpen(true);
          }}
          className="btn btn-primary mx-2"
        >
          Create Data
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Benda Uji</th>
            <th>Jenis Uji Material</th>
            <th>Jumlah</th>
            <th>Harga Satuan</th>
            <th>Harga Satuan PPN</th>
            <th>Total Biaya</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myServices.map((myService, index) => (
            <tr key={myService.id}>
              <td>{index + 1}</td>
              <td>{myService.bendaUji}</td>
              <td>{myService.jenisUjiMaterial}</td>
              <td>{myService.jumlah}</td>
              <td>{myService.hargaSatuan}</td>
              <td>{myService.hargaSatuanPPN}</td>
              <td>{myService.totalBiaya}</td>
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

      {isCreatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Create Data Kwitansi</h3>
            <form onSubmit={saveOrUpdateMyService}>
              <input
                type="text"
                placeholder="Masukkan Benda Uji"
                name="bendaUji"
                className={`${errors.bendaUji ? "is-invalid" : ""}`}
                value={bendaUji}
                onChange={(e) => setBendaUji(e.target.value)}
              />
              {errors.bendaUji && (
                <div className="invalid-feedback">{errors.bendaUji}</div>
              )}
              <input
                type="text"
                placeholder="Masukkan Jenis Uji Material"
                name="jenisUjiMaterial"
                className={`${errors.jenisUjiMaterial ? "is-invalid" : ""}`}
                value={jenisUjiMaterial}
                onChange={(e) => setJenisUjiMaterial(e.target.value)}
              />
              {errors.jenisUjiMaterial && (
                <div className="invalid-feedback">{errors.jenisUjiMaterial}</div>
              )}
              <input
                type="text"
                placeholder="Masukkan Jumlah"
                name="jumlah"
                className={`${errors.jumlah ? "is-invalid" : ""}`}
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
              />
              {errors.jumlah && (
                <div className="invalid-feedback">{errors.jumlah}</div>
              )}
              <input
                type="text"
                placeholder="Masukkan Harga Satuan"
                name="hargaSatuan"
                className={`${errors.hargaSatuan ? "is-invalid" : ""}`}
                value={hargaSatuan}
                onChange={(e) => setHargaSatuan(e.target.value)}
              />
              {errors.hargaSatuan && (
                <div className="invalid-feedback">{errors.hargaSatuan}</div>
              )}
              <input
                type="text"
                placeholder="Masukkan Harga Satuan PPN"
                name="hargaSatuanPPN"
                className={`${errors.hargaSatuanPPN ? "is-invalid" : ""}`}
                value={hargaSatuanPPN}
                onChange={(e) => setHargaSatuanPPN(e.target.value)}
              />
              {errors.hargaSatuanPPN && (
                <div className="invalid-feedback">{errors.hargaSatuanPPN}</div>
              )}
              <input
                type="text"
                placeholder="Masukkan Total Biaya"
                name="totalBiaya"
                className={`${errors.totalBiaya ? "is-invalid" : ""}`}
                value={totalBiaya}
                onChange={(e) => setTotalBiaya(e.target.value)}
              />
              {errors.totalBiaya && (
                <div className="invalid-feedback">{errors.totalBiaya}</div>
              )}
              <button type="submit">Simpan</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCreatePopupOpen(false)}
              >
                Batal
              </button>
            </form>
          </div>
        </div>
      )}

      {isUpdatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Update Data Kwitansi</h3>
            <form onSubmit={saveOrUpdateMyService}>
              <input
                type="text"
                placeholder="Masukkan Benda Uji"
                name="bendaUji"
                className={`${errors.bendaUji ? "is-invalid" : ""}`}
                value={bendaUji}
                onChange={(e) => setBendaUji(e.target.value)}
              />
              {errors.bendaUji && (
                <div className="invalid-feedback">{errors.bendaUji}</div>
              )}
              <input
                type="text"
                placeholder="Masukkan Jenis Uji Material"
                name="jenisUjiMaterial"
                className={`${errors.jenisUjiMaterial ? "is-invalid" : ""}`}
                value={jenisUjiMaterial}
                onChange={(e) => setJenisUjiMaterial(e.target.value)}
              />
              {errors.jenisUjiMaterial && (
                <div className="invalid-feedback">{errors.jenisUjiMaterial}</div>
              )}
              <input
                type="text"
                placeholder="Masukkan Jumlah"
                name="jumlah"
                className={`${errors.jumlah ? "is-invalid" : ""}`}
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
              />
              {errors.jumlah && (
                <div className="invalid-feedback">{errors.jumlah}</div>
              )}
              <input
                type="text"
                placeholder="Masukkan Harga Satuan"
                name="hargaSatuan"
                className={`${errors.hargaSatuan ? "is-invalid" : ""}`}
                value={hargaSatuan}
                onChange={(e) => setHargaSatuan(e.target.value)}
              />
              {errors.hargaSatuan && (
                <div className="invalid-feedback">{errors.hargaSatuan}</div>
              )}
              <input
                type="text"
                placeholder="Masukkan Harga Satuan PPN"
                name="hargaSatuanPPN"
                className={`${errors.hargaSatuanPPN ? "is-invalid" : ""}`}
                value={hargaSatuanPPN}
                onChange={(e) => setHargaSatuanPPN(e.target.value)}
              />
              {errors.hargaSatuanPPN && (
                <div className="invalid-feedback">{errors.hargaSatuanPPN}</div>
              )}
              <input
                type="text"
                placeholder="Masukkan Total Biaya"
                name="totalBiaya"
                className={`${errors.totalBiaya ? "is-invalid" : ""}`}
                value={totalBiaya}
                onChange={(e) => setTotalBiaya(e.target.value)}
              />
              {errors.totalBiaya && (
                <div className="invalid-feedback">{errors.totalBiaya}</div>
              )}
              <button type="submit">Update</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setUpdatePopupOpen(false)}
              >
                Batal
              </button>
            </form>
          </div>
        </div>
      )}

      {isDeletePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Hapus Data Kwitansi</h3>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <button
              onClick={() => removeMyService(serviceId)}
              className="btn btn-danger"
            >
              Hapus
            </button>
            <button
              onClick={() => setDeletePopupOpen(false)}
              className="btn btn-secondary"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KwitansiBesiHasil;
