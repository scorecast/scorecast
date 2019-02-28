import React, { Component } from 'react'
import { Text } from 'react-native'
import 'react-native'
import { connect } from 'react-redux';

const UserProfile = props => {
    return (
        <Text>Hello {props.firebase.auth.email}</Text>
    )
}

const mapStateToProps = state => ({
    firebase: state.firebase,
});

export default connect(mapStateToProps) (UserProfile)