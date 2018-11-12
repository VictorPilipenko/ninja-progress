import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';

const allReducers = ({
    form,
    auth: authReducer,
    user: userReducer,
    post: postReducer
});

export default allReducers