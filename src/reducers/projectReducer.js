import {
  GET_ALL_PROJECTS,
  CREATE_PROJECT
} from '../actions/types/index';


const initialState = {
  projectsList: [
    {
      id: '123',
      projectName: 'asdasd'
    },
    {
      id: '1234',
      projectName: 'asdasd'
    },
  ]
}

export default function (state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case GET_ALL_PROJECTS:
      return { projectsList: action.payload, ...state };
    case CREATE_PROJECT:
      return {
        ...state,
        projectsList: [...state.projectsList, {
          id: action.payload._id,
          projectName: action.payload.name,
        }]
      };
    case 'DELETE_PROJECT':
      return state.projectsList.filter(project => project.id !== action.payload.id);
    case 'CREATE_PROJECT_FAILURE':
      return { ...state, errorProject: action.payload };
    default: return state;
  }
}