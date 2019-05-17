import { API } from './instance'
import {
  GET_ALL_USERS,
  GET_CURRENT_USER
} from './types/index';

/**
 * action for get all users
 */
export function getAllUsers() {
  return function (dispatch) {
    API.get(`users`)
      .then(response => {
        dispatch({
          type: GET_ALL_USERS,
          payload: response.data
        });
      });
  }
}

export function getCurrentUser() {
  return function (dispatch) {
    API.get(`current`)
      .then(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        dispatch({ type: GET_CURRENT_USER });
      });
  }
}
