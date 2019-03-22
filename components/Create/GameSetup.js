import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import TopBar from '../TopBar/Bar';

import { pallette, styles } from '../../styles';

class GameSetup extends Component {
    startGame = () => {
        const variables = JSON.parse(
            this.props.templates[
                this.props.games[this.props.match.params.gameId].template // TODO: refactor to this.props.match.params.templateId
            ].logic
        ).variables.reduce((acc, cur) => {
            acc[cur.name] = cur.type === 'Int' ? 0 : ''; //default is String
            return acc;
        }, {});

        this.props.firestore
            .update(
                { collection: 'games', doc: this.props.match.params.gameId },
                { variables: { ...variables, ...this.state } }
            )
            .then(ref => {
                const gamePath = '/home/game/' + this.props.match.params.gameId; // + ref.id;
                console.log(`Game started: ${gamePath}`);
                this.props.history.push(gamePath);
            });
    };

    render() {
        const game = this.props.games[this.props.match.params.gameId];
        const template = this.props.templates[game.template];
        let logic = template.logic;

        let setupList = [];
        if (logic) {
            logic = JSON.parse(logic);

            // TODO: add form validation for types
            // TODO: add readable name to vars (maybe just setup vars)
            setupList = logic.setup.map((setupVar, index) => {
                // this function doesn't make sense: need to rewrite
                let type = logic.variables.filter(v => {
                    return v.name === setupVar.name ? v.type : '';
                })[0];
                let defaultValue = type === 'Int' ? 0 : ''; //default is String

                return (
                    <View
                        key={index}
                        style={{ flexDirection: 'row', padding: 10 }}
                    >
                        <Text style={{ fontSize: 20 }}>
                            {setupVar.name + ': '}
                        </Text>
                        <TextInput
                            style={{
                                borderRadius: 10,
                                backgroundColor: pallette.lightgray,
                                flex: 1,
                                padding: 10,
                            }}
                            defaultValue={defaultValue}
                            onChangeText={text =>
                                this.setState({ [setupVar.name]: text })
                            }
                        />
                    </View>
                );
            });
        }

        return (
            <>
                <TopBar
                    left={{ linkTo: '/create', iconName: 'arrow-left' }}
                    logoLeft="Setup"
                    logoRight="Game"
                />
                <View style={styles.content}>
                    <Text style={[styles.header, { marginBottom: 50 }]}>
                        {template.name}
                    </Text>
                    <View style={{ minWidth: 300, marginBottom: 50 }}>
                        {setupList}
                    </View>
                    <TouchableOpacity onPress={this.startGame}>
                        <Text
                            style={{
                                backgroundColor: pallette.darkgray,
                                color: pallette.white,
                                borderRadius: 20,
                                padding: 20,
                                fontSize: 20,
                            }}
                        >
                            Start Game!
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

export default compose(
    firestoreConnect(['templates', 'games']),
    connect((state, props) => ({
        templates: state.firestore.data.templates || {},
        games: state.firestore.data.games || {},
    }))
)(GameSetup);
