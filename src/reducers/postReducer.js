import {
    GET_ALL_POSTS
} from '../actions/types/index';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_ALL_POSTS:
            return { list: action.payload, ...state };
        default: return state;
    }
}