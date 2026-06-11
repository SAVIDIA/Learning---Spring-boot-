import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});

api.interceptors.response.use(
  response => response,
  error => {
    alert(
      error?.response?.data?.message ||
      "Server Error"
    );

    return Promise.reject(error);
  }
);

export default api;