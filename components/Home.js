import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';

import { NativeRouter, Route, Link } from 'react-router-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { styles, pallette } from '../styles';

import FontText from './Text';
import NavLink from './NavLink';
import Join from './Join';
import Create from './Create';
import Discover from './Discover';
import UserProfile from './UserProfile';
import Login from './Login';
import SignUpPage from './SignUp';

const Home = props => {
    //console.log(props.firebase.auth);
    return (
        <NativeRouter
            initialIndex={1}
            initialEntries={['/create', '/join', '/discover']}
        >
            <SafeAreaView style={styles.container}>
                <View style={[styles.navbar]}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Icon
                            name="arrow-left"
                            size={20}
                            color={pallette.darkgray}
                        />
                    </TouchableOpacity>
                    <View style={styles.logo}>
                        <FontText style={styles.logoText}>Score</FontText>
                        <FontText
                            style={[
                                styles.logoText,
                                { color: pallette.crimson },
                            ]}
                        >
                            Cast
                        </FontText>
                    </View>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Link to={ props.firebase.auth.isEmpty || props.firebase.auth.isAnonymous ? "/login" : "/user" }>
                            <Icon name="user" size={20} color={pallette.darkgray} />
                        </Link>
                    </TouchableOpacity>
                </View>
                <View style={[styles.content]}>
                    <Route path="/create" render={() => <Create/>} />
                    <Route path="/join" component={Join} />
                    <Route path="/discover" component={Discover} />
                    <Route path="/user" component={UserProfile} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUpPage} />
                </View>
                <View style={[styles.nav]}>
                    <NavLink
                        to="/create"
                        component={TouchableOpacity}
                        style={styles.navItem}
                        activeStyle={styles.navItemActive}
                        activeOpacity={0.5}
                        iconName={'pencil'}
                    />
                    <NavLink
                        to="/join"
                        component={TouchableOpacity}
                        style={styles.navItem}
                        activeStyle={styles.navItemActive}
                        activeOpacity={0.5}
                        iconName={'rocket'}
                    />
                    <NavLink
                        to="/discover"
                        component={TouchableOpacity}
                        style={styles.navItem}
                        activeStyle={styles.navItemActive}
                        activeOpacity={0.5}
                        iconName={'history'}
                    />
                </View>
            </SafeAreaView>
        </NativeRouter>
    );
};

const mapStateToProps = state => ({
    firebase: state.firebase,
});

export default connect(mapStateToProps)(Home);
