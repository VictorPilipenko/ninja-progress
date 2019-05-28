// import { push } from 'connected-react-router'
import Cookies from "js-cookie";
import { API } from './instance'
import axios from 'axios'
import { API_URL } from '../../config'



export function changeUserName(data) {
  const {
    name,
  } = data;

  console.log(name)
  return function (dispatch) {
    API.patch(`myprofile`, {
      'firstName': name,
    })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          Cookies.set("userFirstName", name);
          dispatch({
            type: "SETTINGS_MESSAGE_NAME_SUCCESS",
            payload: response.data.message
          });
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: "SETTINGS_MESSAGE_NAME_FAILURE",
            payload: error.response.data.error
          });
        }
      });
  }
}

export function resetSettingsMessageName() {
  return function (dispatch) {
    dispatch({ type: 'SETTINGS_MESSAGE_NAME_RESET' });
  }
}


export function changeUserPassword(data) {
  const {
    currentPassword,
    newPassword,
  } = data;

  console.log('currentPassword: ', currentPassword)
  console.log('newPassword: ', newPassword)
  return function (dispatch) {
    API.patch(`myprofile`, {
      'password': newPassword,
      // 'newPassword': newPassword,
    })
      .then(response => {
        if (response.data) {
          dispatch({
            type: "SETTINGS_MESSAGE_PASSWORD_SUCCESS",
            payload: response.data.message
          });
          // Cookies.set("userFirstName", response.data.firstName);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: "SETTINGS_MESSAGE_PASSWORD_FAILURE",
            payload: error.response.data.message
          });
        }
      });
  }
}

export function resetSettingsMessagePassword() {
  return function (dispatch) {
    dispatch({ type: 'SETTINGS_MESSAGE_PASSWORD_RESET' });
  }
}


export function changeUserAvatar(avatar) {
  const token = JSON.parse(localStorage.getItem('token'));

  let bodyFormData = new FormData();
  bodyFormData.append('avatar', avatar);

  return function (dispatch) {
    axios({
      method: 'patch',
      url: `${API_URL}/myprofile/avatar`,
      headers: {
        'authorization': token,
        'Content-Type': 'form-data'
      },
      data: bodyFormData
    })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          dispatch({
            type: "SETTINGS_MESSAGE_AVATAR_SUCCESS",
            payload: response.data.message
          });
          Cookies.set("userAvatar", API_URL + response.data.data.photoUrl);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: "SETTINGS_MESSAGE_AVATAR_FAILURE",
            payload: error.response.data.message
          });
        }
      });
  }
}

export function resetSettingsMessageAvatar() {
  return function (dispatch) {
    dispatch({ type: 'SETTINGS_MESSAGE_AVATAR_RESET' });
  }
}
