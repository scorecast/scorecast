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

class SignUpPage extends Component {
    state = {
        email: '',
        password: '',
        c_Password: '',
        errorMessage: null,
        success: false,
    };

    handleSignUp = () => {
        const { email, password } = this.state;
        this.props.firebase
            .createUser({ email, password })
            .then(() => this.setState({ success: true }))
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        const signup = (
            <>
                <View style={styles.topbar}>
                    <Link
                        to="/home"
                        activeOpacity={0.5}
                        component={TouchableOpacity}
                        style={{ padding: 20 }}
                    >
                        <Text>Not Now</Text>
                    </Link>
                </View>
                <View style={style.screen}>
                    <Text>Sign Up</Text>
                    {this.state.errorMessage && (
                        <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>
                    )}
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <TextInput
                        secureTextEntry
                        placeholder="Confirm Password"
                        autoCapitalize="none"
                        style={styles.textInput}
                        onChangeText={c_Password =>
                            this.setState({ c_Password })
                        }
                        value={this.state.c_Password}
                    />
                    <Button title="Sign Up" onPress={this.handleSignUp} />
                    <Link
                        to="/login"
                        activeOpacity={0.5}
                        component={TouchableOpacity}
                    >
                        <Text>Already have an account? Login</Text>
                    </Link>
                </View>
            </>
        );

        return this.state.success ? <Redirect to="/login" /> : signup;
    }
}

export default withFirebase(SignUpPage);
