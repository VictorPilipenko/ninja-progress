import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://api.year-progress.org/api/',
  headers: {
    'Accept': 'application/json',
  }
});

API.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) config.headers.Authorization = `${token.token_type} ${token.access_token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);