import axios from 'axios';

const api = axios.create({
  baseURL: 'https://projectip2-book-store-api.up.railway.app',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Skip Authorization header for CSRF and login endpoints
    const skipAuthEndpoints = ['/sanctum/csrf-cookie', '/api/login', '/api/register'];
    const token = localStorage.getItem('token');
    if (token && !skipAuthEndpoints.some((endpoint) => config.url.includes(endpoint))) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;