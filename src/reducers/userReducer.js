import {
  FETCH_USERS,
  GET_CURRENT_USER
} from '../actions/types/index';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { list: action.payload, ...state };
    case GET_CURRENT_USER:
      return { ...state };
    default: return state;
  }
}