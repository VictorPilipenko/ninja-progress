import authReducer from './authReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';

const allReducers = ({
    auth: authReducer,
    user: userReducer,
    projects: projectReducer
});

export default allReducers