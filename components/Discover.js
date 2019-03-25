import React from 'react';
import {
    View,
    FlatList,
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

        return (
            <>
                {games && templates ? (
                    <FlatList
                        style={styles.listView}
                        data={availableGames}
                        renderItem={this.renderGameItem}
                        keyExtractor={game => game.id}
                    />
                ) : null}
                <KeyboardAvoidingView behavior="position">
                    <View style={localStyles.codeTextForm}>
                        <TextInput
                            onChangeText={codeText =>
                                this.setState({ codeText })
                            }
                            style={localStyles.codeText}
                            value={this.state.codeText}
                            placeholder="Enter Game ID"
                            placeholderTextColor={pallette.gray}
                        />
                        <TouchableOpacity style={localStyles.codeTextButton}>
                            <Text style={localStyles.codeTextJoin}>Join</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
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
});

const mapStateToProps = state => ({
    firebase: state.firebase,
    templates: state.firestore.data.templates || {},
    games: state.firestore.ordered.games || [],
});

export default compose(
    firestoreConnect(['templates', 'games']),
    connect(mapStateToProps)
)(Discover);
