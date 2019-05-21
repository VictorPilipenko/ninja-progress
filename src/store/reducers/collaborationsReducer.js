import {

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
    // case 'GET_ALL_FUNNELS':
    //   return { [`funnelsList${action.payload[0]}`]: action.payload[1], ...state }; // 0-projectId 1-funnelData
    // ///////////////////////////////////////////////////////////////////////////
    // case 'DELETE_FUNNEL':
    //   const funnelsList = state[`funnelsList${action.payload[0]}`].filter(project => project._id !== action.payload[1]); // 0-projectId 1-funnelId
    //   return {
    //     ...state,
    //     [`funnelsList${action.payload[0]}`]: funnelsList,
    //   };
    // ///////////////////////////////////////////////////////////////////////////
    // case 'CREATE_FUNNEL':
    //   return {
    //     ...state,
    //     [`funnelsList${action.payload[0]}`]: [...state[`funnelsList${action.payload[0]}`], { //0-projectId 1-funnelData
    //       funnelName: action.payload[1].name,
    //       _id: action.payload[1]._id,
    //       funnelProject: action.payload[0]
    //     }]
    //   };
    // case 'CREATE_FUNNEL_SUCCESS':
    //   return { ...state, createFunnelError: '' };
    // case 'CREATE_FUNNEL_FAILURE':
    //   return { ...state, createFunnelError: action.payload };
    ///////////////////////////////////////////////////////////////////////////
    case 'ADD_COLLABORATOR':
      return { ...state, addCollaborator: action.payload };
    case 'ADD_COLLABORATOR_SUCCESS':
      return { ...state, addCollaboratorError: '' };
    case 'ADD_COLLABORATOR_FAILURE':
      return { ...state, addCollaboratorError: action.payload };
    ///////////////////////////////////////////////////////////////////////////

    default: return state;
  }
}