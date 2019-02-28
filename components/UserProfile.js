import React from 'react'
import { View, Text, Button } from 'react-native'

import firebase from 'firebase';

import { connect } from 'react-redux';

const UserProfile = props => {
    return (
        <View>
            <Text>Hello {props.firebase.auth.email}</Text>
            <Button onPress={() => {firebase.auth().signOut().then(() => props.history.goBack())}} title="Log out"/>
        </View>
    )
}

const mapStateToProps = state => ({
    firebase: state.firebase,
});

export default connect(mapStateToProps) (UserProfile)