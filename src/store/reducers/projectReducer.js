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
  // console.log(action.payload)
  switch (action.type) {
    ///////////////////////////////////////////////////////////////////////////
    case GET_ALL_PROJECTS:
      return { projectsList: action.payload, ...state };
    case GET_ALL_PROJECTS_SUCCESS:
      return { ...state, getAllProjectsError: '' };
    case GET_ALL_PROJECTS_FAILURE:
      return { ...state, getAllProjectsError: action.payload };
    ///////////////////////////////////////////////////////////////////////////
    case CREATE_PROJECT:
      return {
        ...state,
        projectsList: [...state.projectsList, {
          _id: action.payload._id,
          projectName: action.payload.name,
        }]
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
      return { [`funnelsList${action.payload[0]}`]: action.payload[1], ...state }; // 0-projectId 1-funnelData
    ///////////////////////////////////////////////////////////////////////////
    case 'DELETE_FUNNEL':
      const funnelsList = state[`funnelsList${action.payload[0]}`].filter(project => project._id !== action.payload[1]); // 0-projectId 1-funnelId
      return {
        ...state,
        [`funnelsList${action.payload[0]}`]: funnelsList,
      };
    ///////////////////////////////////////////////////////////////////////////
    case 'CREATE_FUNNEL':
      return {
        ...state,
        [`funnelsList${action.payload[0]}`]: [...state[`funnelsList${action.payload[0]}`], { //0-projectId 1-funnelData
          funnelName: action.payload[1].name,
          _id: action.payload[1]._id,
          funnelProject: action.payload[0]
        }]
      };
    case 'CREATE_FUNNEL_SUCCESS':
      return { ...state, createFunnelError: '' };
    case 'CREATE_FUNNEL_FAILURE':
      return { ...state, createFunnelError: action.payload };
    ///////////////////////////////////////////////////////////////////////////
    case 'CREATE_LINK':
      return { ...state, createLink: action.payload };
    case 'CREATE_LINK_SUCCESS':
      return { ...state, createLinkError: '' };
    case 'CREATE_LINK_FAILURE':
      return { ...state, createLinkError: action.payload };
    ///////////////////////////////////////////////////////////////////////////

    default: return state;
  }
}