import React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from '../components/RequireAuth';
// import { PrivateRouteReset } from '../components/RequireAuthReset';
import Dashboard from '../components/dashboard/Dashboard.jsx';
// import Welcome from '../components/Welcome';
import UserList from '../components/users/UserList.jsx';
import ProjectList from '../components/projects/ProjectList.jsx';
import CreateProject from '../components/projects/CreateProject.jsx';
import Signin from '../components/auth/Signin.jsx';
import Signout from '../components/auth/Signout.jsx';
import Signup from '../components/auth/Signup.jsx';
import Questionnaire from '../components/auth/Questionnaire.jsx';
import PasswordForgot1 from '../components/auth/PasswordForgot1.jsx';
import PasswordForgot2 from '../components/auth/PasswordForgot2.jsx';
import PasswordForgot3 from '../components/auth/PasswordForgot3.jsx';

const AppRouter = () => (
  <>
    {/* <Route path="/" exact={true} component={Welcome} /> */}
    <Route path="/sign-in" component={Signin} />
    <Route path="/sign-up" component={Signup} />

    <Route path="/password-forgot-step-1" component={PasswordForgot1} />
    <Route path="/password-forgot-step-2" component={PasswordForgot2} />
    <Route path="/password-forgot-step-3" component={PasswordForgot3} />

    <PrivateRoute path="/questionnaire" component={Questionnaire} />
    <PrivateRoute exact={true} path="/" component={Dashboard} />
    <PrivateRoute path="/sign-out" component={Signout} />
    <PrivateRoute path="/users" component={UserList} />
    <PrivateRoute path="/projects" component={ProjectList} />
    <PrivateRoute path="/create-project" component={CreateProject} />
  </>
);

export default AppRouter;