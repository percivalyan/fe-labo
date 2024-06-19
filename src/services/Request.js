import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/transactions/request";

// CREATE Permintaan
// POST "http://localhost:8080/api/transactions/request";
export const createRequest = (request) =>
  axios.post(REST_API_BASE_URL, request);

//LIST Permintaan
// GET "http://localhost:8080/api/transactions/request";
export const listRequests = () => axios.get(REST_API_BASE_URL);

//READ by ID
// GET "http://localhost:8080/api/transaction/receipt/1"
export const getRequest = (id) => {
  return axios.get(REST_API_BASE_URL + "/" + id).then((response) => {
    // Cetak response di console
    console.log(response);
    return response.data;
  });
};

//DELETE Permintaan
// DELETE "http://localhost:8080/api/transactions/request/1";
export const deleteRequest = (id) => axios.delete(REST_API_BASE_URL + "/" + id);

//GET Last ID Permintaan
// DELETE "http://localhost:8080/api/transactions/request/last";
export const getLast = () => axios.get(REST_API_BASE_URL + "/last");
