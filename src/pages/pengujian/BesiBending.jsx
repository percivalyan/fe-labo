import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { createHeaderVIA, getHeaderVIAbyReqId } from "../../services/HeaderVIA";
import { getRequest } from "../../services/Request";

const BesiBending = () => {
  const [headerVIAs, setHeaderVIAs] = useState([]);
  const [besiBendingId, setBesiBendingId] = useState("");
  // const [selectedBesiBending, setSelectedBesiBending] = useState("");
  // const [dibuatUntuk, setDibuatUntuk] = useState("");
  const [proyek, setProyek] = useState("");
  const [jenisBenda, setJenisBenda] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [kodeUji, setKodeUji] = useState("");
  const [diterimaTanggal, setDiterimaTanggal] = useState("");
  const [tester, setTester] = useState("");
  const [verifikator, setVerifikator] = useState("");
  const [errors, setErrors] = useState({
    // dibuatUntuk: "",
    // proyek: "",
    jenisBenda: "",
    // lokasi: "",
    kodeUji: "",
    // diterimaTanggal: "",
    tester: "",
    verifikator: "",
  });
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  // const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  // const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const { requestId, headerVIAId } = useParams();
  const [requestCode, setRequestCode] = useState("");
  const [customer, setCustomer] = useState("");

  const navigator = useNavigate();

  const [monthNow, setMonthNow] = useState("");
  const [yearNow, setYearNow] = useState("");
  const [dayNow, setDayNow] = useState("");

  useEffect(() => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const year = String(date.getFullYear());
    const day = String(date.getDay() + 16).padStart(2, "0"); //

    setMonthNow(month);
    setYearNow(year);
    setDayNow(day);

    setDiterimaTanggal(`${day}/${monthNow}/${yearNow}`);
  }, [dayNow, monthNow, yearNow]);

  useEffect(() => {
    if (requestId) {
      getRequest(requestId)
        .then((response) => {
          console.log(requestId);
          console.log("Property details:", response);
          setRequestCode(response.requestCode);
          setProyek(response.project.namaProjek);
          setCustomer(response.customer.namaPelanggan);
          setLokasi(response.customer.alamat);
          // setReceiptNumber(response.requestCode);
        })
        .catch((error) => {
          console.error("Error fetching property details:", error);
          setRequestCode("");
          setProyek("");
          setCustomer("");
          // setReceiptNumber("");
        });
    } else {
      navigator("/besi-bending");
    }
  }, [requestId]);

  useEffect(() => {
    if (requestId) {
      getHeaderVIAbyReqId(requestId)
        .then((response) => {
          console.log("Property details : ", response);
          setHeaderVIAs(response);
        })
        .catch((error) => {
          console.error("Error fetching property details:", error);
        });
    }
  }, [requestId]);

  // function validateForm() {
  //   let valid = true;
  //   const errorsCopy = { ...errors };

  //   if (dibuatUntuk.trim()) {
  //     errorsCopy.dibuatUntuk = "";
  //   } else {
  //     errorsCopy.dibuatUntuk = "Kolom Dibuat Untuk wajib diisi";
  //     valid = false;
  //   }

  //   setErrors(errorsCopy);
  //   return valid;
  // }

  function saveHeaderVIA(e) {
    e.preventDefault();
    const headerVIA = {
      // dibuatUntuk,
      // proyek,
      jenisBenda,
      // lokasi,
      kodeUji: requestCode,
      // diterimaTanggal,
      tester,
      verifikator,
    };
    console.log(headerVIA);

    createHeaderVIA(requestId, headerVIA)
      .then((response) => {
        console.log(response.data);
        setCreatePopupOpen(false);
        navigator("/besi-bending");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    // Simulating API call to fetch Besi Bendings
    console.log("Fetching Besi Bendings...");
  }, []);

  const removeBesiBending = (id) => {
    // Simulating API call for deleting Besi Bending
    console.log("Deleting Besi Bending with ID:", id);
  };

  // const handleEdit = (id) => {
  //   const selectedBesiBending = besiBendings.find(
  //     (besiBending) => besiBending.idBesiBending === id
  //   );
  //   if (selectedBesiBending) {
  //     setDibuatUntuk(selectedBesiBending.dibuatUntuk);
  //     setProyek(selectedBesiBending.proyek);
  //     setJenisBenda(selectedBesiBending.jenisBenda);
  //     setLokasi(selectedBesiBending.lokasi);
  //     setKodeUji(selectedBesiBending.kodeUji);
  //     setDiterimaTanggal(selectedBesiBending.diterimaTanggal);
  //     setTester(selectedBesiBending.tester);
  //     setVerifikator(selectedBesiBending.verifikator);
  //     setBesiBendingId(id);
  //     setUpdatePopupOpen(true);
  //   } else {
  //     console.error(`BesiBending with id ${id} not found.`);
  //   }
  // };

  function viewHasil(id) {
    navigator(`/${id}/besi-bending-hasil`);
  }

  function showCreate() {
    if (requestId) {
      return (
        <div>
          <center>
            <h2 className="text-center">
              REQUEST HEADER <br />
              {requestCode}
            </h2>
          </center>
          <button
            onClick={() => {
              setBesiBendingId("");
              setCreatePopupOpen(true);
            }}
            className="btn btn-primary mx-2"
          >
            Create Form
          </button>
        </div>
      );
    } else {
      return <h2> List All Besi Bending</h2>;
    }
  }

  return (
    <div className="besiBending">
      {showCreate()}

      {isCreatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Create Besi Bending</h3>
            <form onSubmit={saveHeaderVIA}>
              <label htmlFor="customer">Dibuat Untuk:</label>
              <input
                type="text"
                id="customer"
                name="customer"
                value={customer}
                // onChange={(e) => setCustomer(e.target.value)}
                required
              />

              <label htmlFor="proyek">Proyek:</label>
              <input
                type="text"
                id="proyek"
                name="proyek"
                value={proyek}
                // onChange={(e) => setProyek(e.target.value)}
                required
              />

              <label htmlFor="jenisBenda">Jenis Benda Uji:</label>
              <input
                type="text"
                id="jenisBenda"
                name="jenisBenda"
                value={jenisBenda}
                onChange={(e) => setJenisBenda(e.target.value)}
                required
              />

              <label htmlFor="lokasi">Lokasi:</label>
              <input
                type="text"
                id="lokasi"
                name="lokasi"
                value={lokasi}
                // onChange={(e) => setLokasi(e.target.value)}
                required
              />

              <label htmlFor="kodeUji">No. Laporan:</label>
              <input
                type="text"
                id="kodeUji"
                name="kodeUji"
                value={requestCode}
                // onChange={(e) => setKodeUji(e.target.value)}
                required
                disabled
              />

              <label htmlFor="diterimaTanggal">Diterima Tanggal:</label>
              <input
                type="text"
                id="diterimaTanggal"
                name="diterimaTanggal"
                value={diterimaTanggal}
                // onChange={(e) => setDiterimaTanggal(e.target.value)}
                required
                disabled
              />

              <label htmlFor="tester">Ditest Oleh:</label>
              <input
                type="text"
                id="tester"
                name="tester"
                value={tester}
                onChange={(e) => setTester(e.target.value)}
                required
              />

              <label htmlFor="verifikator">Di Verifikasi:</label>
              <input
                type="text"
                id="verifikator"
                name="verifikator"
                value={verifikator}
                onChange={(e) => setVerifikator(e.target.value)}
                required
              />

              <button type="submit">Create</button>
              <button type="button" onClick={() => setCreatePopupOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {/* 
      {isUpdatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Edit Besi Bending</h3>
            <form onSubmit={saveOrUpdateBesiBending}>
              <label htmlFor="dibuatUntuk">Dibuat Untuk:</label>
              <input
                type="text"
                id="dibuatUntuk"
                name="dibuatUntuk"
                value={dibuatUntuk}
                onChange={(e) => setDibuatUntuk(e.target.value)}
                required
              />

              <label htmlFor="proyek">Proyek:</label>
              <input
                type="text"
                id="proyek"
                name="proyek"
                value={proyek}
                onChange={(e) => setProyek(e.target.value)}
                required
              />

              <label htmlFor="jenisBenda">Jenis Benda Uji:</label>
              <input
                type="text"
                id="jenisBenda"
                name="jenisBenda"
                value={jenisBenda}
                onChange={(e) => setJenisBenda(e.target.value)}
                required
              />

              <label htmlFor="lokasi">Lokasi:</label>
              <input
                type="text"
                id="lokasi"
                name="lokasi"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                required
              />

              <label htmlFor="kodeUji">No. Laporan:</label>
              <input
                type="text"
                id="kodeUji"
                name="kodeUji"
                value={requestCode}
                onChange={(e) => setKodeUji(e.target.value)}
                required
                disabled
              />

              <label htmlFor="diterimaTanggal">Diterima Tanggal:</label>
              <input
                type="date"
                id="diterimaTanggal"
                name="diterimaTanggal"
                value={diterimaTanggal}
                onChange={(e) => setDiterimaTanggal(e.target.value)}
                required
              />

              <label htmlFor="tester">Ditest Oleh:</label>
              <input
                type="text"
                id="tester"
                name="tester"
                value={tester}
                onChange={(e) => setTester(e.target.value)}
                required
              />

              <label htmlFor="verifikator">Di Verifikasi:</label>
              <input
                type="text"
                id="verifikator"
                name="verifikator"
                value={verifikator}
                onChange={(e) => setVerifikator(e.target.value)}
                required
              />

              <button type="submit">Update</button>
              <button
                type="button"
                onClick={() => {
                  setUpdatePopupOpen(false);
                  setBesiBendingId("");
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )} */}

      <table>
        <thead>
          <tr>
            <th>Jenis Benda Uji</th>
            <th>No. Laporan</th>
            <th>Ditest Oleh</th>
            <th>Di Verifikasi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{headerVIAs.jenisBenda}</td>
            <td>{headerVIAs.kodeUji}</td>
            <td>{headerVIAs.tester}</td>
            <td>{headerVIAs.verifikator}</td>
            <td>
              {/* <button onClick={() => handleEdit(besiBending.idBesiBending)}>
                  Edit
                </button> */}
              <button onClick={() => removeBesiBending(headerVIAs.id)}>
                Delete
              </button>
              {/* Tolong ini buatkan agar bisa ambil id dari idBesiBending */}
              <button onClick={() => viewHasil(headerVIAs.id)}>Hasil</button>
              {/* Tolong ini buatkan agar bisa ambil id dari idBesiBending */}
            </td>
          </tr>
        </tbody>
      </table>

      {/* {isDeletePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Delete Besi Bending</h3>
            <p>Are you sure you want to delete this record?</p>
            <button onClick={() => removeBesiBending(besiBendingId)}>
              Yes
            </button>
            <button onClick={() => setDeletePopupOpen(false)}>No</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default BesiBending;
