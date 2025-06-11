import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // LOCAL
  // baseURL: 'https://plantilla-backend-springboot-production.up.railway.app/api', // RAILWAY
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const axiosAuthInstance = axios.create({
  baseURL: 'http://localhost:8080/api/auth', //LOCAL
  // baseURL: 'https://plantilla-backend-springboot-production.up.railway.app/api/auth', //RAILWAY
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosInstance, axiosAuthInstance };
