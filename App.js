import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

import { NativeRouter, Route, Link } from 'react-router-native';
import NavLink from './components/NavLink';

import firebase from 'firebase';
import 'firebase/firestore';
var config = {
    apiKey: 'AIzaSyBd8u4BvdZylqyztlgTToIi6D1a79k3emA',
    authDomain: 'scorecast-5f168.firebaseapp.com',
    databaseURL: 'https://scorecast-5f168.firebaseio.com',
    projectId: 'scorecast-5f168',
    storageBucket: 'scorecast-5f168.appspot.com',
    messagingSenderId: '138861825009',
};
firebase.initializeApp(config);

import { Font, AppLoading } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

import { styles, pallette } from './styles';
import FontText from './components/Text';

import Join from './components/Join';
import Create from './components/Create';
const History = () => <Text style={styles.header}>History</Text>;

export default class App extends Component {
    state = {
        isReady: false,
        routerHistory: {},
        templates: [],
    };

    async componentDidMount() {
        await Font.loadAsync({
            'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        });

        this.setState({ isReady: true });

        await firebase
            .firestore()
            .collection('templates')
            .get()
            .then(templates => {
                templates.forEach(template => {
                    this.setState({
                        templates: [...this.state.templates, template],
                    });
                });
            })
            .catch(function(error) {
                console.log('Error getting document:', error);
            });
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }

        return (
            <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                <NativeRouter
                    initialIndex={0}
                    initialEntries={['/create', '/join', '/history']}
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
                                <Icon
                                    name="user"
                                    size={20}
                                    color={pallette.darkgray}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.content]}>
                            <Route
                                path="/create"
                                render={() => (
                                    <Create rows={this.state.templates} />
                                )}
                            />
                            <Route path="/join" component={Join} />
                            <Route path="/history" component={History} />
                        </View>
                        <View style={[styles.nav]}>
                            <NavLink
                                to="/create"
                                component={TouchableOpacity}
                                style={styles.navItem}
                                activeStyle={styles.navItemActive}
                                activeOpacity={0.5}
                                iconName={"pencil"}
                            />
                            <NavLink
                                to="/join"
                                component={TouchableOpacity}
                                style={styles.navItem}
                                activeStyle={styles.navItemActive}
                                activeOpacity={0.5}
                                iconName={"rocket"}
                            />
                            <NavLink
                                to="/history"
                                component={TouchableOpacity}
                                style={styles.navItem}
                                activeStyle={styles.navItemActive}
                                activeOpacity={0.5}
                                iconName={"history"}
                            />
                        </View>
                    </SafeAreaView>
                </NativeRouter>
            </View>
        );
    }
}
