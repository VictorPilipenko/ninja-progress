import axios from 'axios';
import { API_URL } from '../config';
import {
    GET_ALL_POSTS,
    CREATE_POST
} from './types/index';

/*
 * get all posts
 */
export function getAllPosts() {
    const token = JSON.parse(localStorage.getItem('token'));

    return function (dispatch) {
        axios.get(`${API_URL}/posts`, { headers: { 'Accept': 'application/json', 'Authorization': token.token_type + ' ' + token.access_token } })
            .then(response => {
                dispatch({
                    type: GET_ALL_POSTS,
                    payload: response.data
                });
            });
    }
}

//users/{id}/posts


// не то
export function getAllPostsByUserId() {
    const token = JSON.parse(localStorage.getItem('token'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));


    return function (dispatch) {
        axios.get(`${API_URL}/users/${currentUser.id}/posts`, {
            headers: { 'Accept': 'application/json', 'Authorization': token.token_type + ' ' + token.access_token }
        })
            .then(response => {
                dispatch({
                    type: GET_ALL_POSTS,
                    payload: response.data
                });
            });
    }
}

export function createPost(props) {
    const token = JSON.parse(localStorage.getItem('token'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const { title, body } = props;
    console.log(props);

    return function (dispatch) {
        axios.post(`${API_URL}/posts`, {
            headers: { 'Accept': 'application/json', 'Authorization': token.token_type + ' ' + token.access_token },
            'title': title,
            'body': body,
            'user_id': currentUser.id
        })
            .then(response => {
                dispatch({
                    type: CREATE_POST,
                    payload: response.data
                });
            });
    }
}