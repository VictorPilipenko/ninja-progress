import {

} from '../actions/types/index';


const initialState = {

}

export default function (state = initialState, action) {
  switch (action.type) {
    ///////////////////////////////////////////////////////////////////////////
    case 'CHANGE_USER_NAME_SUCCESS':
      return { ...state, changeUserNameMessage: action.payload };
    case 'CHANGE_USER_NAME_FAILURE':
      return { ...state, changeUserNameMessage: action.payload };
    ///////////////////////////////////////////////////////////////////////////
    case 'CHANGE_USER_PASSWORD_SUCCESS':
      return { ...state, changeUserPasswordMessage: action.payload };
    case 'CHANGE_USER_PASSWORD_FAILURE':
      return { ...state, changeUserPasswordMessage: action.payload };
    ///////////////////////////////////////////////////////////////////////////
     case 'CHANGE_USER_AVATAR_SUCCESS':
      return { ...state, changeUserAvatarMessage: action.payload };
    case 'CHANGE_USER_AVATAR_FAILURE':
      return { ...state, changeUserAvatarMessage: action.payload };
    ///////////////////////////////////////////////////////////////////////////

    default: return state;
  }
}