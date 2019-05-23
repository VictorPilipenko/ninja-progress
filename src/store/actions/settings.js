// import { push } from 'connected-react-router'
import Cookies from "js-cookie";
import { API } from './instance'

export function saveUserName(userName) {
  return function (dispatch) {
    API.post(`change-name`, {
      'userName': userName,
    })
      .then(response => {
        if (response.data) {
          // console.log(response.data)
          // dispatch({
          //   type: CREATE_PROJECT,
          //   payload: response.data
          // });
          // dispatch({ type: CREATE_PROJECT_SUCCESS });
          // dispatch(push('/projects'));
          Cookies.set("userFirstName", response.data.firstName);
        }

      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: "SAVE_USER_NAME_FAILURE",
            payload: error.response.data.error
          });
        }
      });
  }
}