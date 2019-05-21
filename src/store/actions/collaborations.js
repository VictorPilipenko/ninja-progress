import { push } from 'connected-react-router'
import axios from 'axios'
import { API_URL } from '../../config'

export function addCollaborator(data, tokenCollaborator) {
  const {
    password,
  } = data;

  const token = JSON.parse(localStorage.getItem('token'));

  const postData = {
    'password': password
  };

  if (token) {
    const axiosConfig = {
      headers: {
        'collaborate-confirm': tokenCollaborator,
        'authorization': token
      }
    };

    return function (dispatch) {
      axios.post(`${API_URL}/funnel_col_add`, postData, axiosConfig)
        .then(response => {
          dispatch({
            type: 'ADD_COLLABORATOR',
            payload: response.data.data
          });
          dispatch({ type: 'ADD_COLLABORATOR_SUCCESS' });
          dispatch(push('/collaborators'));
        })
        .catch(function (error) {
          if (error.response) {
            dispatch('ADD_COLLABORATOR_FAILURE', error.response.data.err.message)
          }
        });
    }

  }
  else
    return
}
