import React from 'react';
import {
    View,
    SectionList,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';
import { styles, pallette } from '../styles';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

class Discover extends React.Component {
    state = {
        codeText: '',
    };

    renderGameItem = ({ item, index, section }) => (
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
            <Text style={[{ fontSize: 20 }]}>{item.variables.gameName + (item.admin === this.props.auth.uid ? '\u2605' : '')}</Text>
            <Text style={{ fontSize: 10 }}>
            { /** TODO */}
            {this.props.templates[item.template].name + (this.props.users ? this.props.users[item.admin]['email'] : '')}
            </Text>
        </Link>
    );

    renderSectionHeader = ({ section: { title }}) => (
        <Text style={localStyles.sectionHeader}>{title}</Text>
    );

    render() {
        const { games, templates, users, currentUser, auth } = this.props;

        const availableGames = games.filter(g => g.variables['gameName'] && !g.variables['win']);
        let followedGames = [];
        let generalGames = [];

        if (currentUser) {
            followedGames = availableGames.filter(g => currentUser.following.includes(g.admin) || g.admin === auth.uid);
            generalGames = availableGames.filter(g => !currentUser.following.includes(g.admin) && g.admin !== auth.uid);
        } else {
            generalGames = availableGames;
        }
        return (
            <>
                {games && templates && users ? (
                    <SectionList
                        style={styles.listView}
                        renderItem={this.renderGameItem}
                        renderSectionHeader={this.renderSectionHeader}
                        sections={
                            auth.isEmpty || auth.isAnonymous ? [{title: "General Games", data: generalGames},] :
                                [{title: "Followed Games", data: followedGames},
                                {title: "All Games", data: generalGames},]
                        }
                        keyExtractor={(game, index) => game.id + index}
                    />
                ) : null}
            </>
        );
    }
}

const localStyles = StyleSheet.create({
    codeTextForm: {
        flexDirection: 'row',
        backgroundColor: pallette.white,
        height: 50,
    },
    codeText: {
        minWidth: 200,
        flex: 1,
        borderColor: pallette.gray,
        borderWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        paddingLeft: 20,
    },
    codeTextButton: {
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pallette.crimson,
    },
    codeTextJoin: {
        fontSize: 16,
        fontWeight: 'bold',
        color: pallette.white,
    },
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: pallette.crimson,
        color: pallette.white,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },
});

const mapStateToProps = state => ({
    firebase: state.firebase,
    templates: state.firestore.data.templates || {},
    games: state.firestore.ordered.games || [],
    users: state.firestore.data.users,
    currentUser: state.firestore.data.users && state.firestore.data.users[state.firebase.auth.uid],
    auth: state.firebase.auth,
});

export default compose(
    firestoreConnect(['templates', 'games', 'users',]),
    connect(mapStateToProps)
)(Discover);
