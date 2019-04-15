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
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles, pallette } from '../styles';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

class Discover extends React.Component {
    state = {
        codeText: '',
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
            [localStyles.itemRow,
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
                    style={{flex: 1, alignSelf: "center"}}
                >
                    <Icon name={ this.props.currentUser && this.props.currentUser.reposts.includes(item.id) ? 'check' : 'retweet'} size={20} color={pallette.darkgray} />
                </TouchableOpacity>
            ) : null }
        </View>
    );

    renderSectionHeader = ({ section: { title }}) => (
        <Text style={localStyles.sectionHeader}>{title}</Text>
    );

    render() {
        const { games, templates, currentUser, auth } = this.props;

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
                {games && templates ? (
                    <SectionList
                        style={styles.listView}
                        renderItem={this.renderGameItem}
                        renderSectionHeader={this.renderSectionHeader}
                        sections={
                            auth.isEmpty || auth.isAnonymous || followedGames.length === 0 ? [{title: "General Games", data: generalGames},] :
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
    itemRow: {
        flexDirection: 'row',
        padding: 20,
    },
});

const mapStateToProps = state => ({
    firebase: state.firebase,
    templates: state.firestore.data.templates || {},
    games: state.firestore.ordered.games || [],
    users: state.firestore.data.users || {},
    currentUser: state.firestore.data.users && state.firestore.data.users[state.firebase.auth.uid],
    auth: state.firebase.auth,
});

export default compose(
    firestoreConnect(['templates', 'games', 'users',]),
    connect(mapStateToProps)
)(Discover);
