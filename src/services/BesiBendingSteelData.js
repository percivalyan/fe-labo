import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/steel-bending-test-data";

// CREATE SteelBendingTestEntityData
export const createSteelBendingTest = (entity) =>
  axios.post(REST_API_BASE_URL, entity);

// READ ALL SteelBendingTestEntityData
export const listSteelBendingTests = () =>
  axios.get(REST_API_BASE_URL);

// READ SteelBendingTestEntityData by ID
export const getSteelBendingTestById = (id) =>
  axios.get(`${REST_API_BASE_URL}/${id}`).then((response) => {
    console.log(response);
    return response.data;
  });

// UPDATE SteelBendingTestEntityData by ID
export const updateSteelBendingTest = (id, entity) =>
  axios.put(`${REST_API_BASE_URL}/${id}`, entity);

// DELETE SteelBendingTestEntityData by ID
export const deleteSteelBendingTestById = (id) =>
  axios.delete(`${REST_API_BASE_URL}/${id}`);
