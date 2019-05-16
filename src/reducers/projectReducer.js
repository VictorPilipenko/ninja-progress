import {
  GET_ALL_PROJECTS,
  CREATE_PROJECT
} from '../actions/types/index';


const initialState = {
  // projectsList: [
  //   {
  //     //blet
  //   },
  // ]
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
    case 'CREATE_PROJECT_FAILURE':
      return { ...state, errorProject: action.payload };
    default: return state;
  }
}