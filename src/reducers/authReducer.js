import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
} from '../actions/types/index';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, signup: true, error: '' };
    case SIGNUP_FAILURE:
      return { ...state, signup: false, error: action.payload };
    case SIGNIN_FAILURE:
      return { ...state, error: action.payload };
    case AUTH_USER:
      return { ...state, authenticated: true, error: '' };
    case UNAUTH_USER:
      return { ...state, authenticated: false, error: '' };
    case "EMAIL_VALID":
      return { ...state, emailValidationInfo: action.payload }
    case "AUTH_RESET":
      return { ...state, authenticatedReset: true, error: '' }
    default: return state;
  }
}