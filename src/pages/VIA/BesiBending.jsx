import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getRequest } from "../../services/Request";
import {
  createHeaderVIA,
  getHeaderVIAbyReqId,
} from "../../services/VIA/HeaderVIA";

const BesiBending = () => {
  const [headerVIAs, setHeaderVIAs] = useState({});
  const [proyek, setProyek] = useState("");
  const [jenisBenda, setJenisBenda] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [tester, setTester] = useState("");
  const [verifikator, setVerifikator] = useState("");
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);

  const { requestId, headerVIAId } = useParams();
  const [requestCode, setRequestCode] = useState("");
  const [customer, setCustomer] = useState("");

  const navigator = useNavigate();

  // const [monthNow, setMonthNow] = useState("");
  // const [yearNow, setYearNow] = useState("");
  // const [dayNow, setDayNow] = useState("");

  // useEffect(() => {
  //   const date = new Date();
  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
  //   const year = String(date.getFullYear());
  //   const day = String(date.getDay() + 16).padStart(2, "0"); //
  //   setMonthNow(month);
  //   setYearNow(year);
  //   setDayNow(day);
  //   setDiterimaTanggal(`${day}/${monthNow}/${yearNow}`);
  // }, [dayNow, monthNow, yearNow]);

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
        })
        .catch((error) => {
          console.error("Error fetching property details:", error);
          setRequestCode("");
          setProyek("");
          setCustomer("");
        });
      getHeaderVIAbyReqId(requestId)
        .then((response) => {
          console.log("Property details : ", response);
          setHeaderVIAs(response);
        })
        .catch((error) => {
          console.error("Error fetching property details:", error);
        });
    } else {
      navigator("/besi-bending");
    }
  }, [navigator, requestId]);

  function saveHeaderVIA(e) {
    e.preventDefault();
    const headerVIA = {
      jenisBenda,
      kodeUji: requestCode,
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

  function createHasil(id) {
    navigator(`/${id}/besi-bending-hasil`);
  }
  function listHasil(id) {
    navigator(`/besi-bending/${id}/hasil-list`);
  }
  function printHasil(id) {
    navigator(`/pdf/${id}/print`);
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
                required
              />

              <label htmlFor="proyek">Proyek:</label>
              <input
                type="text"
                id="proyek"
                name="proyek"
                value={proyek}
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
                required
              />

              <label htmlFor="kodeUji">No. Laporan:</label>
              <input
                type="text"
                id="kodeUji"
                name="kodeUji"
                value={requestCode}
                required
                disabled
              />

              {/* <label htmlFor="diterimaTanggal">Diterima Tanggal:</label>
              <input
                type="text"
                id="diterimaTanggal"
                name="diterimaTanggal"
                value={diterimaTanggal}
                required
                disabled
              /> */}

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
          {requestId != null ? (
            <tr>
              <td>{headerVIAs.jenisBenda}</td>
              <td>{headerVIAs.kodeUji}</td>
              <td>{headerVIAs.tester}</td>
              <td>{headerVIAs.verifikator}</td>
              <td>
                <button onClick={() => createHasil(headerVIAs.id)}>Buat</button>
                <button onClick={() => listHasil(headerVIAs.id)}>Lihat</button>
                <button onClick={() => printHasil(headerVIAs.id)}>Print</button>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BesiBending;
