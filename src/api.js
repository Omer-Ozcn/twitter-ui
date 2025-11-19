import axios from "axios";

// Backend adresin (Spring Boot varsayılan portu 8080'dir)
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Her istekten önce localStorage'daki token'ı header'a ekle
api.interceptors.request.use(
  (config) => {
    const rawAuth = localStorage.getItem("tw_auth");
    if (rawAuth) {
      const { authHeader } = JSON.parse(rawAuth);
      if (authHeader) {
        config.headers.Authorization = authHeader;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;