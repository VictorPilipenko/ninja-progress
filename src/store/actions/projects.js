import { API } from './instance'
import {
  GET_ALL_PROJECTS,
  CREATE_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT_FAILURE,
  DELETE_PROJECT_FAILURE,
  GET_ALL_PROJECTS_FAILURE,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  GET_ALL_PROJECTS_SUCCESS,
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

export function getAllProjects() {
  return function (dispatch) {
    API.get(`projects`)
      .then(response => {
        dispatch({
          type: GET_ALL_PROJECTS,
          payload: response.data.data
        });
        dispatch({ type: GET_ALL_PROJECTS_SUCCESS });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: GET_ALL_PROJECTS_FAILURE,
            payload: error.response.data.error
          });
        }
      });
  }
}

export function deleteProjectByUserId(id) {
  return function (dispatch) {
    API.delete(`project/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_PROJECT,
          payload: id
        });
        dispatch({ type: DELETE_PROJECT_SUCCESS });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: DELETE_PROJECT_FAILURE,
            payload: error.response.data.error
          });
        }
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
          // console.log(response.data)
          dispatch({
            type: CREATE_PROJECT,
            payload: response.data
          });
          dispatch({ type: CREATE_PROJECT_SUCCESS });
          dispatch(push('/projects'));
        }

      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: CREATE_PROJECT_FAILURE,
            payload: error.response.data.error
          });
        }
      });
  }
}

export function createFunnel(projectName, id) {
  return function (dispatch) {
    API.post(`funnel_create/${id}`, {
      'funnelName': projectName,
    })
      .then(response => {
        if (response.data) {
          // console.log(response.data)
          dispatch({
            type: 'CREATE_FUNNEL',
            payload: [id, response.data.data]
          });
          dispatch({ type: 'CREATE_FUNNEL_SUCCESS' });
          // dispatch(push('/projects'));
        }

      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'CREATE_FUNNEL_FAILURE',
            payload: error.response.data.error
          });
        }
      });
  }
}

export function getAllFunnels(id) {
  return function (dispatch) {
    API.get(`funnels/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_ALL_FUNNELS',
          payload: [response.data.data, id]
        });
        dispatch({ type: 'GET_ALL_FUNNELS_SUCCESS' });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'GET_ALL_FUNNELS_FAILURE',
            payload: error.response.data.error
          });
        }
      });
  }
}


export function deleteFunnel(project_id, funnel_id) {
  return function (dispatch) {
    API.delete(`funnel/${project_id}/${funnel_id}`)
      .then(() => {
        dispatch({
          type: 'DELETE_FUNNEL',
          payload: [project_id, funnel_id]
        });
        dispatch({ type: 'DELETE_FUNNEL_SUCCESS' });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'DELETE_FUNNEL_FAILURE',
            payload: error.response.data.error
          });
        }
      });
  }
}



