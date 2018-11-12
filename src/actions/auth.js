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
  return function (dispatch) {
    axios.post(`${API_URL}/sign-up`, props)
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
  console.log(props);

  return function (dispatch) {
    axios.post(`${API_URL}/sign-in`, {
      headers: { 'Accept': 'application/json' },

        'email': email,
        'password': password
    
    })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));

        dispatch({ type: AUTH_USER });

        dispatch(push('/help'));
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
  }
}

/*
 * Sign out
 */
export function signoutUser() {
  localStorage.clear();

  return {
    type: UNAUTH_USER,
  }
}
