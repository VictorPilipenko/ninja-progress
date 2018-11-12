import React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from '../components/RequireAuth';
import Header from '../components/common/Header';
import Info from '../components/Info';
import Welcome from '../components/Welcome';
import UserList from '../components/users/UserList';
import Signin from '../components/auth/Signin';
import Signout from '../components/auth/Signout';
import Signup from '../components/auth/Signup';

const AppRouter = () => (
    <div className='container'>
            <Header />
            <Route path="/" exact={true} component={Welcome} />
            <Route path="/signin" component={Signin} />
            <Route path="/signout" component={Signout} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/info" component={Info} />
            <PrivateRoute path="/users" component={UserList} />
    </div>
);

export default AppRouter;