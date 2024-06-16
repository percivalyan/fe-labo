import axios from "axios";

const API_URL = "http://localhost/services/api.php"; // Ganti dengan URL API sesuai kebutuhan Anda

export const createBesiBending = (besiBendingData) => {
  return axios.post(`${API_URL}`, besiBendingData);
};

export const updateBesiBending = (besiBendingId, besiBendingData) => {
  return axios.put(`${API_URL}?id=${besiBendingId}`, besiBendingData);
};

export const deleteBesiBending = (besiBendingId) => {
  return axios.delete(`${API_URL}?id=${besiBendingId}`);
};

export const getBesiBending = (besiBendingId) => {
  return axios.get(`${API_URL}?id=${besiBendingId}`);
};

export const listBesiBendings = () => {
  return axios.get(API_URL);
};
