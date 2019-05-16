import { API } from './instance'
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
} from './types/index'

import { push } from 'connected-react-router'
import axios from 'axios'
import { API_URL } from '../config'

/*
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

export function emailValidError(emailValidationInfo) {
  return {
    type: 'EMAIL_VALID',
    payload: emailValidationInfo,
  };
}

/*
 * Sign up
 */
export function signupUser(props) {
  const { firstName, accountName, email, password } = props;

  return function (dispatch) {
    API.post(`sign-up`, {
      'password': password,
      'email': email,
      'firstName': firstName,
      'accountName': accountName,
    })
      .then(response => {
        console.log(response)

        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', JSON.stringify(response.data.token));
        }

        // console.log(localStorage.getItem('user'))
        // console.log(localStorage.getItem('token'))
        dispatch({ type: SIGNUP_SUCCESS });
        dispatch({ type: AUTH_USER });
        dispatch(push('/questionnaire'));
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(authError(SIGNUP_FAILURE, error.response.data.err.message))
        }
      });
  }
}

/*
 * Sign in
 */
export function signinUser(props) {
  // console.log(props)
  const { email, password } = props;

  return function (dispatch) {
    API.post(`sign-in`, {
      'email': email,
      'password': password
    })
      .then(response => {
        if (response.data) {
          localStorage.setItem('token', JSON.stringify(response.data.token));
          localStorage.setItem('user', JSON.stringify(response.data.firstName));
          dispatch({ type: AUTH_USER });

          dispatch(push('/'));
        }
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(authError(SIGNIN_FAILURE, error.response.data.message))
        }
      });
  }
}

export function validationUser(email) {

  return function (dispatch) {
    API.post(`email-validation`, {
      'email': email,
    })
      .then(res => res.json())
      .catch(error => dispatch(emailValidError(error.response.data.message)));

    // .catch(error => console.log(error));

  }
}

/*
 * Questionnaire
 */
export function questionnaireUser(props) {
  const {
    radioGroup,
    Name,
    Website,
  } = props;

  let obj = {};

  if (radioGroup === `Company`) {
    obj = {
      'companyName': Name,
      'companyWebsite': Website,
    }
  }

  if (radioGroup === `Agency`) {
    obj = {
      'agencyName': Name,
      'agencyWebsite': Website,
    }
  }

  if (radioGroup === `Freelancer`) {
    obj = {
      'Freelancer': radioGroup,
    }
  }

  if (radioGroup === `Other`) {
    obj = {
      'Other': radioGroup,
    }
  }

  return function (dispatch) {
    API.patch(`profile`, obj)
      .then(response => {
        localStorage.setItem('profile', JSON.stringify(response.data));
        // console.log(localStorage.getItem('profile'))
        dispatch(push('/'));
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(authError(SIGNIN_FAILURE, error.response.data.err.message))
        }
      });
  }
}

/*
 * password forgot
 */
export function passwordForgotUserStep1(data) {
  const {
    email,
  } = data;

  // console.log(email)

  return function (dispatch) {
    API.post(`reset-password`, {
      'email': email,
    })
      .then(response => {
        // localStorage.setItem('tokenReset', JSON.stringify(response.data.token));
        // localStorage.setItem('emailReset', JSON.stringify(response.data.email));
        // console.log(localStorage.getItem('profile'))
        // dispatch({ type: "AUTH_RESET" });
        dispatch(push('/password-forgot-step-2'));
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(authError(SIGNIN_FAILURE, error.response.data.err.message))
        }
      });
  }
}


export function passwordForgotUserStep3(data, token) {
  const {
    password,
  } = data;

  const postData = {
    'password': password
  };

  const axiosConfig = {
    headers: {
      'letter-confirm': token
    }
  };

  return function (dispatch) {
    axios.post(`${API_URL}/change-password`, postData, axiosConfig)
      .then(() => {
        dispatch(push('/sign-in'));
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      })
  }
}


/*
 * Sign out
 */
export function signoutUser() {
  return function (dispatch) {
    // API.get(`signOut`)
    //   .then(() => {
    localStorage.clear();
    dispatch({ type: UNAUTH_USER });
    // })
    // .catch(() => ("error signout"));
  }
}
