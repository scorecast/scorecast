import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles, pallette } from '../styles';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';

class Discover extends React.Component {
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
                {this.props.templates[item.template].name}
            </Text>
        </Link>
    );

    render() {
        const { games, templates } = this.props;

        const availableGames = games.filter(g => g.variables['gameName']);

        return games && templates ? (
            <FlatList
                style={styles.listView}
                data={availableGames}
                renderItem={this.renderGameItem}
                keyExtractor={game => game.id}
            />
        ) : null;
    }
}

const mapStateToProps = state => ({
    firebase: state.firebase,
    templates: state.firestore.data.templates || {},
    games: state.firestore.ordered.games || [],
});

export default compose(
    firestoreConnect(['templates', 'games']),
    connect(mapStateToProps)
)(Discover);
