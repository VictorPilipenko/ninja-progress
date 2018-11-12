import React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from '../components/RequireAuth';
import Header from '../components/common/Header';
import Info from '../components/Info';
import Welcome from '../components/Welcome';
import UserList from '../components/users/UserList.jsx';
import PostList from '../components/posts/PostList.jsx';
import CreatePost from '../components/posts/CreatePost.jsx';
import Signin from '../components/auth/Signin.jsx';
import Signout from '../components/auth/Signout.jsx';
import Signup from '../components/auth/Signup.jsx';

const AppRouter = () => (
    <div className='container'>
            <Header />
            <Route path="/" exact={true} component={Welcome} />
            <Route path="/signin" component={Signin} />
            <Route path="/signout" component={Signout} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/info" component={Info} />
            <PrivateRoute path="/users" component={UserList} />
            <PrivateRoute path="/posts" component={PostList} />
            <PrivateRoute path="/create-post" component={CreatePost} />
    </div>
);

export default AppRouter;