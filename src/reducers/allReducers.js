import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';

const allReducers = ({
    form,
    auth: authReducer,
    user: userReducer,
});

export default allReducers