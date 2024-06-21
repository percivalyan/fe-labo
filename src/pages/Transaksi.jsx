import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteRequest, listRequests } from "../services/Request";

const Transaksi = () => {
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const navigator = useNavigate();

  // untuk respon data list
  function getAllRequests() {
    listRequests()
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // Untuk menampilkan di dalam table list
  useEffect(() => {
    getAllRequests();
  }, []);

  const removeRequest = (id) => {
    deleteRequest(id)
      .then(() => {
        setDeletePopupOpen(false);
        getAllRequests();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function viewReceipt(id) {
    navigator(`/transaksi/${id}/kwitansi`);
  }
  function viewDetails(id) {
    navigator(`/transaksi/${id}`);
  }
  function viewForm(id) {
    navigator(`/${id}/besi-bending`);
  }
  function printRequest(id) {
    navigator(`/transaksi/${id}/print-request`);
  }

  return (
    <div className="transaksi">
      <h2>History Permintan</h2>
      <table>
        <thead>
          <tr>
            <th>Kode Transaksi</th>
            <th>Nama Pelanggan</th>
            <th>Nama Projek</th>
            <th>Nama Pengirim</th>
            <th>Nama Penerima</th>
            <th>Jumlah</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.requestCode}</td>
              <td>{request.customer.namaPelanggan}</td>
              <td>{request.project.namaProjek}</td>
              <td>{request.senderName}</td>
              <td>{request.recipientName}</td>
              <td>{request.totalPayment}</td>

              <td>
                <button
                  onClick={() => viewDetails(request.id)}
                  style={{ margin: "10px" }}
                >
                  Lihat
                </button>
                <button
                  onClick={() => viewReceipt(request.id)}
                  style={{ margin: "10px" }}
                >
                  Kwitansi
                </button>
                <button
                  onClick={() => printRequest(request.id)}
                  style={{ margin: "10px" }}
                >
                  Cetak
                </button>
                <button
                  onClick={() => viewForm(request.id)}
                  style={{ margin: "10px" }}
                >
                  Hasil
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
                      <h3>Delete Transaksi</h3>
                      <p>Are you sure you want to delete this transaction?</p>
                      <button onClick={() => removeRequest(request.id)}>
                        Yes
                      </button>
                      <button onClick={() => setDeletePopupOpen(false)}>
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

export default Transaksi;
