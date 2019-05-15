import axios from 'axios'

export const API = axios.create({
  // baseURL: 'http://74edac58.ngrok.io',
  baseURL: 'http://funnelsmapbackend.qbex.io',
  // headers: {
  //   'authorization': JSON.parse(localStorage.getItem('token'))
  // }
});

// console.log(JSON.parse(localStorage.getItem('token')))

// API.defaults.headers.common['authorization'] = JSON.parse(localStorage.getItem('token'));

API.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) config.headers.authorization = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
