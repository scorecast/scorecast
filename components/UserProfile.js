import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import TopBar from './TopBar/Bar';
import { styles, pallette } from '../styles';



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

    render() {
        const { games, users, userId, currentUser, match, auth } = this.props;
        const uid = userId ? userId : match.params.userId;
        const user = users[uid];
        const followed = currentUser.following.includes(uid);

        const userGames = games.filter(g => g.admin === uid);
        return (
            <>
                <TopBar
                    left={{ goBack: true , iconName: 'arrow-left' }}
                    right={ uid === auth.uid ? { iconName: 'cog'}
                        : {
                            onPress: (() => this.toggleFollow(followed, uid)),
                            iconName: (followed ? 'check' : 'user-plus')}
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
                            {/* <View style={style.info_block}>
                                <Text style={{ fontWeight: 'bold' }}>4</Text>
                                <Text style={{ color: pallette.gray }}>Followers</Text>
                            </View> */}
                            <View style={style.info_block}>
                                <Text style={{ fontWeight: 'bold' }}>{user.following.length}</Text>
                                <Text style={{ color: pallette.gray }}>Following</Text>
                            </View>
                        </View>
                    </View>
                    <View style={style.wrap}>
                        <Text style={style.bio}>
                            {user.bio}
                        </Text>
                    </View>
                </View>
            </>
            // { userGames.length !== 0 ? (
            //     <View>
            //         <Text>Games you've hosted:</Text>
            //         <FlatList
            //             style={style.listView}
            //             data={userGames}
            //             renderItem={this.renderGameItem}
            //             keyExtractor={game => game.id}
            //         />
            //     </View>
            // ) : (
            //     <Text>You haven't hosted any games.</Text>
            // )}
        );
    }
}

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
    wrap: {
        flexWrap: 'wrap',
    },
    bigTag: {
        marginLeft: 15,
        alignSelf: 'flex-start',
        fontSize: 30,
        fontWeight: 'bold',
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
    }
});

const mapStateToProps = ({ firestore: { data, ordered }, firebase }, { match }) => {
    const user = data.users && match && match.params ? data.users[match.params.userId] : {};
    return {
        user,
        games: ordered.games || [],
        users: data.users,
        currentUser: data.users && firebase.auth.uid && data.users[firebase.auth.uid],
        auth: firebase.auth,
    };
};

export default compose(
    firestoreConnect(['templates', 'users']),
    connect(mapStateToProps)
)(UserProfile);
