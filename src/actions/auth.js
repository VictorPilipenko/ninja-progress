import axios from 'axios';
import { API_URL } from '../config';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
} from './types/index';

import { push } from 'react-router-redux'

/*
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

/*
 * Sign up
 */
export function signupUser(props) {

  const { name, email, password } = props;
  console.log(props);
  return function (dispatch) {
    axios.post(`${API_URL}/sign-up`, {
      headers: { 'Accept': 'application/json' },
      'name': name,
      'email': email,
      'password': password
    })
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch(response => dispatch(authError(SIGNUP_FAILURE, response.data.error)));
  }
}

/*
 * Sign in
 */
export function signinUser(props) {
  const { email, password } = props;

  return function (dispatch) {
    axios.post(`${API_URL}/sign-in`, {
      headers: { 'Accept': 'application/json' },
      'email': email,
      'password': password
    })
      .then(response => {
        localStorage.setItem('token', JSON.stringify(response.data));

        dispatch({ type: AUTH_USER });

        dispatch(push('/info'));
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
  }
}

/*
 * Sign out
 */
export function signoutUser() {
  const token = JSON.parse(localStorage.getItem('token'));

  return function (dispatch) {
    axios.get(`${API_URL}/sign-out`, { 
      headers: { 'Accept': 'application/json', 'Authorization': token ? `${token.token_type} ${token.access_token}` : null } 
    })
      .then(() => {
        localStorage.clear();
        dispatch({ type: UNAUTH_USER });
      })
      .catch(() => ("error signout"));
  }
}
