import {
    GET_ALL_POSTS,
    CREATE_POST
} from '../actions/types/index';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_ALL_POSTS:
            return { list: action.payload, ...state };
        case CREATE_POST:
              return { post: action.payload, ...state }; // проверить
        default: return state;
    }
}