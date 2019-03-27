import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { Redirect, Link } from 'react-router-native';
import TopBar from './TopBar/Bar';
import { styles, pallette } from '../styles';

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
    }
});

const UserProfile = props => {

    const { games, templates } = props;

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
                {props.templates[item.template].name}
            </Text>
        </Link>
    );

    const userGames = props.games.filter(g => g.admin === props.auth.uid);
    return props.auth.isEmpty || props.auth.isAnonymous ? (
        <Redirect to="/login" from="/user" />
    ) : (
        <>
            <TopBar
                left={{ linkTo: '/home', iconName: 'home' }}
                logoLeft="User"
                logoRight="Profile"
            />
            <View style={style.screen}>
                <Text>Hello {props.auth.email}</Text>
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
    games: state.firestore.ordered.games || [],
    templates: state.firestore.data.templates || {},
});

export default compose(
    withFirestore,
    withFirebase,
    connect(mapStateToProps)
)(UserProfile);
