import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listCustomers } from "../services/Customer";
import { listMyServices } from "../services/MyServiceService";
import { listProjects } from "../services/Project";
import {
  createRequest,
  deleteRequest,
  listRequests,
} from "../services/Request";
import {
  getServiceType,
  listServiceTypeById,
} from "../services/ServiceTypeService";

const Transaksi = () => {
  const [loadingServiceTypes, setLoadingServiceTypes] = useState(false);
  const [serviceTypePrice, setServiceTypePrice] = useState(0);

  //FIELD Request START
  const [requestCode, setRequestCode] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  //FIELD DataRequest START
  const [myServices, setMyServices] = useState([]);
  const [selectedMyService, setSelectedMyService] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState("");
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
  // const [dp, setDp] = useState("");
  // const [remainingDP, setRemainingDP] = useState("");
  //FIELD Request END

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

  // untuk respon data projek list
  function getAllProjects() {
    listProjects()
      .then((response) => {
        setProjects(response.data || []); // Ensure projects is an array
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // untuk respon data myService list
  function getAllMyServices() {
    listMyServices()
      .then((response) => {
        setMyServices(response.data || []); // Ensure myServices is an array
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Untuk menampilkan list
  useEffect(() => {
    getAllCustomers();
    getAllProjects();
    getAllMyServices();
  }, []);

  // Fetch service types by service ID
  function getAllServiceTypeById(serviceId) {
    setLoadingServiceTypes(true);
    listServiceTypeById(serviceId)
      .then((response) => {
        setServiceTypes(response.data.data || []); // Ensure serviceTypes is an array
        setLoadingServiceTypes(false);
      })
      .catch((error) => {
        console.error("Error loading service types:", error);
        setLoadingServiceTypes(false);
      });
  }

  //Untuk menampilkan list servicetype berdasarkan id myservice
  useEffect(() => {
    if (selectedMyService) {
      getAllServiceTypeById(selectedMyService);
    } else {
      setServiceTypes([]);
    }
  }, [selectedMyService]);

  // Update price when service type is selected
  useEffect(() => {
    if (selectedServiceType) {
      console.log(selectedServiceType);
      getServiceType(selectedServiceType)
        .then((response) => {
          console.log("Property details:", response.data);
          setServiceTypePrice(response.data.price); // Assuming price is a property of the response data
        })
        .catch((error) => {
          console.error("Error fetching property details:", error);
          setServiceTypePrice("");
        });
    } else {
      setServiceTypePrice("");
    }
  }, [selectedServiceType]);

  // MENYATAKAN FORM INI TIDAK BOLEH KOSONG
  const [errors, setErrors] = useState({
    requestCode: "",
    selectedCustomer: "",
    selectedProject: "",
    selectedMyService: "",
    selectedServiceType: "",
    price: "",
    requestQTY: "",
    totalAmount: "",
  });

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };
    if (requestCode.trim()) {
      errorsCopy.requestCode = "";
    } else {
      errorsCopy.requestCode = "Kode Transaksi wajib di isi";
      valid = false;
    }
    if (
      selectedCustomer.trim() &&
      !isNaN(selectedCustomer) &&
      Number.isInteger(Number(selectedCustomer))
    ) {
      errorsCopy.selectedCustomer = "";
    } else {
      errorsCopy.selectedCustomer = "Customer wajib di isi";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  // Function to calculate total
  const calculateTotalAmount = () => {
    return serviceTypePrice * requestQTY;
  };

  //MULTIPLE ADD Data Request
  const [dataRequests, setDataRequests] = useState([
    {
      myServiceId: "",
      serviceTypeId: "",
      price: "",
      requestQTY: "",
      totalAmount: "",
      mutuBeton: "",
      split: "",
      semen: "",
      ageVariation: "",
    },
  ]);

  //Dynamic Input
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...dataRequests];
    onChangeVal[i].myServiceId = selectedMyService;
    onChangeVal[i].price = serviceTypePrice;
    onChangeVal[i].totalAmount = calculateTotalAmount(value);
    onChangeVal[i][name] = value;

    if (name === "requestQTY") {
      const newQTY = parseInt(value);
      if (!isNaN(newQTY)) {
        onChangeVal[i].requestQTY = newQTY;
      }
    }

    setDataRequests(onChangeVal);
  };

  //Tombol Add Dynamic Input
  const handleClick = () => {
    setDataRequests([
      ...dataRequests,
      {
        myServiceId: selectedMyService,
        serviceTypeId: selectedServiceType,
        price: "",
        requestQTY: "",
        totalAmount: "",
        mutuBeton: "",
        split: "",
        semen: "",
        ageVariation: "",
      },
    ]);
    setSelectedMyService("");
    setSelectedServiceType("");
    setServiceTypePrice(0);
    setRequestQTY(1);
    setMutuBeton("");
    setSplit("");
    setSemen("");
    setAgeVariation("");
  };

  //Menghapus Dynamic Input
  const handleDelete = (i) => {
    const deleteVal = [...dataRequests];
    deleteVal.splice(i, 1);
    setDataRequests(deleteVal);
  };
  const navigator = useNavigate();
  //Fungsi menyimpan semua data
  function saveRequests(e) {
    e.preventDefault();

    const request = {
      requestCode,
      customerId: selectedCustomer,
      projectId: selectedProject,
      dataRequest: dataRequests,
      senderName,
      recipientName,
      totalPayment,
      // dp,
      // remainingDP,
    };
    console.log(request);
    if (validateForm()) {
      createRequest(request)
        .then((response) => {
          console.log(response.data);
          setCreatePopupOpen(false);
          getAllRequests();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isCreatePopupOpen, setCreatePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [requests, setRequests] = useState([]);

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

  return (
    <div className="transaksi">
      <h2>Transaksi</h2>

      {/* <div>
        <button
          onClick={() => setCreatePopupOpen(true)}
          className="btn btn-primary mx-2"
        >
          Create Transaksi
        </button>
      </div> */}

      {isCreatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Create Transaksi</h3>
            <input
              type="text"
              placeholder="Masukkan Kode Transaksi Layanan"
              className={`form-control ${
                errors.requestCode ? "is-invalid" : ""
              }`}
              name="requestCode"
              onChange={(e) => setRequestCode(e.target.value)}
            ></input>
            {errors.requestCode && (
              <div className="invalid-feedback"> {errors.requestCode} </div>
            )}
            <p className="input" htmlFor="inputGroupSelect01">
              Nama Pelanggan
            </p>
            <select
              className={`custom-select ${
                errors.selectedCustomer ? "is-invalid" : ""
              }`}
              id="inputGroupSelect01"
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option>Pilih Nama Pelanggan</option>
              {customers.map((customer) => (
                <option key={customer.idPelanggan} value={customer.idPelanggan}>
                  {customer.namaPelanggan}
                </option>
              ))}
            </select>
            {errors.selectedCustomer && (
              <div className="invalid-feedback">
                {" "}
                {errors.selectedCustomer}{" "}
              </div>
            )}
            <p className="input" htmlFor="inputGroupSelect02">
              Nama Projek
            </p>
            <select
              className="custom-select"
              id="inputGroupSelect02"
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option defaultValue="">Pilih Projek</option>
              {projects.map((project) => (
                <option key={project.idProjek} value={project.idProjek}>
                  {project.namaProjek}
                </option>
              ))}
            </select>
            <p className="input">Nama Pengirim</p>
            <input
              type="text"
              placeholder="Masukkan Nama Pengirim"
              className="form-control"
              name="senderName"
              onChange={(e) => setSenderName(e.target.value)}
            ></input>
            <p className="input">Nama Penerima</p>
            <input
              type="text"
              placeholder="Masukkan Nama Penerima"
              className="form-control"
              name="recipientName"
              onChange={(e) => setRecipientName(e.target.value)}
            />
            <hr />
            <center>
              <p> Pilih Layanan </p>
            </center>
            <hr />

            {/* Nama Layanan */}
            {dataRequests.map((val, i) => (
              <div key={i}>
                <p className="input" htmlFor={`inputGroupSelect03-${i}`}>
                  Nama Layanan
                </p>
                <select
                  name="myServiceId"
                  className="custom-select"
                  id={`inputGroupSelect03-${i}`}
                  onChange={(e) => {
                    setSelectedMyService(e.target.value);
                    handleChange(e, i);
                  }}
                >
                  <option value="">Pilih Nama Layanan</option>
                  {myServices.map((myService) => (
                    <option key={myService.id} value={myService.id}>
                      {myService.serviceCode} - {myService.serviceName}
                    </option>
                  ))}
                </select>
                {/* Nama Jenis Layanan */}
                <p className="input" htmlFor={`inputGroupSelect04-${i}`}>
                  Nama Kategori Layanan
                </p>
                <select
                  name="serviceTypeId"
                  className="custom-select"
                  id={`inputGroupSelect04-${i}`}
                  disabled={!selectedMyService || loadingServiceTypes}
                  onChange={(e) => {
                    setSelectedServiceType(e.target.value);
                    handleChange(e, i);
                  }}
                >
                  <option value="">Pilih Nama Kategori Layanan</option>
                  {serviceTypes.map((serviceType) => (
                    <option key={serviceType.id} value={serviceType.id}>
                      {serviceType.serviceTypeCode} -
                      {serviceType.serviceTypeName}
                    </option>
                  ))}
                </select>

                {/* Harga */}
                <p className="input">Price</p>
                <input
                  name="price"
                  type="number"
                  value={serviceTypePrice || price || val.price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    handleChange(e, i);
                  }}
                  readOnly
                  placeholder="Harga"
                  className="form-control"
                />

                {/* Jumlah */}
                <p className="input">Quantity</p>
                <input
                  value={requestQTY}
                  onChange={(e) => {
                    setRequestQTY(e.target.value);
                    handleChange(e, i);
                  }}
                  name="requestQTY"
                  type="number"
                  placeholder="Masukkan Jumlah"
                  className="form-control"
                />

                {/* Total */}
                <p className="input">Total Harga Layanan</p>
                <input
                  name="totalAmount"
                  type="number"
                  value={
                    totalAmount || calculateTotalAmount(val) || val.totalAmount
                  }
                  onChange={(e) => {
                    setTotalAmount(e.target.value);
                    handleChange(e, i);
                  }}
                  readOnly
                  placeholder="Total"
                  className="form-control"
                />

                <hr />
                <center>
                  <p> Catatan Tambahan </p>
                </center>
                <hr />
                {/*catatan */}

                <p className="input">Mutu Beton</p>
                <input
                  name="mutuBeton"
                  value={mutuBeton || val.mutuBeton}
                  onChange={(e) => {
                    setMutuBeton(e.target.value);
                    handleChange(e, i);
                  }}
                  type="text"
                  placeholder="Masukkan Mutu Beton"
                  className="form-control"
                ></input>

                <p className="input">Split</p>
                <input
                  name="split"
                  value={split || val.split}
                  onChange={(e) => {
                    setSplit(e.target.value);
                    handleChange(e, i);
                  }}
                  type="text"
                  placeholder="Masukkan Split"
                  className="form-control"
                ></input>

                <p className="input">Semen</p>
                <input
                  name="semen"
                  value={semen || val.semen}
                  onChange={(e) => {
                    setSemen(e.target.value);
                    handleChange(e, i);
                  }}
                  type="text"
                  placeholder="Masukkan Semen"
                  className="form-control"
                ></input>

                <p className="input">Variasi Umur</p>
                <input
                  name="ageVariation"
                  value={ageVariation || val.ageVariation}
                  onChange={(e) => {
                    setAgeVariation(e.target.value);
                    handleChange(e, i);
                  }}
                  type="text"
                  placeholder="Masukkan Variasi Umur"
                  className="form-control"
                ></input>
                <hr />
                <center>
                  <p> Payment </p>
                </center>
                <hr />

                <p className="input">Total</p>
                <input
                  type="text"
                  placeholder="Total Pembayaran" //Total Keseluruhan dari Data Request
                  className="form-control"
                  name="totalPayment"
                  onChange={(e) => setTotalPayment(e.target.value)}
                ></input>
                <button onClick={saveRequests}>Create</button>
                <button onClick={() => setCreatePopupOpen(false)}>
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* {isUpdatePopupOpen && (
        <div className="popup-box">
          <div className="popup">
            <h3>Edit Transaksi</h3>
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
              type="text"
              name="nama_projek"
              value={form.nama_projek}
              onChange={handleChange}
              placeholder="Nama Projek"
            />
            <input
              type="text"
              name="nama_pengirim"
              value={form.nama_pengirim}
              onChange={handleChange}
              placeholder="Nama Pengirim"
            />
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              placeholder="Tanggal"
            />
            <input
              type="text"
              name="nama_layanan"
              value={form.nama_layanan}
              onChange={handleChange}
              placeholder="Nama Layanan"
            />
            <input
              type="text"
              name="nama_kategori_layanan"
              value={form.nama_kategori_layanan}
              onChange={handleChange}
              placeholder="Nama Kategori Layanan"
            />
            <input
              type="text"
              name="ukurannnnnn"
              value={form.ukuran}
              onChange={handleChange}
              placeholder="Ukuran"
            />
            <input
              type="number"
              name="jumlah"
              value={form.jumlah}
              onChange={handleChange}
              placeholder="Jumlah"
            />
            <input
              type="text"
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              placeholder="Catatan"
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setUpdatePopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )} */}

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
              {/* <td>{request.customer.projects.namaProjek}</td> */}
              <td>{request.project.namaProjek}</td>
              <td>{request.senderName}</td>
              <td>{request.recipientName}</td>
              <td>{request.totalPayment}</td>

              <td>
                <button onClick={() => viewReceipt(request.id)}>Receipt</button>
                <button
                  onClick={() => viewDetails(request.id)}
                  style={{ margin: "10px" }}
                >
                  View
                </button>
                <button
                  onClick={() => viewForm(request.id)}
                  style={{ margin: "10px" }}
                >
                  Form
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
