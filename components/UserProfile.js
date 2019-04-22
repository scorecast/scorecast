import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, SectionList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import { Link } from 'react-router-native';
import TopBar from './TopBar/Bar';
import { styles, pallette } from '../styles';

const style = StyleSheet.create({
    container_c: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    container_r: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    itemRow: {
        flexDirection: 'row',
        padding: 20,
    },
    wrap: {
        flexWrap: 'wrap',
    },
    bigTag: {
        marginLeft: 15,
        alignSelf: 'flex-start',
        fontSize: 30,
        fontWeight: 'bold',
    },
    avatarStyle: {
        maxHeight: 100,
        maxWidth: 100,
        borderRadius: 4,
        marginRight: 10,
    },
    bio: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 18,
    },
    info_block: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 2,
        marginBottom: 2,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 3,
        fontSize: 12,
        width: 'auto',
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

class UserProfile extends Component {

    toggleFollow = (isFollowing, uid) => {
        const n_arr = isFollowing ?
            this.props.currentUser.following.filter(id => id !== uid) :
            this.props.currentUser.following.concat(uid);

        this.props.firestore.update({
            collection: 'users', 
            doc: this.props.auth.uid },
            { following : n_arr });
    };

    toggleRepost = (item) => {
        const reposted = this.props.currentUser.reposts.includes(item.id);
        const n_arr = reposted ?
            this.props.currentUser.reposts.filter(id => id !== item.id) :
            this.props.currentUser.reposts.concat(item.id);

        this.props.firestore.update({
            collection: 'users', 
            doc: this.props.auth.uid },
            { reposts : n_arr });
    };

    renderGameItem = ({ item, index, section }) => (
        <View style={
            [style.itemRow,
                index % 2
                ? { backgroundColor: pallette.lightergray }
                : { backgroundColor: pallette.white },]
        }>
            <Link
                to={`/game/${item.id}`}
                activeOpacity={0.5}
                component={TouchableOpacity}
                style={{fontSize: 20, flex: 5}}
            >
                <Text style={[{ fontSize: 20 }]}>{item.variables.gameName + (item.admin === this.props.auth.uid ? '\u2605' : '')}</Text>
                <Text style={{ fontSize: 10 }}>{this.props.templates[item.template].name}</Text>
                { this.props.users && this.props.users[item.admin] ? (
                    <Text style={{ fontSize: 10}}>{"@" + (this.props.users[item.admin]).username}</Text>
                ) : null }
            </Link>
            { item.admin !== this.props.auth.uid ? (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.toggleRepost(item)}
                    style={{flex: 1, alignSelf: 'center'}}
                >
                    <Icon name={'retweet'} color={this.props.currentUser && this.props.currentUser.reposts.includes(item.id) ? pallette.green : pallette.darkgray} size={20} />
                </TouchableOpacity>
            ) : null }
        </View>
    );

    renderSectionHeader = ({ section: { title }}) => (
        <Text style={style.sectionHeader}>{title}</Text>
    );

    render() {
        const { games, gameList, users, userId, currentUser, match, auth, userList, } = this.props;
        const uid = userId ? userId : match.params.userId;
        const user = users[uid];
        const followed = currentUser.following.includes(uid);

        let followingNum = 0;
        for(let i = 0; i < userList.length; i++) {
            const followList = userList[i].following;
            for (let j = 0; j < followList.length; j++) {
                if (followList[j] === uid) {
                    followingNum++;
                }
            }
        }

        const userGames = gameList.filter(g => g.admin === uid);
        const reposts = user.reposts.map(g_id => {
            const game = Object.assign({}, games[g_id]);
            game.id = g_id;
            return game;
        });
        const currentGames = [];
        const pastGames = [];
        userGames.forEach(game => {
            if (game.variables.win === 1) {
                pastGames.push(game);
            } else {
                currentGames.push(game);
            }
        });
        return (
            <>
                <TopBar
                    left={{ goBack: true , iconName: 'arrow-left' }}
                    right={ uid === auth.uid ?
                        {
                            linkTo: '/user/settings',
                            iconName: 'cog'
                        }
                        : 
                        {
                            onPress: (() => this.toggleFollow(followed, uid)),
                            iconName: (followed ? 'check' : 'user-plus')
                        }
                    }
                    logoLeft="User"
                    logoRight="Profile"
                />
                <View style={style.container_c}>
                    <View style={[style.container_r, style.wrap, { marginBottom: 5 }]}>
                        <Text style={[style.bigTag, { marginRight: 20 }]}>{'@' + user.username}</Text>
                        <View style={style.container_r}>
                            <View style={style.info_block}>
                                <Text style={{ fontWeight: 'bold' }}>{userGames.length}</Text>
                                <Text style={{ color: pallette.gray }}>Games Hosted</Text>
                            </View>
                            <Link
                                to={"/user/followers/" + uid}
                                component={TouchableOpacity}
                            >
                                <View style={style.info_block}>
                                    <Text style={{ fontWeight: 'bold' }}>{followingNum}</Text>
                                    <Text style={{ color: pallette.gray }}>Followers</Text>
                                </View>
                            </Link>
                            <Link
                                to={"/user/following/" + uid}
                                component={TouchableOpacity}
                            >
                                <View style={style.info_block}>
                                    <Text style={{ fontWeight: 'bold' }}>{user.following.length}</Text>
                                    <Text style={{ color: pallette.gray }}>Following</Text>
                                </View>
                            </Link>
                        </View>
                    </View>
                    <View style={style.wrap}>
                        <Text style={style.bio}>
                            {user.bio}
                        </Text>
                    </View>
                    <SectionList
                        style={styles.listView}
                        renderItem={this.renderGameItem}
                        renderSectionHeader={this.renderSectionHeader}
                        sections={
                            reposts.length === 0 ? 
                                (currentGames.length === 0 ? 
                                    [{title: "Past Games", data: pastGames},] :
                                    [{title: "Current Games", data: currentGames}, {title: "Past Games", data: pastGames},]) :
                                (currentGames.length === 0 ? 
                                    [{title: "Reposts", data: reposts}, {title: "Past Games", data: pastGames},] :
                                    [{title: "Current Games", data: currentGames}, {title: "Reposts", data: reposts}, {title: "Past Games", data: pastGames},])
                        }
                        keyExtractor={(game, index) => game.id + index}
                    />
                </View>
            </>
        );
    }
}

const mapStateToProps = ({ firestore: { data, ordered }, firebase }, { match }) => {
    const user = data.users && match && match.params ? data.users[match.params.userId] : {};
    return {
        user,
        gameList: ordered.games || [],
        games: data.games,
        users: data.users,
        userList: ordered.users,
        currentUser: data.users && firebase.auth.uid && data.users[firebase.auth.uid],
        auth: firebase.auth,
        templates: data.templates || {},
    };
};

export default compose(
    firestoreConnect(['templates', 'users']),
    connect(mapStateToProps)
)(UserProfile);
