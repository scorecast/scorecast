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
        password: '',
        errorMessage: null,
        success: false,
    };

    handleSignUp = () => {
        const { email, password } = this.state;
        const { auth, firestore, firebase } = this.props;
        firebase
            .createUser({ email, password }, { email: email, following: [] })
            .then(userData => this.setState({ success: true }))
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        const textStyle = { marginBottom: 20 };

        const signup = (
            <>
                <TopBar
                    left={{ linkTo: '/home', iconName: 'home' }}
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
                        secureTextEntry
                        placeholder="Password"
                        autoCapitalize="none"
                        style={textStyle}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
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

        return this.state.success ? <Redirect to="/user" /> : signup;
    }
}

const mapStateToProps = ({ firestore: { data }, firebase }) => {
    const users = data.users;
    return {
        auth: firebase.auth,
        users,
    };
};

export default compose(
    withFirestore,
    connect(mapStateToProps)
)(SignUpPage);
