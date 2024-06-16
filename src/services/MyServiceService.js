import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/services";

// CREATE
// POST "http://localhost:8080/api/services";
export const createMyService = (myService) =>
  axios.post(REST_API_BASE_URL, myService);

//READ ALL LIST
// GET "http://localhost:8080/api/services/list";
export const listMyServices = () => axios.get(REST_API_BASE_URL + "/list");

//READ by ID
// GET "http://localhost:8080/api/services/1";
export const getMyService = (id) => {
  return axios.get(REST_API_BASE_URL + "/" + id).then((response) => {
    // Cetak response di console
    console.log(response);
    return response.data;
  });
};

// UPDATE by ID
// PUT "http://localhost:8080/api/services/1";
export const updateMyService = (id, myService) =>
  axios.put(REST_API_BASE_URL + "/" + id, myService);

// DELETE by ID
// DELETE "http://localhost:8080/api/services/1";
export const deleteMyService = (id) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
