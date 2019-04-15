import React from 'react';
import { View, TextInput, Text, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { styles, pallette } from '../styles'
import TopBar from './TopBar/Bar'
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-native';
import UserList from './UserList';

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pallette.lightgray,
    },
    itemRow: {
        flexDirection: 'row',
        padding: 20,
    },
    itemCol: {
        flexDirection: 'column',
    },
    itemText: {
        fontSize: 20,
    },
    itemButton: {
        flex: 1,
    },
    searchTextForm: {
        flexDirection: 'row',
        backgroundColor: pallette.white,
        height: 50,
    },
    searchText: {
        minWidth: 200,
        flex: 1,
        borderColor: pallette.gray,
        borderWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        paddingLeft: 20,
    },
    searchTextSearch: {
        fontSize: 16,
        fontWeight: 'bold',
        color: pallette.white,
    },
});



class NewFollow extends React.Component {

    render() {
        const filteredUsers = !this.props.currentUser ? null :
            this.props.users.filter(u => u.id !== this.props.auth.uid);

        return this.props.auth.isEmpty || this.props.auth.isAnonymous ?
            this.props.history.goBack() : 
        (
            <>
                <TopBar
                    left={{ goBack: true, iconName: 'arrow-left' }}
                    logoLeft="Follow"
                    logoRight="People" />
                <UserList userList={filteredUsers}/>
            </>
        );
    }
}

const mapStateToProps = state => ({
    currentUser : state.firestore.data.users && state.firestore.data.users[state.firebase.auth.uid],
    users: state.firestore.ordered.users || [],
    auth: state.firebase.auth,
});

export default compose(
    firestoreConnect(['users',]),
    connect(mapStateToProps)
)(NewFollow);