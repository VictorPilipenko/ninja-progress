import React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from '../components/RequireAuth';
import { PrivateRouteAddCollaborator } from '../components/PrivateRouteAddCollaborator';
import ProjectList from '../components/projects/ProjectList.jsx';
import FunnelList from '../components/funnels/FunnelList.jsx';
import TemplatesList from '../components/templates/FunnelList.jsx';
import Signin from '../components/auth/Signin.jsx';
import Signup from '../components/auth/Signup.jsx';
import Questionnaire from '../components/auth/Questionnaire.jsx';
import PasswordForgot1 from '../components/auth/PasswordForgot1.jsx';
import PasswordForgot2 from '../components/auth/PasswordForgot2.jsx';
import PasswordForgot3 from '../components/auth/PasswordForgot3.jsx';
import AddCollaborators from '../components/projects/AddCollaborators.jsx';
import AddCollaboratorsImage from '../components/projects/AddCollaboratorsImage.jsx';
import Collaborations from '../components/collaborations/Collaborations.jsx';
import SettingsAccountDetails from '../components/settings/SettingsAccountDetails/SettingsAccountDetails.jsx';
import SettingsPaymentMethods from '../components/settings/SettingsPaymentMethods/SettingsPaymentMethods.jsx';
import SettingsUsers from '../components/settings/SettingsUsers/SettingsUsers.jsx';
import Diagram from '../components/diagram/storm';

const AppRouter = () => (
  <>
    <Route path="/sign-in" component={Signin} />
    <Route path="/sign-up" component={Signup} />

    <Route path="/password-forgot-step-1" component={PasswordForgot1} />
    <Route path="/password-forgot-step-2" component={PasswordForgot2} />
    <Route path="/password-forgot-step-3" component={PasswordForgot3} />

    <PrivateRoute path="/questionnaire" component={Questionnaire} />

    <PrivateRouteAddCollaborator path="/add-collaborators/:token" component={AddCollaborators} />
    <Route path="/add-collaborators-image" component={AddCollaboratorsImage} />

    <PrivateRoute exact={true} path="/" component={ProjectList} />
    <PrivateRoute path="/collaborations" component={Collaborations} />
    <PrivateRoute path='/funnels/:projectId' component={FunnelList} />
    <PrivateRoute path='/diagram/:funnelId' component={Diagram} />
    <PrivateRoute path='/templates' component={TemplatesList} />

    <PrivateRoute exact={true} path="/settings" component={SettingsAccountDetails} />
    <PrivateRoute path="/settings/payment-methods" component={SettingsPaymentMethods} />
    <PrivateRoute path="/settings/users" component={SettingsUsers} />
  </>
);

export default AppRouter;

