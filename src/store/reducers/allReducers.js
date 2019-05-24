import authReducer from './authReducer';
import projectReducer from './projectReducer';
import collaborationsReducer from './collaborationsReducer';
import settingsReducer from './settingsReducer'

const allReducers = ({
    auth: authReducer,
    projects: projectReducer,
    collaborations: collaborationsReducer,
    settings: settingsReducer,
});

export default allReducers