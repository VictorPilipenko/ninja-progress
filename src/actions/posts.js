import { API } from './instance'
import {
    GET_ALL_POSTS,
    CREATE_POST
} from './types/index';

/*
 * get all posts
 */
export function getAllPosts() {
    return function (dispatch) {
        API.get(`posts`)
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
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return function (dispatch) {
        API.get(`/users/${currentUser.id}/posts`)
            .then(response => {
                dispatch({
                    type: GET_ALL_POSTS,
                    payload: response.data
                });
            });
    }
}

export function createPost(props) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const { title, body } = props;

    return function (dispatch) {
        API.post(`posts`, {
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