import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { Route, Link } from 'react-router-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { styles, pallette } from '../styles';

import FontText from './Text';
import NavTab from './NavTab';
import Join from './Join';
import Create from './Create';
import Discover from './Discover';
import Game from './Game';
import Game2 from './Game2';
import GameSetup from './Create/GameSetup';

const Home = ({ match, ...props }) => (
    <>
        <View style={[styles.navbar]}>
            <TouchableOpacity activeOpacity={0.5}>
                <Icon name="arrow-left" size={20} color={pallette.darkgray} />
            </TouchableOpacity>
            <View style={styles.logo}>
                <FontText style={styles.logoText}>Score</FontText>
                <FontText
                    style={[styles.logoText, { color: pallette.crimson }]}
                >
                    Cast
                </FontText>
            </View>
            <TouchableOpacity activeOpacity={0.5}>
                <Link
                    to={
                        props.firebase.auth.isEmpty ||
                        props.firebase.auth.isAnonymous
                            ? '/login'
                            : '/user'
                    }
                >
                    <Icon name="user" size={20} color={pallette.darkgray} />
                </Link>
            </TouchableOpacity>
        </View>
        <View style={[styles.content]}>
            <Route path={`${match.url}/create`} component={Create} />
            <Route exact path={`${match.url}`} component={Join} />
            <Route path={`${match.url}/discover`} component={Discover} />
            <Route path={`${match.url}/game/:gameId`} component={Game2} />
            <Route path={`${match.url}/gameSetup/:gameId`} component={GameSetup} />
        </View>
        <View style={[styles.nav]}>
            <NavTab to={`${match.url}/create`} iconName={'pencil'} />
            <NavTab exact to={`${match.url}`} iconName={'rocket'} />
            <NavTab to={`${match.url}/discover`} iconName={'history'} />
        </View>
    </>
);

const mapStateToProps = state => ({
    firebase: state.firebase,
});

export default connect(mapStateToProps)(Home);
