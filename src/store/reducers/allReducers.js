import authReducer from './authReducer';
import projectReducer from './projectReducer';
import collaborationsReducer from './collaborationsReducer';

const allReducers = ({
    auth: authReducer,
    projects: projectReducer,
    collaborations: collaborationsReducer,
});

export default allReducers