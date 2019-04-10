import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native';
import { Link, Redirect } from 'react-router-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';

import { styles, pallette } from '../styles';
import TopBar from './TopBar/Bar';
import Button from './Button';
import TextField from './TextField';

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pallette.lightgray,
        padding: 20,
    },
});

class Login extends Component {
    state = { email: '', password: '', errorMessage: null };

    handleLogin = () => {
        const { email, password } = this.state;
        this.props.firebase
            .login({ email, password })
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        const textStyle = { marginBottom: 20 };

        const login = (
            <>
                <TopBar
                    left={{ linkTo: '/home', iconName: 'times' }}
                    logoLeft="Sign"
                    logoRight="In"
                />
                <View style={style.screen}>
                    {this.state.errorMessage && (
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                    <TextField
                        style={textStyle}
                        autoCapitalize="none"
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextField
                        secureTextEntry
                        style={textStyle}
                        autoCapitalize="none"
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <Button
                        style={{ marginBottom: 20 }}
                        text="Sign In"
                        onPress={this.handleLogin}
                    />
                    <Link
                        to="/signup"
                        activeOpacity={0.5}
                        component={TouchableOpacity}
                    >
                        <Text>
                            No account yet?{' '}
                            <Text style={{ fontWeight: '700' }}>
                                Create One
                            </Text>
                        </Text>
                    </Link>
                </View>
            </>
        );

        return this.props.auth.email ? <Redirect to="/me" /> : login;
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});

export default compose(
    withFirebase,
    connect(mapStateToProps)
)(Login);
