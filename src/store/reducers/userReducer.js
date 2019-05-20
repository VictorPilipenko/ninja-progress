import {
  GET_ALL_USERS,
  GET_USER_INFO,
} from '../actions/types/index';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { users: action.payload, ...state };
    case GET_USER_INFO:
      return {
        ...state,
        firstName: action.payload.firstName,
        id: action.payload._id
      };
    default: return state;
  }
}