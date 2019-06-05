import { API } from './instance'
import {

  GET_ALL_PROJECTS,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_FAILURE,

  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,

  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,

} from './types/index';
import { push } from 'connected-react-router'


export function getAllProjects() {
  return function (dispatch) {
    API.get(`projects`)
      .then(response => {
        dispatch({ type: 'RESET_ALL_PROJECTS' });
        console.log('getAllProjects: ', response.data)
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
          dispatch({
            type: CREATE_PROJECT,
            payload: response.data.data
          });
          dispatch({ type: CREATE_PROJECT_SUCCESS });
          dispatch(push('/'));
        }

      })
      .catch(function (error) {
        if (error.response) {
          // console.log(error.response)
          dispatch({
            type: CREATE_PROJECT_FAILURE,
            payload: error.response.data.error
          });
        }
      });
  }
}

export function createFunnel(projectName, projectId) {
  return function (dispatch) {
    API.post(`funnel/${projectId}`, {
      'funnelName': projectName,
    })
      .then(response => {
        if (response.data) {
          console.log(response.data)
          let res = response.data.data
          dispatch({
            type: 'CREATE_FUNNEL',
            payload: {
              projectId,
              res,
            }
          });
          dispatch({ type: 'CREATE_FUNNEL_SUCCESS' });
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

export function getAllFunnels(projectId) {
  return function (dispatch) {
    API.get(`funnels/${projectId}`)
      .then(response => {
        let res = response.data.data;
        // console.log(response.data.data)
        dispatch({
          type: 'GET_ALL_FUNNELS',
          payload: {
            projectId,
            res,
          }
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
          payload: {
            project_id,
            funnel_id
          }
        });
        dispatch({ type: 'DELETE_FUNNEL_SUCCESS' });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          alert(error.response.data.message)
          dispatch({
            type: 'DELETE_FUNNEL_FAILURE',
            payload: error.response.data.message
          });
        }
      });
  }
}

export function createLink(funnelsId, permissions) {
  return function (dispatch) {
    API.post(`url`, {
      'funnelsId': funnelsId,
      'permissions': permissions,
    })
      .then(response => {
        dispatch({
          type: 'CREATE_LINK',
          payload: response.data.data
        });
        dispatch({ type: 'CREATE_LINK_SUCCESS' });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'CREATE_LINK_FAILURE',
            payload: error.response.data.error
          });
        }
      });
  }
}

export function resetLink() {
  return function (dispatch) {
    dispatch({ type: 'CREATE_LINK_RESET' });
  }
}



export function saveDiagram(funnelId, diagramObj) {
  // console.log('saveDiagram funnelId: ',funnelId)
  // console.log('saveDiagram diagramObj: ',diagramObj)


  return function (dispatch) {
    API.patch(`funnel/${funnelId}`, {
      'funnelBody': diagramObj
    })

      // API.patch(`funnel/${funnelId}`, diagramObj)
      .then(response => {
        console.log(response.data)
        // let diagramObj = response.data.data.funnelBody
        // dispatch({
        //   type: 'SAVE_DIAGRAM',
        //   payload: { funnelId, diagramObj }
        // });

        dispatch({
          type: 'SAVE_DIAGRAM_SUCCESS',
          payload: response.data.message
        });

        // setTimeout(() => {
        //   dispatch({ type: 'SAVE_DIAGRAM_SUCCESS_RESET' });
        // }, 2000)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'CREATE_DIAGRAM_FAILURE',
            payload: error.response.data.error
          });
        }
      });
  }
}

export function getDiagram(funnelId) {
  // console.log('getDiagram funnelId: ', funnelId)
  return function (dispatch) {
    API.get(`funnel/diagram/${funnelId}`)
      .then(response => {
        // console.log('getDiagram response:', typeof response.data.data.funnelBody)

        dispatch({
          type: 'RESET_GET_DIAGRAM',
          payload: funnelId
        });

        let res = response.data.data.funnelBody;
        dispatch({
          type: 'GET_DIAGRAM',
          payload: {
            funnelId,
            res,
          }
        });
        dispatch({ type: 'GET_DIAGRAM_SUCCESS' });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'GET_DIAGRAM_FAILURE',
            payload: error.response.data.error
          });
        }
      });
  }
}

export function changePermission(funnelId, profileId, permissions) {
  console.log('changePermission action: ', funnelId, profileId, permissions)
  return function (dispatch) {
    API.patch(`/collaborators/${profileId}/${funnelId}`, {
      'permissions': permissions
    })
      .then(response => {
        console.log('changePermission response: ', response.data.message)
        dispatch({
          type: 'COLLABORATORS_MODAL_MESSAGE_SUCCESS',
          payload: response.data.message
        });

      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'COLLABORATORS_MODAL_MESSAGE_FAILURE',
            payload: error.response.data.error
          });
        }
      });
  }
}

export function resetCollaboratorsModalMessage() {
  return function (dispatch) {
    dispatch({ type: 'COLLABORATORS_MODAL_MESSAGE_RESET' });
  }
}


export function removeCollaborator(funnelId, profileId) {
  return function (dispatch) {
    API.delete(`/collaborators/${profileId}/${funnelId}`, {
      // 'funnelId': funnelId,
      // 'profileId': profileId,
    })
      .then(response => {
        console.log('removeCollaborator response: ', response.data)
        dispatch({
          type: 'COLLABORATORS_MODAL_MESSAGE_SUCCESS',
          payload: response.data.message
        });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'COLLABORATORS_MODAL_MESSAGE_FAILURE',
            payload: error.response.data.error
          });
        }
      });
  }
}
