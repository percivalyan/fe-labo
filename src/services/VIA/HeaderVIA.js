import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/form";

// CREATE
// POST "http://localhost:8080/api/form/3/via";
export const createHeaderVIA = (requestId, headerVIA) =>
  axios.post(REST_API_BASE_URL + "/" + requestId + "/via", headerVIA);

//READ list by req id
// GET "http://localhost:8080/api/services/list";
// export const listMyServices = () => axios.get(REST_API_BASE_URL + "/list");
export const getHeaderVIAbyReqId = (requestId) => {
  return axios
    .get(REST_API_BASE_URL + "/" + requestId + "/via")
    .then((response) => {
      // Cetak response di console
      console.log(response);
      return response.data;
    });
};
//READ by ID
// GET "http://localhost:8080/api/form/via/3";
export const getHeaderVIAById = (headerVIAId) => {
  return axios
    .get(REST_API_BASE_URL + "/via" + "/" + headerVIAId)
    .then((response) => {
      // Cetak response di console
      console.log(response);
      return response.data;
    });
};

// UPDATE by ID
// PUT "http://localhost:8080/api/services/1";
// export const updateMyService = (id, myService) =>
//   axios.put(REST_API_BASE_URL + "/" + id, myService);

// DELETE by ID
// DELETE "http://localhost:8080/api/form/via/1";
export const deleteHeaderVIA = (headerVIAId) =>
  axios.delete(REST_API_BASE_URL + "/via" + "/" + headerVIAId);
