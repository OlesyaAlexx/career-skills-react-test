import axios from "axios";

export const mockAPI = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
});

/* export const setToken = (token) => {
  mockAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  mockAPI.defaults.headers.common.Authorization = ``;
}; */
