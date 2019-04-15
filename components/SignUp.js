import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import { Link, Redirect } from 'react-router-native';
import {
    withFirebase,
    firestoreConnect,
    withFirestore,
} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Button from './Button';
import TopBar from './TopBar/Bar';
import TextField from './TextField';

import { styles, pallette } from '../styles';

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pallette.lightgray,
        padding: 20,
    },
});

class SignUpPage extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        c_password: '',
        bio: '',
        errorMessage: null,
        success: false,
    };

    handleSignUp = () => {
        const { email, username, password, c_password, bio } = this.state;
        const { auth, firestore, firebase, users } = this.props;
        if (c_password !== password) {
            this.setState({ c_password: '', errorMessage: 'The passwords were not the same, please use the same password.' });
        } else if (users.some(u => u.username === username)) {
            this.setState({ errorMessage: 'The username is taken.' });
        } else {
            firebase
            .createUser({ email, password }, { email: email, username: username, following: [], bio: bio, reposts: [], })
            .then(userData => this.setState({ success: true }))
            .catch(error => this.setState({ errorMessage: error.message }));
        }
    };

    render() {
        const textStyle = { marginBottom: 20 };

        const signup = (
            <>
                <TopBar
                    left={{ linkTo: '/home', iconName: 'times' }}
                    logoLeft="Sign"
                    logoRight="Up"
                />
                <View style={style.screen}>
                    {this.state.errorMessage && (
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                    <TextField
                        placeholder="Email"
                        autoCapitalize="none"
                        style={textStyle}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextField
                        placeholder="Username"
                        autoCapitalize="none"
                        style={textStyle}
                        onChangeText={username => this.setState({ username })}
                        value={this.state.username}
                    />
                    <TextField
                        secureTextEntry
                        placeholder="Password"
                        autoCapitalize="none"
                        style={textStyle}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <TextField
                        secureTextEntry
                        placeholder="Confirm Password"
                        autoCapitalize="none"
                        style={textStyle}
                        onChangeText={c_password => this.setState({ c_password })}
                        value={this.state.c_password}
                    />
                    <TextField
                        placeholder="Bio (optional)"
                        style={textStyle}
                        onChangeText={bio => this.setState({ bio })}
                        value={this.state.bio}
                    />
                    <Button
                        text="Sign Up"
                        style={textStyle}
                        onPress={this.handleSignUp}
                    />
                    <Link
                        to="/login"
                        activeOpacity={0.5}
                        component={TouchableOpacity}
                    >
                        <Text>
                            Already have an account?{' '}
                            <Text style={{ fontWeight: '700' }}>Login</Text>
                        </Text>
                    </Link>
                </View>
            </>
        );

        return this.state.success ? <Redirect to="/me" /> : signup;
    }
}

const mapStateToProps = ({ firestore: { ordered }, firebase }) => {
    const users = ordered.users;
    return {
        auth: firebase.auth,
        users,
    };
};

export default compose(
    withFirestore,
    connect(mapStateToProps)
)(SignUpPage);
