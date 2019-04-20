import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import TopBar from './TopBar/Bar'
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import UserList from './UserList';


class FollowerList extends React.Component {

    render() {
        const { match, auth, users, userList } = this.props;
        const uid = match.params.userId;
        const user = users[uid];

        const followers = [];
        for(let i = 0; i < userList.length; i++) {
            const followList = userList[i].following;
            for (let j = 0; j < followList.length; j++) {
                if (followList[j] === uid) {
                    followers.push(userList[i]);
                }
            }
        }

        return (
            <>
                <TopBar
                    left={{ goBack: true, iconName: 'arrow-left' }}
                    logoLeft="Score"
                    logoRight="Cast" />
                <UserList userList={followers} showFollow={true}/>
            </>
        );
    }
}

const mapStateToProps = state => ({
    userList: state.firestore.ordered.users,
    users: state.firestore.data.users || {},
    auth: state.firebase.auth,
});

export default compose(
    firestoreConnect(['users',]),
    connect(mapStateToProps)
)(FollowerList);