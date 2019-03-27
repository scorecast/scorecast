import React from 'react';
import { View, TextInput, Text, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { styles, pallette } from '../styles'
import TopBar from './TopBar/Bar'
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-native';

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
    state = {
        searchText: '',
    };

    toggleFollow = (item) => {
        const followed = this.props.currentUser.following.includes(item.id)
        const n_arr = followed ?
            this.props.currentUser.following.filter(id => id !== item.id) :
            this.props.currentUser.following.concat(item.id);

        this.props.firestore.update({
            collection: 'users', 
            doc: this.props.auth.uid },
            { following : n_arr });
    };

    renderUserItem = ({ item, index }) => 
    (
        <View style={[
            style.itemRow,
            index % 2
                        ? { backgroundColor: pallette.lightergray }
                        : { backgroundColor: pallette.white },]}
        >
            <Link
                to=""
                activeOpacity={0.5}
                component={TouchableOpacity}
                style={{ flex: 5 }}
            >   
                <Text style={style.itemText}>
                    {item.email} { /** TODO add bold highlighting to search text */}
                </Text>
            </Link>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.toggleFollow(item)}
                style={style.itemButton}
            >
                <Icon name={ this.props.currentUser.following.includes(item.id) ? 'check' : 'user-plus'} size={20} color={pallette.darkgray} />
            </TouchableOpacity>
        </View>
    );

    render() {
        const filteredUsers = !this.props.currentUser ? null :
            this.props.users.filter(u => {
                const tester = new RegExp(".?" + this.state.searchText + ".?");
                return tester.test(u.email) && u.id !== this.props.auth.uid;
        });

        return this.props.auth.isEmpty || this.props.auth.isAnonymous ?
            this.props.history.goBack() : 
        (
            <>
                <TopBar
                    left={{ linkTo: '/user', iconName: 'user' }}
                    logoLeft="Follow"
                    logoRight="People" />
                {this.props.users ? (
                    <FlatList
                    style={styles.listView}
                    data={filteredUsers}
                    renderItem={this.renderUserItem}
                    keyExtractor={user => user.id}
                />
                ) : null }
                <KeyboardAvoidingView behavior="position">
                    <View style={style.searchTextForm}>
                        <TextInput
                            onChangeText={searchText =>
                                this.setState({ searchText })
                            }
                            autoCapitalize="none"
                            style={style.searchText}
                            value={this.state.searchText}
                            placeholder="Search for user"
                            placeholderTextColor={pallette.gray}
                        />
                    </View>
                </KeyboardAvoidingView>
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