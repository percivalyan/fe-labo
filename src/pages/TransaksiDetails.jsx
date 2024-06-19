import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteRequest, getRequest } from "../services/Request";

const TransaksiDetails = () => {
  const [dataRequests, setDataRequests] = useState([]);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const { requestId } = useParams();

  //FIELD Request START
  const [requestCode, setRequestCode] = useState("");
  //FIELD DataRequest START

  const [price, setPrice] = useState("");
  const [requestQTY, setRequestQTY] = useState(1);
  const [totalAmount, setTotalAmount] = useState("");
  const [mutuBeton, setMutuBeton] = useState("");
  const [split, setSplit] = useState("");
  const [semen, setSemen] = useState("");
  const [ageVariation, setAgeVariation] = useState("");
  //Field DataRequest END
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [totalPayment, setTotalPayment] = useState("");

  // untuk respon data list

  useEffect(() => {
    getRequest(requestId)
      .then((response) => {
        console.log(requestId);
        console.log("Property details:", response);
        setRequestCode(response.requestCode);
        setDataRequests(response.dataRequest);
      })
      .catch((error) => {
        console.error("Error fetching property details:", error);
      });
  }, [requestId]);

  const removeRequest = (id) => {
    deleteRequest(id)
      .then(() => {
        setDeletePopupOpen(false);
        navigator("/transaksi");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="transaksi">
      <center>
        <h2>
          Transaksi <br />
          {requestCode}
        </h2>
      </center>
      <table>
        <thead>
          <tr>
            <th>Kategori Layanan</th>
            <th>Kuantitas</th>
            <th>Mutu Beton</th>
            <th>Split</th>
            <th>Semen</th>
            <th>Variasi Umur</th>
            <th>Total Harga </th>

            {/* <th>Nama Pelanggan</th>
            <th>Nama Projek</th>
            <th>Nama Pengirim</th>
            <th>Nama Penerima</th>
            <th>Jumlah</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataRequests.length > 0 &&
            dataRequests.map((dataRequest) => (
              <tr key={dataRequest.id}>
                {/* Menggunakan map untuk menampilkan semua serviceTypeName */}
                <td>
                  {dataRequest.serviceTypeSet.map((serviceType) => (
                    <tr key={serviceType.id}>
                      <td>{serviceType.serviceTypeName}</td>
                      <td>{serviceType.reference}</td>
                      <td>{serviceType.size}</td>
                      <td>Rp. {serviceType.price}</td>
                    </tr>
                  ))}
                </td>
                <td>{dataRequest.requestQTY}</td>
                <td>{dataRequest.mutuBeton}</td>
                <td>{dataRequest.split}</td>
                <td>{dataRequest.semen}</td>
                <td>{dataRequest.ageVariation}</td>
                <td>Rp. {dataRequest.totalAmount}</td>
                <td>
                  {/* <button
                    onClick={() => {
                      setDeletePopupOpen(true);
                    }}
                  >
                    Delete
                  </button> */}
                  {isDeletePopupOpen && (
                    <div className="popup-box">
                      <div className="popup">
                        <h3>Delete Transaksi</h3>
                        <p>Are you sure you want to delete this transaction?</p>
                        <button onClick={() => removeRequest(dataRequest.id)}>
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

export default TransaksiDetails;
