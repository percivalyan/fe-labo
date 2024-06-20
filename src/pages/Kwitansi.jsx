import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createReceipt, listReceipt } from "../services/Receipt";
import { getRequest } from "../services/Request";

const Kwitansi = () => {
  const [receipts, setReceipts] = useState([]);
  const [request, setRequest] = useState([]);

  const [receiptId, setReceiptId] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [dp, setDp] = useState(0);

  const [payment, setPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const { requestId } = useParams();
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    receiptNumber: "",
    recipientName: "",
  });

  // MENYATAKAN FORM INI TIDAK BOLEH KOSONG
  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (receiptNumber.trim()) {
      errorsCopy.receiptNumber = "";
    } else {
      errorsCopy.receiptNumber = "Nomor Kwitansi wajib di isi";
      valid = false;
    }

    if (recipientName.trim()) {
      errorsCopy.recipientName = "";
    } else {
      errorsCopy.recipientName = "Nama Penerima wajib di isi";
      valid = false;
    }
    setErrors(errorsCopy);

    return valid;
  }

  function addReceipt(e) {
    e.preventDefault();

    const receipt = {
      receiptNumber,
      recipientName,
      dp,
      payment,
    };
    console.log(receipt);
    if (validateForm()) {
      createReceipt(requestId, receipt)
        .then((response) => {
          console.log(response.data);
          setCreatePopupOpen(false);
          setTotalPayment("");
          setReceiptNumber("");
          navigator("/kwitansi");
          getAllReceipt();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Respon data semua
  function getAllReceipt() {
    listReceipt()
      .then((response) => {
        setReceipts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Respon data by id
  // function getRequestById(requestId) {
  //   getRequest(requestId)
  //     .then((response) => {
  //       setRequest(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  useEffect(() => {
    if (requestId) {
      getRequest(requestId)
        .then((response) => {
          console.log(requestId);
          console.log("Property details:", response);
          setTotalPayment(response.totalPayment);
          setReceiptNumber(response.requestCode);
        })
        .catch((error) => {
          console.error("Error fetching property details:", error);
          setTotalPayment("");
          setReceiptNumber("");
        });
    } else {
      getAllReceipt();
    }
  }, [requestId]);

  // const [form, setForm] = useState({
  //   no_kwitansi: "",
  //   kode_transaksi: "",
  //   nama_pelanggan: "",
  //   total_biaya: "",
  //   untuk_pembayaran: "",
  //   cara_bayar: "",
  //   jumlah_bayar: "",
  //   terbilang: "",
  // });
  // const [editIndex, setEditIndex] = useState(null);
  // const [deleteIndex, setDeleteIndex] = useState(null);
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  // useEffect(() => {
  //   fetchReceipts();
  // }, []);

  // const fetchReceipts = async () => {
  //   try {
  //     const response = await axios.get("/api/kwitansi");
  //     setReceipts(response.data);
  //   } catch (error) {
  //     console.error("There was an error fetching the receipts!", error);
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm({ ...form, [name]: value });
  // };

  // const handleCreate = async () => {
  //   try {
  //     const response = await axios.post("/api/kwitansi", form);
  //     setReceipts([...receipts, response.data]);
  //     setForm({
  //       no_kwitansi: "",
  //       kode_transaksi: "",
  //       nama_pelanggan: "",
  //       total_biaya: "",
  //       untuk_pembayaran: "",
  //       cara_bayar: "",
  //       jumlah_bayar: "",
  //       terbilang: "",
  //     });
  //     setCreatePopupOpen(false);
  //   } catch (error) {
  //     console.error("There was an error creating the receipt!", error);
  //   }
  // };

  // const handleEdit = (index) => {
  //   setForm(receipts[index]);
  //   setEditIndex(index);
  //   setUpdatePopupOpen(true);
  // };

  // const handleUpdate = async () => {
  //   try {
  //     const id = receipts[editIndex].id;
  //     const response = await axios.put(`/api/kwitansi/${id}`, form);
  //     const updatedReceipts = receipts.map((receipt, index) =>
  //       index === editIndex ? response.data : receipt
  //     );
  //     setReceipts(updatedReceipts);
  //     setForm({
  //       no_kwitansi: "",
  //       kode_transaksi: "",
  //       nama_pelanggan: "",
  //       total_biaya: "",
  //       untuk_pembayaran: "",
  //       cara_bayar: "",
  //       jumlah_bayar: "",
  //       terbilang: "",
  //     });
  //     setEditIndex(null);
  //     setUpdatePopupOpen(false);
  //   } catch (error) {
  //     console.error("There was an error updating the receipt!", error);
  //   }
  // };

  // const handleDelete = async () => {
  //   try {
  //     const id = receipts[deleteIndex].id;
  //     await axios.delete(`/api/kwitansi/${id}`);
  //     const updatedReceipts = receipts.filter((_, i) => i !== deleteIndex);
  //     setReceipts(updatedReceipts);
  //     setDeleteIndex(null);
  //     setDeletePopupOpen(false);
  //   } catch (error) {
  //     console.error("There was an error deleting the receipt!", error);
  //   }
  // };

  function showCreate() {
    if (requestId) {
      return (
        <div>
          <center>
            <h2>
              Kwitansi <br />
              {receiptNumber}
            </h2>
          </center>
          <button
            onClick={() => setCreatePopupOpen(true)}
            className="btn btn-primary mx-2"
          >
            Create Kwitansi
          </button>
        </div>
      );
    } else {
      return <h2>List Kwitansi</h2>;
    }
  }

  return (
    <div className="kwitansi">
      <h2>Kwitansi</h2>
      {showCreate()}
      {isCreatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Create Kwitansi</h3>
            <input
              type="text"
              placeholder="Masukkan Nomor Kwitansi"
              name="receiptNumber"
              value={receiptNumber}
              className={`form-control ${
                errors.receiptNumber ? "is-invalid" : ""
              }`}
              onChange={(e) => setReceiptNumber(e.target.value)}
              disabled
            ></input>
            {errors.receiptNumber && (
              <div className="invalid-feedback"> {errors.receiptNumber} </div>
            )}
            <input
              type="text"
              placeholder="Masukkan Nama Penerima"
              name="recipientName"
              // value={recipientName}
              className={`form-control ${
                errors.recipientName ? "is-invalid" : ""
              }`}
              onChange={(e) => setRecipientName(e.target.value)}
            ></input>
            {errors.recipientName && (
              <div className="invalid-feedback"> {errors.recipientName} </div>
            )}
            <input
              type="text"
              placeholder="Masukkan payment"
              name="payment"
              // value={payment}
              className="form-control"
              onChange={(e) => setPayment(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Total Yang Harus di bayarkan"
              name="totalPayment"
              value={totalPayment}
              className="form-control"
              // onChange={(e) => setPayment(e.target.value)}
              disabled
            ></input>

            <button onClick={addReceipt}>Create</button>
            <button onClick={() => setCreatePopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* {isUpdatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Edit Kwitansi</h3>
            <input
              type="text"
              name="no_kwitansi"
              value={form.no_kwitansi}
              onChange={handleChange}
              placeholder="No. Kwitansi"
            />
            <input
              type="text"
              name="kode_transaksi"
              value={form.kode_transaksi}
              onChange={handleChange}
              placeholder="Kode Transaksi"
            />
            <input
              type="text"
              name="nama_pelanggan"
              value={form.nama_pelanggan}
              onChange={handleChange}
              placeholder="Nama Pelanggan"
            />
            <input
              type="number"
              name="total_biaya"
              value={form.total_biaya}
              onChange={handleChange}
              placeholder="Total Biaya"
            />
            <input
              type="text"
              name="untuk_pembayaran"
              value={form.untuk_pembayaran}
              onChange={handleChange}
              placeholder="Untuk Pembayaran"
            />
            <input
              type="text"
              name="cara_bayar"
              value={form.cara_bayar}
              onChange={handleChange}
              placeholder="Cara Bayar"
            />
            <input
              type="number"
              name="jumlah_bayar"
              value={form.jumlah_bayar}
              onChange={handleChange}
              placeholder="Jumlah Bayar"
            />
            <input
              type="text"
              name="terbilang"
              value={form.terbilang}
              onChange={handleChange}
              placeholder="Terbilang"
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setUpdatePopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )} */}

      {/* {isDeletePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Delete Kwitansi</h3>
            <p>Are you sure you want to delete this receipt?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setDeletePopupOpen(false)}>No</button>
          </div>
        </div>
      )} */}

      <table>
        <thead>
          <tr>
            {/* <th>Kode Transaksi</th>
            <th>Nama Pelanggan</th>
            <th>Total Biaya</th>
            <th>Untuk Pembayaran</th>
            <th>Cara Bayar</th>
            <th>Jumlah Bayar</th>
            <th>Terbilang</th>
            <th>Actions</th> */}
            <th>No. Kwitansi</th>
            <th>Nama Penerima</th>
            <th>DP</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt) => (
            <tr key={receipt.id}>
              <td>{receipt.receiptNumber}</td>
              <td>{receipt.recipientName}</td>
              <td>{receipt.dp}</td>
              <td>{receipt.payment}</td>
              {/* <td>{receipt.kode_transaksi}</td>
              <td>{receipt.nama_pelanggan}</td>
              <td>{receipt.total_biaya}</td>
              <td>{receipt.untuk_pembayaran}</td>
              <td>{receipt.cara_bayar}</td>
              <td>{receipt.jumlah_bayar}</td>
              <td>{receipt.terbilang}</td> */}
              <td>
                {/* <button onClick={() => handleEdit(index)}>Edit</button>
                <button
                  onClick={() => {
                    setDeleteIndex(index);
                    setDeletePopupOpen(true);
                  }}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Kwitansi;
