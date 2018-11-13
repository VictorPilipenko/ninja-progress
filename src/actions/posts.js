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
        axios.get(`${API_URL}/posts`, { headers: { 'Accept': 'application/json', 'Authorization': token ? `${token.token_type} ${token.access_token}` : null } })
            .then(response => {
                dispatch({
                    type: GET_ALL_POSTS,
                    payload: response.data
                });
            });
    }
}

//users/{id}/posts


// не знаю что дожно здесь быть
export function getAllPostsByCurrentUserId() {
    const token = JSON.parse(localStorage.getItem('token'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return function (dispatch) {
        axios.get(`${API_URL}/users/${currentUser.id}/posts`, {
            headers: { 'Accept': 'application/json', 'Authorization': token ? `${token.token_type} ${token.access_token}` : null }
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

    return function (dispatch) {
        debugger;
        axios.post(`${API_URL}/posts`, {
   
            'title': title,
            'body': body,
            'user_id': currentUser.id
        },
        {
            headers: {  
                'Accept': 'application/json', 
                'Authorization': token ? `${token.token_type} ${token.access_token}` : null 
            },
        })
            .then(response => {
                dispatch({
                    type: CREATE_POST,
                    payload: response.data // проверить
                });
            });
    }

    // return function (dispatch) {
    //     axios.post(`
    //     ${API_URL}/posts`, 
    //     { 
    //         headers: { 
    //             'Accept': 'application/json', 
    //             'Authorization': token ? `${token.token_type} ${token.access_token}` : null 
    //         } 
    //     })
    //         .then(response => {
    //             dispatch({
    //                 type: GET_ALL_POSTS,
    //                 payload: response.data
    //             });
    //         });
    // }
}