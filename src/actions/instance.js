import axios from 'axios'

import { API_URL } from '../config'

export const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(
  function (config) {

    const token = JSON.parse(localStorage.getItem('token'));
    if (token) config.headers.authorization = token;

    // const tokenReset = JSON.parse(localStorage.getItem('tokenReset'));
    // if (tokenReset) config.headers['letter-confirm'] = tokenReset;

    // if (token.token_type === 'Bearer') config.headers.authorization = token;
    // if (token.token_type === 'Letter') config.headers.authorization = tokenReset;
    // else if (tokenReset) config.headers.authorization = tokenReset;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);