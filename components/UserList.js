import React from 'react';
import { View, TextInput, Text, StyleSheet, FlatList, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
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
        flex: 4,
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



class UserList extends React.Component {
    state = {
        searchText: '',
    };

    toggleFollow = (item) => {
        const followed = this.props.currentUser.following.includes(item.id);
        const n_arr = followed ?
            this.props.currentUser.following.filter(id => id !== item.id) :
            this.props.currentUser.following.concat(item.id);

        this.props.firestore.update({
            collection: 'users',
            doc: this.props.auth.uid },
            { following : n_arr });
    };

    boldSubText = (text, sub) => {
        let elems = [];
        let p_Text = text;
        while (p_Text.length > 0 && p_Text.includes(sub) && sub.length > 0) {
            const occ = p_Text.indexOf(sub);
            if (occ >= 0) {
                if (occ !== 0) {
                    const extract = p_Text.slice(0, occ);
                    elems.push((
                        <Text>{extract}</Text>
                    ));
                }
                elems.push((
                    <Text style={{fontWeight: 'bold'}}>{sub}</Text>
                ));
                const newText = p_Text.slice(occ + sub.length);
                p_Text = newText;
            } else {
                elems.push((
                    <Text>{p_Text}</Text>
                ));
                p_Text = '';
                break;
            }
        }
        if (p_Text.length > 0) {
            elems.push((
                <Text>{p_Text}</Text>
            ));
        }
        return elems;
    }

    renderUserItem = ({ item, index }) =>
    (
        <View style={[
            style.itemRow,
            index % 2
                        ? { backgroundColor: pallette.lightergray }
                        : { backgroundColor: pallette.white },]}
        >
            <Link
                to={"/user/profile/" + item.id}
                activeOpacity={0.5}
                component={TouchableOpacity}
                style={{flex: 5}}
            >
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Image style={styles.avatarStyle} source={{ uri : (this.props.users[item.id] && this.props.users[item.id].avatar_url) ?
                        this.props.users[item.id].avatar_url :
                        'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-32.png'}} style={styles.avatarStyle}/>
                    <Text style={[style.itemText, { fontSize: 20 }]}> { /** Figure out why icon size is related to font size */}
                        {this.boldSubText(item.username, this.state.searchText)}
                    </Text>
                </View>
            </Link>
            { item.id !== this.props.auth.uid || !this.props.showFollow ? (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.toggleFollow(item)}
                    style={style.itemButton}
                >
                    <Icon name={ this.props.currentUser.following.includes(item.id) ? 'check' : 'user-plus'} size={20} color={pallette.darkgray} />
                </TouchableOpacity>
            ) : null }
        </View>
    );

    render() {
        const filteredUsers = !this.props.userList ? null :
            this.props.userList.filter(u => {
                const tester = new RegExp(".?" + this.state.searchText + ".?");
                return tester.test(u.username);
        });

        return (
            <>
                {this.props.userList ? (
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
    auth: state.firebase.auth,
    users: state.firebase.data.users || {},
});

export default compose(
    firestoreConnect(['users',]),
    connect(mapStateToProps)
)(UserList);
