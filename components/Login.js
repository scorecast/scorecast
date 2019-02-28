import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import { styles, pallette } from '../styles';
import firebase from 'firebase';

class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null }

    handleLogin = () => {
        const { email, password } = this.state;
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => { console.log(this.props.firebase); this.props.history.goBack(); })
        .catch(error => this.setState({ errorMessage: error.message}))
    }

    render() {
        console.log("in login");
        const login = (
            <View style={styles.container}>
                <Text>Login</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
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
                <TouchableOpacity activeOpacity={0.5}>
                    <Link to="/signup">
                        <Icon name="user" size={20} color={pallette.darkgray} />
                    </Link>
                </TouchableOpacity>
            </View>
        );

        if (!this.props.firebase.auth.email === 'undefined') {
            return ( <Redirect to="/user" from="/login"/> );
        } else {
            return login;
        }
    }
}

const mapStateToProps = state => ({
    firebase: state.firebase,
});

export default connect(mapStateToProps)(Login);