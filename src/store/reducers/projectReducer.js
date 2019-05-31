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
} from '../actions/types/index';


const initialState = {
  // projectsList: [
  //   {
  //     id: '123',
  //     projectName: 'asdasd',
  //     funnels: 3

  //   },
  //   {
  //     id: '1234',
  //     projectName: 'asdasd',
  //     funnels: 2
  //   },
  // ]
}

export default function (state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    ///////////////////////////////////////////////////////////////////////////
    case 'RESET_ALL_PROJECTS':
      return { ...state, projectsList: [] };
    case GET_ALL_PROJECTS:
      return { ...state, projectsList: action.payload };
    case GET_ALL_PROJECTS_SUCCESS:
      return { ...state, getAllProjectsError: '' };
    case GET_ALL_PROJECTS_FAILURE:
      return { ...state, getAllProjectsError: action.payload };
    ///////////////////////////////////////////////////////////////////////////
    case CREATE_PROJECT:
      return {
        ...state,
        projectsList: [...state.projectsList,
        action.payload
        ]
      };
    case CREATE_PROJECT_SUCCESS:
      return { ...state, createProjectError: '' };
    case CREATE_PROJECT_FAILURE:
      return { ...state, createProjectError: action.payload };
    ///////////////////////////////////////////////////////////////////////////
    case DELETE_PROJECT:
      const list = state.projectsList.filter(project => project._id !== action.payload);
      return {
        ...state,
        projectsList: list,
      };
    case DELETE_PROJECT_SUCCESS:
      return { ...state, deleteProjectError: '' };
    case DELETE_PROJECT_FAILURE:
      return { ...state, deleteProjectError: action.payload };
    ///////////////////////////////////////////////////////////////////////////
    case 'GET_ALL_FUNNELS':
      return { [`funnelsList${action.payload.projectId}`]: action.payload.res, ...state };
    ///////////////////////////////////////////////////////////////////////////
    case 'DELETE_FUNNEL':
      const funnelsList = state[`funnelsList${action.payload.project_id}`].filter(funnel => funnel._id !== action.payload.funnel_id);
      return {
        ...state,
        [`funnelsList${action.payload.project_id}`]: funnelsList,
      };
    ///////////////////////////////////////////////////////////////////////////
    case 'CREATE_FUNNEL':
      return {
        ...state,
        [`funnelsList${action.payload.projectId}`]: [...state[`funnelsList${action.payload.projectId}`],
        action.payload.res
        ]
      };
    case 'CREATE_FUNNEL_SUCCESS':
      return { ...state, createFunnelError: '' };
    case 'CREATE_FUNNEL_FAILURE':
      return { ...state, createFunnelError: action.payload };
    ///////////////////////////////////////////////////////////////////////////
    case 'CREATE_LINK':
      return { ...state, createLink: action.payload };
    case 'CREATE_LINK_RESET':
      return { ...state, createLink: '' };
    case 'CREATE_LINK_SUCCESS':
      return { ...state, createLinkError: '' };
    case 'CREATE_LINK_FAILURE':
      return { ...state, createLinkError: action.payload, createLink: '' };
    ///////////////////////////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////////////////////////
    // case 'SAVE_DIAGRAM':
    //   return { ...state, [`diagram${action.payload.funnelId}`]: action.payload.diagramObj };
    case 'SAVE_DIAGRAM_SUCCESS':
      return { ...state, saveDiagramMessage: action.payload };
    case 'SAVE_DIAGRAM_FAILURE':
      return { ...state, saveDiagramMessage: action.payload };
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    case 'RESET_GET_DIAGRAM':
      return { ...state, [`diagram${action.payload.funnelId}`]: {} }
    case 'GET_DIAGRAM':
      return { ...state, [`diagram${action.payload.funnelId}`]: action.payload.res };
    case 'GET_DIAGRAM_SUCCESS':
      return { ...state, getDiagramError: '' };
    case 'GET_DIAGRAM_FAILURE':
      return { ...state, getDiagramError: action.payload };
    ///////////////////////////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////////////////////////
    case 'COLLABORATORS_MODAL_MESSAGE_SUCCESS':
      return { ...state, collaboratorsModalMessage: action.payload }
    case 'COLLABORATORS_MODAL_MESSAGE_FAILURE':
      return { ...state, collaboratorsModalMessage: action.payload }
    case 'COLLABORATORS_MODAL_MESSAGE_RESET':
      return { ...state, collaboratorsModalMessage: '' }
    ///////////////////////////////////////////////////////////////////////////




    default: return state;
  }
}