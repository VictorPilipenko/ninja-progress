import React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from '../components/RequireAuth';
import Dashboard from '../components/dashboard/Dashboard.jsx';
// import Welcome from '../components/Welcome';
import UserList from '../components/users/UserList.jsx';
import ProjectList from '../components/projects/ProjectList.jsx';
import CreateProject from '../components/projects/CreateProject.jsx';
import Signin from '../components/auth/Signin.jsx';
import Signout from '../components/auth/Signout.jsx';
import Signup from '../components/auth/Signup.jsx';
import Questionnaire from '../components/auth/Questionnaire.jsx';

const AppRouter = () => (
  <>
    {/* <Route path="/" exact={true} component={Welcome} /> */}
    <Route path="/sign-in" component={Signin} />
    <Route path="/sign-up" component={Signup} />
    <Route path="/questionnaire" component={Questionnaire} />

    <PrivateRoute exact={true} path="/" component={Dashboard} />
    <PrivateRoute path="/sign-out" component={Signout} />
    <PrivateRoute path="/users" component={UserList} />
    <PrivateRoute path="/projects" component={ProjectList} />
    <PrivateRoute path="/create-project" component={CreateProject} />
  </>
);

export default AppRouter;