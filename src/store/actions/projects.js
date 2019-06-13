import { API } from './instance'
import axios from 'axios'
import { API_URL } from '../../config'
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
        // console.log('getAllProjects: ', response.data)
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

export function getAllTemplates() {
  return function (dispatch) {
    API.get(`templates`)
      .then(response => {
        // dispatch({ type: 'RESET_ALL_TEMPLATES' });
        // console.log('get all templates: ', response.data)
        dispatch({
          type: 'GET_ALL_TEMPLATES',
          payload: response.data.data
        });
        dispatch({ type: 'GET_ALL_TEMPLATES_SUCCESS' });
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
        // console.log(projectId)
        dispatch({
          type: 'RESET_ALL_FUNNELS',
          payload: {
            projectId
          }
        });
        // console.log(res)
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

export function deleteTemplate(template_id) {
  return function (dispatch) {
    API.delete(`template/${template_id}`)
      .then(() => {
        dispatch({
          type: 'DELETE_TEMPLATE',
          payload: template_id,
        });
        dispatch({ type: 'DELETE_TEMPLATE_SUCCESS' });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          alert(error.response.data.message)
          dispatch({
            type: 'DELETE_TEMPLATE_FAILURE',
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


export function saveDiagram(funnelId, diagramObj, image) {
  // console.log(diagramObj)
  const token = JSON.parse(localStorage.getItem('token'));

  let bodyFormData = new FormData();
  bodyFormData.append('funnelBackground', image);
  bodyFormData.append('funnelBody', JSON.stringify(diagramObj));


  return function (dispatch) {
    axios({
      method: 'patch',
      url: `${API_URL}/funnel/${funnelId}`,
      headers: {
        'authorization': token,
        'Content-Type': 'form-data'
      },
      data: bodyFormData
    })
      .then(response => {
        // console.log(response)

        // /************************************/
        // dispatch({
        //   type: 'RESET_GET_DIAGRAM',
        //   payload: funnelId
        // });

        // let res1 = JSON.parse(response.data.data.funnelBody);

        // let res = {
        //   funnelBody: {
        //     converted: res1.funnelBody.converted,
        //     snackMsg: 'next'
        //   }
        // }

        // dispatch({
        //   type: 'GET_DIAGRAM',
        //   payload: {
        //     funnelId,
        //     res,
        //   }
        // });
        // /************************************/


        dispatch({
          type: 'SAVE_DIAGRAM_SUCCESS',
          payload: response.data.message
        });

        setTimeout(() => {
          dispatch({ type: 'SAVE_DIAGRAM_SUCCESS_RESET' });
        }, 1000)

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

export function saveTemplate(funnelId, diagramObj) {
  return function (dispatch) {
    API.patch(`template/update/${funnelId}`, {
      'funnelBody': diagramObj
    })
      .then(response => {
        // console.log(response.data)
        // /************************************/
        // dispatch({
        //   type: 'RESET_GET_DIAGRAM',
        //   payload: funnelId
        // });

        // let res1 = JSON.parse(response.data.data.templateBody);

        // let res = {
        //   funnelBody: {
        //     converted: res1.funnelBody.converted,
        //     snackMsg: 'next'
        //   }
        // }

        // dispatch({
        //   type: 'GET_DIAGRAM',
        //   payload: {
        //     funnelId,
        //     res,
        //   }
        // });
        // /************************************/
        dispatch({
          type: 'SAVE_DIAGRAM_SUCCESS',
          payload: response.data.message
        });

        setTimeout(() => {
          dispatch({ type: 'SAVE_DIAGRAM_SUCCESS_RESET' });
        }, 2000)

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

export function createTemplate(funnelId, templateName) {
  // console.log(funnelId, templateName)
  return function (dispatch) {
    API.post(`template/${funnelId}`, {
      'templateName': templateName
    })
      .then(response => {
        console.log(response.data)
        dispatch({
          type: 'CREATE_TEMPLATE_SUCCESS',
          payload: response.data.message
        });

        setTimeout(() => {
          dispatch({ type: 'CREATE_TEMPLATE_RESET' });
        }, 2000)
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'CREATE_TEMPLATE_FAILURE',
            payload: error.response.data.error
          });
        }
      });
  }
}

export function createNewProjectWithTemplate(templateId, projectName, funnelId) {
  // console.log(templateId, projectName)
  return function (dispatch) {
    API.post(`funnel/template/${templateId}`, {
      'projectName': projectName
    })
      .then(response => {
        console.log(response.data)
        dispatch({
          type: 'CREATE_NEW_PROJECT_WITH_TEMPLATE_SUCCESS',
          payload: response.data.message
        });

        setTimeout(() => {
          dispatch({ type: 'CREATE_NEW_PROJECT_WITH_TEMPLATE_RESET' });
        }, 2000)

        setTimeout(() => {
          dispatch(push(`/`));
        }, 1000)


      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'SAVE_TEMPLATE_FAILURE',
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
        // console.log('getDiagram response: ', JSON.parse(response.data.data.funnelBody))

        dispatch({
          type: 'RESET_GET_DIAGRAM',
          payload: funnelId
        });

        let res = JSON.parse(response.data.data.funnelBody);
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

export function getTemplate(funnelId) {
  // console.log('getDiagram funnelId: ', funnelId)
  return function (dispatch) {
    API.get(`template/${funnelId}`)
      .then(response => {
        // console.log('getTemplate response: ', response.data)

        dispatch({
          type: 'RESET_GET_DIAGRAM',
          payload: funnelId
        });

        let res = JSON.parse(response.data.data.templateBody);
        console.log(res)
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
  // console.log('changePermission action: ', funnelId, profileId, permissions)
  return function (dispatch) {
    API.patch(`/collaborators/${profileId}/${funnelId}`, {
      'permissions': permissions
    })
      .then(response => {
        // console.log('changePermission response: ', response.data.message)
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
        // console.log('removeCollaborator response: ', response.data)
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

export function sendImageToCollaborate(funnelId, image) {
  const token = JSON.parse(localStorage.getItem('token'));

  let bodyFormData = new FormData();
  bodyFormData.append('screenshot', image);
  bodyFormData.append('funnelsId', funnelId);
  bodyFormData.append('permissions', 'View Only');

  return function (dispatch) {
    axios({
      method: 'post',
      url: `${API_URL}/funnel/diagram/screenshot`,
      headers: {
        'authorization': token,
        'Content-Type': 'form-data'
      },
      data: bodyFormData
    })
      .then(response => {
        if (response.data) {
          // console.log('sendImageToCollaborate response: ', response)
          dispatch({
            type: 'SEND_IMAGE_TO_COLLABORATE_LINK',
            payload: response.data.link
          });
          // dispatch({
          //   type: 'SEND_IMAGE_TO_COLLABORATE_LINK_SUCCESS',
          //   payload: response.data.message
          // });
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          dispatch({
            type: 'SEND_IMAGE_TO_COLLABORATE_LINK_FAILURE',
            payload: error.response.data.error
          });
        }
      });
  }
}

export function resetSendImageToCollaborateLink() {
  return function (dispatch) {
    dispatch({ type: 'SEND_IMAGE_TO_COLLABORATE_LINK_RESET' });
  }
}

export function getSVG() {
  return function (dispatch) {

    // dispatch({ type: 'GET_ALL_SVG' });
    API.get(`funnel/svg`)
      .then(response => {
        // console.log('getSVG response: ', response.data)

        // dispatch({
        //   type: 'RESET_GET_SVG',
        //   payload: funnelId
        // });

        dispatch({
          type: 'GET_ALL_SVG',
          payload: response.data.response,
        });

        dispatch({ type: 'GET_ALL_SVG_SUCCESS' });
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