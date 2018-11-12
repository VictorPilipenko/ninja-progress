import axios from 'axios';
import { API_URL } from '../config';
import {
  FETCH_USERS,
  GET_CURRENT_USER
} from './types/index';

/**
 * Fetch all users
 */
export function fetchUsers() {
  const user = JSON.parse(localStorage.getItem('user'));

  return function (dispatch) {
    axios.get(`${API_URL}/users`, { headers: { 'Accept': 'application/json', 'Authorization': user.token_type + ' ' + user.access_token } })
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data
        });
      });
  }
}

export function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem('user'));

  return function (dispatch) {
    axios.get(`${API_URL}/current`, { headers: { 'Accept': 'application/json', 'Authorization': user.token_type + ' ' + user.access_token } })
    
    .then(response => {
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      dispatch({ type: GET_CURRENT_USER });
    });
  }
}
