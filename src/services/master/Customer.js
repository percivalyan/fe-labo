import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/cust";

// CREATE Permintaan
// POST "http://localhost:8080/api/cust";
export const createCustomer = (customer) =>
  axios.post(REST_API_BASE_URL, customer);

//READ ALL LIST
// GET "http://localhost:8080/api/cust";
export const listCustomers = () => axios.get(REST_API_BASE_URL + "/list");

//READ by ID
// GET "http://localhost:8080/api/cust/1"

export const getCustomer = (id) => {
  return axios.get(REST_API_BASE_URL + "/" + id).then((response) => {
    // Cetak response di console
    console.log(response);
    return response.data;
  });
};

// UPDATE by ID
// PUT "http://localhost:8080/api/cust/1";
export const updateCustomer = (id, customer) =>
  axios.put(REST_API_BASE_URL + "/" + id, customer);

// DELETE by ID
// DELETE "http://localhost:8080/api/cust/1";
export const deleteCustomer = (id) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
