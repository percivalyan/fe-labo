import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/services";

// CREATE by serviceId
// POST "http://localhost:8080/api/services/1/types";
export const createServiceType = (serviceId, serviceType) =>
  axios.post(REST_API_BASE_URL + "/" + serviceId + "/types", serviceType);

//READ ALL List
// GET "http://localhost:8080/api/services/types/list";
export const listServiceTypes = () => {
  return axios.get(REST_API_BASE_URL + "/types/list");
};

//READ List by serviceId
// GET "http://localhost:8080/api/services/1/types";
export const listServiceTypeById = (serviceId) => {
  return axios.get(REST_API_BASE_URL + "/" + serviceId + "/types");
};

//READ by ID
// GET "http://localhost:8080/api/services/types/1";
export const getServiceType = (id) => {
  return axios.get(REST_API_BASE_URL + "/types" + "/" + id).then((response) => {
    // Cetak response di console
    console.log(response);
    return response.data;
  });
};

//UPDATE by ID
// PUT "http://localhost:8080/api/services/types/1";
export const updateServiceType = (id, serviceType) =>
  axios.put(REST_API_BASE_URL + "/types" + "/" + id, serviceType);

//DELETE by ID
// DELETE "http://localhost:8080/api/services/types/1";
export const deleteServiceType = (id) =>
  axios.delete(REST_API_BASE_URL + "/types" + "/" + id);
