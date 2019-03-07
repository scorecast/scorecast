import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    TouchableOpacity,
} from 'react-native';
import { Link, Redirect } from 'react-router-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

import { styles, pallette } from '../styles';

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pallette.lightgray,
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
        const login = (
            <>
                <View style={styles.topbar}>
                    <Link
                        to="/home"
                        activeOpacity={0.5}
                        component={TouchableOpacity}
                        style={styles.topButton}
                    >
                        <Text>Not Now</Text>
                    </Link>
                </View>
                <View style={style.screen}>
                    <Text>Login</Text>
                    {this.state.errorMessage && (
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        secureTextEntry
                        style={styles.textInput}
                        autoCapitalize="none"
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <Button title="Login" onPress={this.handleLogin} />
                    <Link
                        to="/signup"
                        activeOpacity={0.5}
                        component={TouchableOpacity}
                    >
                        <Text>No account yet? Create One</Text>
                    </Link>
                </View>
            </>
        );

        return this.props.auth.email ? <Redirect to="/user" /> : login;
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});

export default compose(
    withFirebase,
    connect(mapStateToProps)
)(Login);
