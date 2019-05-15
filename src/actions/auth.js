import { API } from './instance'
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
} from './types/index'

import { push } from 'connected-react-router'

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
    API.post(`signUp`, {
      'password': password,
      'email': email,
      'firstName': firstName,
      'accountName': accountName,
    })
      .then(response => {
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', JSON.stringify(response.data.token));
        console.log(localStorage.getItem('user'))
        console.log(localStorage.getItem('token'))
        dispatch({ type: SIGNUP_SUCCESS });
        dispatch(push('/questionnaire'));
      })
      // .catch(response => dispatch(authError(SIGNUP_FAILURE, response.data.error)));
      .catch(() => dispatch(authError(SIGNUP_FAILURE, "SIGNUP_FAILURE")));
  }
}

/*
 * Sign in
 */
export function signinUser(props) {
  console.log(props)
  const { email, password } = props;

  return function (dispatch) {
    API.post(`signIn`, {
      'email': email,
      'password': password
    })
      .then(response => {
        console.log(response)
        localStorage.setItem('token', JSON.stringify(response.data));

        dispatch({ type: AUTH_USER });

        dispatch(push('/'));
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
  }
}

export function validationUser(email) {

  return function (dispatch) {
    API.post(`emailvalidation`, {
      'email': email,
    })
      // .then(response => {
      //   console.log(response)
      //   // dispatch({ type: AUTH_USER });

      //   // dispatch(push('/'));
      //   dispatch(emailValidError(SIGNUP_FAILURE, response));
      // })
      // .catch(response => dispatch(emailValidError(SIGNUP_FAILURE, 'error')));
      .then(res => res.json())
      .then(json =>
        console.log(json)
      )
      .catch(error => dispatch(emailValidError(error.response.data.message)));
      // .catch(error => console.log(error.response.data.message))
  }
}

/*
 * Questionnaire
 */
export function questionnaireUser(props) {
  const {
    radioGroup,
    companyName,
    companyWebsite,
    agencyName,
    agencyWebsite,
  } = props;

  let obj = {};

  if (radioGroup === `Company`) {
    obj = {
      'companyName': companyName,
      'companyWebsite': companyWebsite,
    }
  }

  if (radioGroup === `Agency`) {
    obj = {
      'agencyName': agencyName,
      'agencyWebsite': agencyWebsite,
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

  console.log(localStorage.getItem('token'))

  // radioGroup === 'Company' ? obj = {
  //   'companyName': companyName,
  //   'companyWebsite': companyWebsite,
  // } : null

  // radioGroup === 'Agency' ? obj = {
  //   'agencyName': agencyName,
  //   'agencyWebsite': agencyWebsite,
  // } : null

  // radioGroup === 'Freelancer' ? obj = {
  //   'Freelancer': radioGroup,
  // } : null

  // radioGroup === 'Other' ? obj = {
  //   'Other': radioGroup,
  // } : null


  return function (dispatch) {
    API.patch(`profile`, obj)
      .then(response => {
        localStorage.setItem('profile', JSON.stringify(response.data));
        console.log(localStorage.getItem('profile'))
        dispatch(push('/'));
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Error")));
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
