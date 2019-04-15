import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { Redirect, Route, Link } from 'react-router-native';
import TopBar from './TopBar/Bar';
import { styles, pallette } from '../styles';
import NewFollow from './NewFollow';

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pallette.lightgray,
    },
    listView: {
        flexGrow: 0,
        backgroundColor: pallette.white,
    },
    button: {
        backgroundColor: pallette.darkgray,
        color: pallette.black,
        padding: 16,
        fontSize: 26,
        fontWeight: 'bold',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: pallette.black,
        margin: 10,
    }
});

const UserProfile = props => {

    const { games, templates, currentUser, auth } = props;

    renderGameItem = ({ item, index }) => (
        <Link
            to={`/game/${item.id}`}
            activeOpacity={0.5}
            component={TouchableOpacity}
            style={[
                styles.listViewRow,
                index % 2
                    ? { backgroundColor: pallette.lightergray }
                    : { backgroundColor: pallette.white },
            ]}
        >
            <Text style={[{ fontSize: 20 }]}>{item.variables.gameName}</Text>
            <Text style={{ fontSize: 10 }}>
                {templates[item.template].name}
            </Text>
        </Link>
    );

    const userGames = games.filter(g => g.admin === props.auth.uid);
    return auth.isEmpty || auth.isAnonymous ? (
        <Redirect to="/login" from="/user" />
    ) : (
        <>
            <TopBar
                left={{ linkTo: '/home', iconName: 'times' }}
                logoLeft="User"
                logoRight="Profile"
            />

            <View style={style.screen}>
                <Text>Hello {auth.email}</Text>
                { userGames.length !== 0 ? (
                    <View>
                        <Text>Games you've hosted:</Text>
                        <FlatList
                            style={style.listView}
                            data={userGames}
                            renderItem={this.renderGameItem}
                            keyExtractor={game => game.id}
                        />
                    </View>
                ) : (
                    <Text>You haven't hosted any games.</Text>
                )}
                <Button
                    onPress={() => {
                        props.firebase
                            .logout()
                            .then(() => props.history.replace("/login"));
                    }}
                    title="Log out"
                    style={[{ margin: 10 }]}
                />
                <Link
                    to="/follow/new"
                    component={TouchableOpacity}
                    style={style.button}
                >
                    <Text>Follow More People!</Text>
                </Link>
            </View>
        </>
    );
};

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    games: state.firestore.ordered.games || [],
    templates: state.firestore.data.templates || {},
    currentUser: state.firestore.data.users && state.firestore.data.users[state.firebase.auth.uid],
});

export default compose(
    withFirestore,
    withFirebase,
    connect(mapStateToProps)
)(UserProfile);
