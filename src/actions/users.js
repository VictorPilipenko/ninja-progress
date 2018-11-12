import axios from 'axios';
import { API_URL } from '../config';
import {
  GET_ALL_USERS,
  GET_CURRENT_USER
} from './types/index';

/**
 * Fetch all users
 */
export function getAllUsers() {
  const token = JSON.parse(localStorage.getItem('token'));

  return function (dispatch) {
    axios.get(`${API_URL}/users`, { headers: { 'Accept': 'application/json', 'Authorization': token.token_type + ' ' + token.access_token } })
      .then(response => {
        dispatch({
          type: GET_ALL_USERS,
          payload: response.data
        });
      });
  }
}

export function getCurrentUser() {
  const token = JSON.parse(localStorage.getItem('token'));

  return function (dispatch) {
    axios.get(`${API_URL}/current`, { headers: { 'Accept': 'application/json', 'Authorization': token.token_type + ' ' + token.access_token } })

      .then(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        dispatch({ type: GET_CURRENT_USER });
      });
  }
}
