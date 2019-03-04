import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Link, Redirect } from 'react-router-native';
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

const UserProfile = props => {
    return props.auth.isEmpty || props.auth.isAnonymous ? (
        <Redirect to="/login" from="/user" />
    ) : (
        <>
            <View style={styles.topbar}>
                <Link
                    to="/home"
                    activeOpacity={0.5}
                    component={TouchableOpacity}
                    style={styles.topButton}
                >
                    <Icon name="home" size={20} color={pallette.darkgray} />
                </Link>
            </View>
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
