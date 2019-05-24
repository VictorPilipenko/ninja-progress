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
    API.patch(`profile/name`, {
      'firstName': name,
    })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          Cookies.set("userFirstName", response.data.data.firstName);
          dispatch({
            type: "CHANGE_USER_NAME_SUCCESS",
            payload: response.data.message
          });
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: "CHANGE_USER_NAME_FAILURE",
            payload: error.response.data.error
          });
        }
      });
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
    API.patch(`profile/password`, {
      'password': currentPassword,
      'newPassword': newPassword,
    })
      .then(response => {
        if (response.data) {
          dispatch({
            type: "CHANGE_USER_PASSWORD_SUCCESS",
            payload: response.data.message
          });
          // Cookies.set("userFirstName", response.data.firstName);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: "CHANGE_USER_PASSWORD_FAILURE",
            payload: error.response.data.message
          });
        }
      });
  }
}

export function changeUserAvatar(avatar) {
  const token = JSON.parse(localStorage.getItem('token'));

  let bodyFormData = new FormData();
  bodyFormData.append('avatar', avatar);

  return function (dispatch) {
    axios({
      method: 'patch',
      url: `${API_URL}/profile/avatar`,
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
            type: "CHANGE_USER_AVATAR_SUCCESS",
            payload: response.data.message
          });
          Cookies.set("userAvatar", API_URL + response.data.data.photoUrl);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: "CHANGE_USER_AVATAR_FAILURE",
            payload: error.response.data.message
          });
        }
      });
  }
}