import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import {
    NativeRouter,
    Route,
    Redirect,
    Switch,
    BackButton,
} from 'react-router-native';

import { styles } from '../styles';

import Home from './Home';
import Create from './Create';
import Game from './Game';
import UserProfile from './UserProfile';
import Login from './Login';
import SignUpPage from './SignUp';
import NewFollow from './NewFollow';
import MyProfile from './MyProfile';
import FollowList from './FollowList';
import FollowerList from './FollowerList';

const Root = props => {
    return (
        <NativeRouter>
            <SafeAreaView
                style={[
                    styles.container,
                    { marginTop: StatusBar.currentHeight },
                ]}
            >
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route path="/home" component={Home} />
                    <Route path="/create" component={Create} />
                    <Route path="/game" component={Game} />
                    <Route path="/user/profile/:userId" component={UserProfile} />
                    <Route path="/me" component={MyProfile} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/follow/new" component={NewFollow} />
                    <Route path="/user/following/:userId" component={FollowList} />
                    <Route path="/user/followers/:userId" component={FollowerList} />
                </Switch>
                <BackButton />
            </SafeAreaView>
        </NativeRouter>
    );
};

export default Root;
