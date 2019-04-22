import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { Redirect, Route, Link } from 'react-router-native';
import Button from './Button';
import { styles, pallette } from '../styles';
import UserProfile from './UserProfile';

const style = StyleSheet.create({
    screen: {
        display: 'flex',
        backgroundColor: pallette.lightgray,
    },
    button: {
        backgroundColor: pallette.crimson,
        color: pallette.white,
        padding: 16,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 5,
    }
});

class MyProfile extends Component {

    async getExpoNotification() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        let token = 'nah';
        if (finalStatus === 'granted') {
            // Get the token that uniquely identifies this device
            token = await Notifications.getExpoPushTokenAsync();
        }

        this.props.firestore.update({
            collection: 'users',
            doc: this.props.auth.uid },
            { expoDeviceToken : token }
        );

    }

    componentWillMount() {
        this.getExpoNotification();
    }

    render() {
        const { auth } = this.props;

        return auth.isEmpty || auth.isAnonymous ? (
            <Redirect to="/login" from="/me" />
        ) : (
            <View style={style.screen}>
                <UserProfile userId={auth.uid}/>
            </View>
        );
    }

    
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});

export default compose(
    withFirestore,
    withFirebase,
    connect(mapStateToProps)
)(MyProfile);