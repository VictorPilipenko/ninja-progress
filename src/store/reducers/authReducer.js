import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  AUTH_USER,
  UN_AUTH_USER,
  EMAIL_VALID,
  AUTH_RESET,
  AUTH_RESET_SUCCESS,
  AUTH_RESET_FAILURE,
  QUESTIONNAIRE_SUCCESS,
  QUESTIONNAIRE_FAILURE,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAILURE,

} from '../actions/types/index';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, signup: true, error: '' };
    case SIGNUP_FAILURE:
      return { ...state, signup: false, error: action.payload };
    case SIGNIN_FAILURE:
      return { ...state, error: action.payload };

    ////////////////////////////////////////////////////////////////////////////////
    case QUESTIONNAIRE_SUCCESS:
      return { ...state, questionnaireError: '' };
    case QUESTIONNAIRE_FAILURE:
      return { ...state, questionnaireError: action.payload };
       ////////////////////////////////////////////////////////////////////////////////
    case PASSWORD_FORGOT_SUCCESS:
      return { ...state, passwordForgotError: '' };
    case PASSWORD_FORGOT_FAILURE:
      return { ...state, passwordForgotError: action.payload };
    ////////////////////////////////////////////////////////////////////////////////
    case AUTH_USER:
      return { ...state, authenticated: true, error: '' };
    case UN_AUTH_USER:
      return { ...state, authenticated: false, error: '' };

    case EMAIL_VALID:
      return { ...state, emailValidationInfo: action.payload }
    ////////////////////////////////////////////////////////////////////////////////
    case AUTH_RESET:
      return { ...state, authenticatedReset: true, error: '' }
    case AUTH_RESET_SUCCESS:
      return { ...state, authenticatedReset: false, error: '' }
    case AUTH_RESET_FAILURE:
      return { ...state, authenticatedReset: false, error: action.payload }
    default: return state;
  }
}