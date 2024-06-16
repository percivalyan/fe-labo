import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/transaction";

// CREATE Permintaan
// POST "http://localhost:8080/api/transaction/1/receipt";
export const createReceipt = (requestId, receipt) =>
  axios.post(REST_API_BASE_URL + "/" + requestId + "/receipt", receipt);

//READ ALL LIST
// GET "http://localhost:8080/api/transaction/receipt";
export const listReceipt = () =>
  axios.get(REST_API_BASE_URL + "/receipt" + "/list");

//READ by ID
// GET "http://localhost:8080/api/transaction/receipt/1"

// export const getCustomer = (id) => {
//   return axios.get(REST_API_BASE_URL + "/" + id).then((response) => {
//     // Cetak response di console
//     console.log(response);
//     return response.data;
//   });
// };

// UPDATE by ID
// PUT "http://localhost:8080/api/transaction/receipt/1";
// export const updateCustomer = (id, receipt) =>
//   axios.put(REST_API_BASE_URL + "/" + id, receipt);

// DELETE by ID
// DELETE "http://localhost:8080/api/transaction/receipt/1";
// export const deleteCustomer = (id) =>
//   axios.delete(REST_API_BASE_URL + "/" + id);
