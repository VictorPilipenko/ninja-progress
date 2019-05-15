import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';

const allReducers = ({
    auth: authReducer,
    user: userReducer,
    post: postReducer
});

export default allReducers