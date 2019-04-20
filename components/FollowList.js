import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import TopBar from './TopBar/Bar'
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import UserList from './UserList';


class FollowList extends React.Component {

    render() {
        const { match, auth, users } = this.props;
        const uid = match.params.userId;
        const user = users[uid];

        const followList = user ? 
            user.following.map(u_id => {
                let u_info = Object.assign({}, users[u_id]); // deep copy to remove read-only
                u_info.id = u_id;
                return u_info;
            }) : [];

        return (
            <>
                <TopBar
                    left={{ goBack: true, iconName: 'arrow-left' }}
                    right={uid === auth.uid ? { linkTo: '/follow/new', iconName: 'plus'} : null}
                    logoLeft="Score"
                    logoRight="Cast" />
                <UserList userList={followList} showFollow={true}/>
            </>
        );
    }
}

const mapStateToProps = state => ({
    users: state.firestore.data.users || {},
    auth: state.firebase.auth,
});

export default compose(
    firestoreConnect(['users',]),
    connect(mapStateToProps)
)(FollowList);