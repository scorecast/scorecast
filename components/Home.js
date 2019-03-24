import React from 'react';
import { View } from 'react-native';
import { Route } from 'react-router-native';
import TopBar from './TopBar/Bar';
import Discover from './Discover';
import Game2 from './Game2';
import GameSetup from './Create/GameSetup';
import { styles } from '../styles';

const Home = ({ match, ...props }) => (
    <>
        <TopBar
            left={{ linkTo: '/user', iconName: 'user' }}
            right={{ linkTo: '/create', iconName: 'plus' }}
            logoLeft="Score"
            logoRight="Cast"
        />
        <View style={[styles.content]}>
            <Route exact path={`${match.url}`} component={Discover} />
            <Route path={`${match.url}/game/:gameId`} component={Game2} />

            {/* this is being left until I fix Game/Game2 to use new route */}
            <Route
                path={`${match.url}/gameSetup/:gameId`}
                component={GameSetup}
            />
        </View>
    </>
);

export default Home;
