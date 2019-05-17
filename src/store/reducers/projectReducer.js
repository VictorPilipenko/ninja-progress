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
      return {
        ...state,
        projectsList: state.projectsList.filter(project => project._id !== action.payload),
      };
    case DELETE_PROJECT_SUCCESS:
      return { ...state, deleteProjectError: '' };
    case DELETE_PROJECT_FAILURE:
      return { ...state, deleteProjectError: action.payload };
    ///////////////////////////////////////////////////////////////////////////

    default: return state;
  }
}