import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { Link, Redirect } from 'react-router-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import { styles, pallette } from '../styles';
import firebase from 'firebase';

class SignUpPage extends Component {
    state = { email: '', password: '', c_Password: '', errorMessage: null }

    handleSignUp = () => {
        const { email, password } = this.state;
        console.log("attempting to log in");
        console.log(this.state);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => this.props.history.goBack())
          .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        console.log("we made it");

        const signup = (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email : email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password : password })}
                    value={this.state.password}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={c_Password => this.setState({ c_Password : c_Password })}
                    value={this.state.c_Password}
                />
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <TouchableOpacity activeOpacity={0.5}>
                    <Link to="/login">
                        <Icon name="user" size={20} color={pallette.darkgray} />
                    </Link>
                </TouchableOpacity>
            </View>
        );

        if (!this.props.firebase.auth.email === 'undefined') {
            return ( <Redirect to="/user" from="/signup"/> );
        } else {
            return login;
        }
    }
}
const mapStateToProps = state => ({
    firebase: state.firebase,
});

export default connect(mapStateToProps)(SignUpPage);