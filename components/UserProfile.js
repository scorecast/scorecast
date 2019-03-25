import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Redirect } from 'react-router-native';
import TopBar from './TopBar/Bar';
import { styles, pallette } from '../styles';

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pallette.lightgray,
    },
});

const UserProfile = props => {
    return props.auth.isEmpty || props.auth.isAnonymous ? (
        <Redirect to="/login" from="/user" />
    ) : (
        <>
            <TopBar left={{ linkTo: '/home', iconName: 'home' }} />
            <View style={style.screen}>
                <Text>Hello {props.auth.email}</Text>
                <Button
                    onPress={() => {
                        props.firebase
                            .logout()
                            .then(() => props.history.goBack());
                    }}
                    title="Log out"
                />
            </View>
        </>
    );
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});

export default compose(
    withFirebase,
    connect(mapStateToProps)
)(UserProfile);
