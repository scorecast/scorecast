import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

const MyProfile = props => {

    const { auth } = props;

    /*console.warn(auth.isEmpty);
    console.warn(auth.isAnonymous);
    console.warn(auth.uid);*/

    return auth.isEmpty || auth.isAnonymous ? (
        <Redirect to="/login" from="/me" />
    ) : (
        <View style={style.screen}>
            <UserProfile userId={auth.uid}/>
        </View>
    );
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});

export default compose(
    withFirestore,
    withFirebase,
    connect(mapStateToProps)
)(MyProfile);
