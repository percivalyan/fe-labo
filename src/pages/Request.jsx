import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { listCustomers } from "../services/Customer";
import { listMyServices } from "../services/MyServiceService";
import { listProjects } from "../services/Project";
import { createRequest } from "../services/Request";
import {
  getServiceType,
  listServiceTypeById,
} from "../services/ServiceTypeService";

const Request = () => {
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
  // const [requestQTY, setRequestQTY] = useState(1);
  // const [totalAmount, setTotalAmount] = useState("");
  // const [mutuBeton, setMutuBeton] = useState("");
  // const [split, setSplit] = useState("");
  // const [semen, setSemen] = useState("");
  // const [ageVariation, setAgeVariation] = useState("");
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
    return serviceTypePrice * inputData.requestQTY;
  };

  //MULTIPLE ADD Data Request
  const [dataRequests, setDataRequests] = useState([]);
  let [bolin, setBolin] = useState(false);
  let [index, setIndex] = useState();

  let [inputData, setInputData] = useState({
    selectedMyService: "",
    selectedServiceType: "",
    price: "",
    requestQTY: "",
    totalAmount: "",
    mutuBeton: "",
    split: "",
    semen: "",
    ageVariation: "",
  });
  let {
    myServiceId,
    serviceTypeId,
    requestQTY,
    totalAmount,
    mutuBeton,
    split,
    semen,
    ageVariation,
  } = inputData;

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  //Tombol Add Dynamic Input
  const handleClick = () => {
    setDataRequests([
      ...dataRequests,
      {
        myServiceId: selectedMyService,
        serviceTypeId: selectedServiceType,
        price: serviceTypePrice,
        requestQTY: inputData.requestQTY,
        totalAmount: calculateTotalAmount(),
        mutuBeton: inputData.mutuBeton,
        split: inputData.split,
        semen: inputData.semen,
        ageVariation: inputData.ageVariation,
      },
    ]);
    setInputData({
      selectedMyService: "",
      selectedServiceType: "",
      price: "",
      requestQTY: "",
      totalAmount: "",
      mutuBeton: "",
      split: "",
      semen: "",
      ageVariation: "",
    });
    setSelectedMyService("");
    setSelectedServiceType("");
  };

  //Menghapus Dynamic Input
  const handleDelete = (i) => {
    console.log(i, "this index row want to be delete");
    const deleteVal = [...dataRequests];
    deleteVal.splice(i, 1);
    setDataRequests(deleteVal);
  };

  function updatedata(i) {
    let {
      myServiceId,
      serviceTypeId,
      price,
      requestQTY,
      totalAmount,
      mutuBeton,
      split,
      semen,
      ageVariation,
    } = dataRequests[i]; //this perticular index no row data shoud be update so we get this index no row data in name or number
    setInputData({
      selectedMyService: myServiceId,
      selectedServiceType: serviceTypeId,
      price,
      requestQTY,
      totalAmount,
      mutuBeton,
      split,
      semen,
      ageVariation,
    });
    setServiceTypePrice(price);
    setBolin(true);
    setIndex(i);
  }
  function updateinfo() {
    let total = [...dataRequests];
    total.splice(index, 1, {
      myServiceId: inputData.selectedMyService,
      serviceTypeId: inputData.selectedServiceType,
      price: serviceTypePrice,
      requestQTY: inputData.requestQTY,
      totalAmount: calculateTotalAmount(),
      mutuBeton: inputData.mutuBeton,
      split: inputData.split,
      semen: inputData.semen,
      ageVariation: inputData.ageVariation,
    });
    setDataRequests(total);
    setBolin(false);
    setInputData({
      selectedMyService: "",
      selectedServiceType: "",
      price: "",
      requestQTY: "",
      totalAmount: "",
      mutuBeton: "",
      split: "",
      semen: "",
      ageVariation: "",
    });
    setSelectedMyService("");
    setSelectedServiceType("");

    setServiceTypePrice(0); // Reset service type price
  }

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

          // getAllRequests();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  const [requests, setRequests] = useState([]);
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
          // setCreatePopupOpen(false);
          navigator("/transaksi");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <div className="request">
      <div className="form-container">
        <fieldset>
          <legend>PILIH LAYANAN</legend>

          <label className="input">Nama Layanan:</label>

          <select
            name="myServiceId"
            className="custom-select"
            onChange={(e) => {
              setSelectedMyService(e.target.value);
              handleChange(e);
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
          <label className="input">Nama Kategori Layanan</label>
          <select
            name="serviceTypeId"
            className="custom-select"
            disabled={!selectedMyService || loadingServiceTypes}
            onChange={(e) => {
              setSelectedServiceType(e.target.value);
              handleChange(e);
            }}
          >
            <option value="">Pilih Nama Kategori Layanan</option>
            {serviceTypes.map((serviceType) => (
              <option key={serviceType.id} value={serviceType.id}>
                {serviceType.serviceTypeCode} -{serviceType.serviceTypeName}
              </option>
            ))}
          </select>

          {/* Harga */}
          <label className="input">Price</label>
          <input
            name="price"
            type="number"
            value={serviceTypePrice || price || inputData.price}
            onChange={handleChange}
            readOnly
            placeholder="Harga"
            className="form-control"
          />

          {/* Jumlah */}
          <label className="input">Quantity</label>
          <input
            value={requestQTY}
            onChange={handleChange}
            name="requestQTY"
            type="number"
            placeholder="Masukkan Jumlah"
            className="form-control"
          />

          {/* Total */}
          <label className="input">Total Harga Layanan</label>
          <input
            name="totalAmount"
            type="number"
            value={
              totalAmount ||
              calculateTotalAmount(inputData) ||
              inputData.totalAmount
            }
            onChange={handleChange}
            readOnly
            placeholder="Total"
            className="form-control"
          />

          <hr />
          <center>
            <label> Catatan Tambahan </label>
          </center>
          <hr />
          {/*catatan */}

          <label className="input">Mutu Beton</label>
          <input
            name="mutuBeton"
            value={mutuBeton || inputData.mutuBeton}
            onChange={handleChange}
            type="text"
            placeholder="Masukkan Mutu Beton"
            className="form-control"
          ></input>

          <label className="input">Split</label>
          <input
            name="split"
            value={split || inputData.split}
            onChange={handleChange}
            type="text"
            placeholder="Masukkan Split"
            className="form-control"
          ></input>

          <label className="input">Semen</label>
          <input
            name="semen"
            value={semen || inputData.semen}
            onChange={handleChange}
            type="text"
            placeholder="Masukkan Semen"
            className="form-control"
          ></input>

          <label className="input">Variasi Umur</label>
          <input
            name="ageVariation"
            value={ageVariation || inputData.ageVariation}
            onChange={handleChange}
            type="text"
            placeholder="Masukkan Variasi Umur"
            className="form-control"
          ></input>
          <button onClick={!bolin ? handleClick : updateinfo}>
            {!bolin ? `Add data` : `Update data`}
          </button>
        </fieldset>
      </div>
      <div className="table-container">
        <div className="form-container">
          <h2>Form Transaksi</h2>
          <form>
            {/* TRANSAKSI */}
            <fieldset>
              <legend>TRANSAKSI</legend>
              <label>Kode Transaksi:</label>
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
              <label className="input" htmlFor="inputGroupSelect01">
                Nama Pelanggan
              </label>
              <select
                className={`custom-select ${
                  errors.selectedCustomer ? "is-invalid" : ""
                }`}
                id="inputGroupSelect01"
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                <option>Pilih Nama Pelanggan</option>
                {customers.map((customer) => (
                  <option
                    key={customer.idPelanggan}
                    value={customer.idPelanggan}
                  >
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
              <label className="input" htmlFor="inputGroupSelect02">
                Nama Projek
              </label>
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
              <label className="input">Nama Pengirim</label>
              <input
                type="text"
                placeholder="Masukkan Nama Pengirim"
                className="form-control"
                name="senderName"
                onChange={(e) => setSenderName(e.target.value)}
              ></input>
              <label className="input">Nama Penerima</label>
              <input
                type="text"
                placeholder="Masukkan Nama Penerima"
                className="form-control"
                name="recipientName"
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </fieldset>

            {/* PEMBAYARAN */}
            <fieldset>
              <legend>PEMBAYARAN</legend>
              <label>TOTAL:</label>
              <input
                type="text"
                placeholder="Total Pembayaran" //Total Keseluruhan dari Data Request
                className="form-control"
                name="totalPayment"
                onChange={(e) => setTotalPayment(e.target.value)}
              ></input>
              <br />
              <button onClick={saveRequests}>Submit All</button>
              <br />
            </fieldset>
          </form>
        </div>
        <h2>Daftar Layanan</h2>
        <table>
          <thead>
            <tr>
              <th>Nama Layanan</th>
              <th>Kategori Layanan</th>
              <th>Harga</th>
              <th>Kuantitas</th>

              <th>Total Harga</th>
              <th>Catatan</th>
              <th>update</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {dataRequests &&
              dataRequests.map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val.myServiceId}</td>
                    <td>{val.serviceTypeId}</td>
                    <td>{val.price}</td>
                    <td>{val.requestQTY}</td>
                    <td>{val.totalAmount}</td>
                    <td>
                      {val.mutuBeton}, {val.split}, {val.semen},
                      {val.ageVariation}
                    </td>
                    <td>
                      <button onClick={() => updatedata(i)}>update</button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(i)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Request;
