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
                    <Route path="/user" component={UserProfile} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUpPage} />
                    <Route path="/follow/new" component={NewFollow} />
                </Switch>
                <BackButton />
            </SafeAreaView>
        </NativeRouter>
    );
};

export default Root;
