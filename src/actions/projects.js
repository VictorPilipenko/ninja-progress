import { API } from './instance'
import {
  GET_ALL_PROJECTS,
  CREATE_PROJECT
} from './types/index';
import { push } from 'connected-react-router'

/*
 * get all posts
//  */
// export function getAllPosts() {
//   return function (dispatch) {
//     API.get(`posts`)
//       .then(response => {
//         dispatch({
//           type: GET_ALL_POSTS,
//           payload: response.data
//         });
//       });
//   }
// }

export function getAllProjectByUserId() {
  return function (dispatch) {
    API.get(`projects`)
      .then(response => {
        dispatch({
          type: GET_ALL_PROJECTS,
          payload: response.data.data
        });
      });
  }
}

export function deleteProjectByUserId(id) {
  return function (dispatch) {
    API.delete(`project/${id}`)
      .then(response => {
        // dispatch({
        //   type: GET_ALL_PROJECTS,
        //   payload: response.data.data
        // });
        //  dispatch(push('/projects'));
      });
  }
}

export function createProject(projectName) {
  return function (dispatch) {
    API.post(`project`, {
      'projectName': projectName,
    })
      .then(response => {

        if (response.data) {
          console.log(response.data)
          dispatch({
            type: CREATE_PROJECT,
            payload: response.data
          });
          dispatch(push('/projects'));
        }

      })
      .catch(function (error) {
        if (error.response) {
          dispatch({
            type: 'CREATE_PROJECT_FAILURE',
            payload: error.response.error
          });
        }
      });
  }
}

