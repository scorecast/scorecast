import React from 'react';
import {
    View,
    SectionList,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles, pallette } from '../styles';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

class Discover extends React.Component {
    toggleRepost = item => {
        const reposted = this.props.currentUser.reposts.includes(item.id);
        const n_arr = reposted
            ? this.props.currentUser.reposts.filter(id => id !== item.id)
            : this.props.currentUser.reposts.concat(item.id);

        this.props.firestore.update(
            {
                collection: 'users',
                doc: this.props.auth.uid,
            },
            { reposts: n_arr }
        );
    };

    renderGameItem = ({ item, index, section }) => (
        <View
            style={[
                localStyles.itemRow,
                index % 2
                    ? { backgroundColor: pallette.lightergray }
                    : { backgroundColor: pallette.white },
            ]}
        >
            <Link
                to={`/game/${item.id}`}
                activeOpacity={0.5}
                component={TouchableOpacity}
                style={{ fontSize: 20, flex: 5 }}
            >
                <Text style={[{ fontSize: 20 }]}>
                    {item && item.variables ? item.variables.gameName : ''}
                </Text>
                <Text style={{ fontSize: 10 }}>
                    {item && item.template
                        ? this.props.templates[item.template].name
                        : ''}
                </Text>
                {this.props.users && this.props.users[item.admin] ? (
                    <Text style={{ fontSize: 10 }}>
                        {'@' + this.props.users[item.admin].username}
                    </Text>
                ) : null}
            </Link>
            {item.admin !== this.props.auth.uid &&
            !(this.props.auth.isEmpty || this.props.auth.isAnonymous) ? (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.toggleRepost(item)}
                    style={{ flex: 1, alignSelf: 'center' }}
                >
                    <Icon
                        name={'retweet'}
                        color={
                            this.props.currentUser &&
                            this.props.currentUser.reposts.includes(item.id)
                                ? pallette.green
                                : pallette.darkgray
                        }
                        size={20}
                    />
                </TouchableOpacity>
            ) : null}
        </View>
    );

    renderSectionHeader = ({ section: { title } }) => (
        <Text style={localStyles.sectionHeader}>{title}</Text>
    );

    render() {
        const {
            games,
            gameList,
            templates,
            currentUser,
            users,
            auth,
        } = this.props;

        if (!gameList || !templates) return null;
        console.log(users);

        const availableGames = gameList.filter(
            g => g.variables && g.variables['gameName'] && !g.variables['win']
        );
        let followedGames = [];
        let generalGames = [];

        if (currentUser) {
            // Games of people I follow OR my games
            const follows = availableGames.filter(
                g =>
                    currentUser.following.includes(g.admin) ||
                    g.admin === auth.uid
            );
            // Games I've reposted of people I don't follow
            const reposts = currentUser.reposts
                .map(id => ({ ...games[id], id }))
                .filter(game => !currentUser.following.includes(game.admin));
            followedGames = follows.concat(reposts);
            let follow_reposts = [];
            currentUser.following.forEach(u_id => {
                const fUser = users[u_id];
                fUser &&
                    fUser.reposts.forEach(g_id => {
                        const game = Object.assign({}, games[g_id]);
                        game.id = g_id;
                        follow_reposts.push(game);
                    });
            });
            followedGames = followedGames.concat(
                follow_reposts.filter(
                    game => !followedGames.some(g => g.id === game.id)
                )
            );
            generalGames = availableGames.filter(
                g =>
                    !currentUser.following.includes(g.admin) &&
                    g.admin !== auth.uid &&
                    !followedGames.some(g2 => g2.id === g.id)
            );
        }

        return (
            <SectionList
                style={styles.listView}
                renderItem={this.renderGameItem}
                // renderSectionHeader={this.renderSectionHeader}
                sections={
                    auth.isEmpty ||
                    auth.isAnonymous ||
                    followedGames.length === 0
                        ? [
                              {
                                  title: 'General Games',
                                  data: availableGames,
                              },
                          ]
                        : [
                              {
                                  title: 'Followed Games',
                                  data: followedGames,
                              },
                              {
                                  title: 'All Games',
                                  data: generalGames,
                              },
                          ]
                }
                keyExtractor={(game, index) => game.id + index}
            />
        );
    }
}

const localStyles = StyleSheet.create({
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: pallette.crimson,
        color: pallette.white,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },
    itemRow: {
        flexDirection: 'row',
        padding: 20,
    },
});

const mapStateToProps = state => ({
    firebase: state.firebase,
    templates: state.firestore.data.templates,
    gameList: state.firestore.ordered.games,
    games: state.firestore.data.games,
    users: state.firestore.data.users,
    currentUser:
        state.firestore.data.users &&
        state.firestore.data.users[state.firebase.auth.uid],
    auth: state.firebase.auth,
});

export default compose(
    firestoreConnect(['templates', 'games', 'users']),
    connect(mapStateToProps)
)(Discover);
