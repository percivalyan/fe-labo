import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/project";

// CREATE Permintaan
// POST "http://localhost:8080/api/project";
export const createProject = (project) =>
  axios.post(REST_API_BASE_URL, project);

//READ ALL LIST
// GET "http://localhost:8080/api/project";
export const listProjects = () => axios.get(REST_API_BASE_URL + "/list");

//READ by ID
// GET "http://localhost:8080/api/cust/1"
export const getProject = (id) => {
  return axios.get(REST_API_BASE_URL + "/" + id).then((response) => {
    // Cetak response di console
    console.log(response);
    return response.data;
  });
};

// UPDATE by ID
// PUT "http://localhost:8080/api/project/1";
export const updateProject = (id, project) =>
  axios.put(REST_API_BASE_URL + "/" + id, project);

// DELETE by ID
// DELETE "http://localhost:8080/api/project/1";
export const deleteProject = (id) => axios.delete(REST_API_BASE_URL + "/" + id);
