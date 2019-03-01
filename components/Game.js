import {pallette, styles} from "../styles";
import {
    ListView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";
import React, { Component } from "react";

import {compose} from "redux";
import {firestoreConnect, getVal} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";
import Icon from 'react-native-vector-icons/FontAwesome';
import Link from "react-router-native/Link";

class GameSetup extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //TODO: Figure out event listeners so that multiple people can update
        //this.props.firestore.setListener({ collection: 'games', doc: this.props.match.params.gameId });
    }

    render() {
        let game = this.props.games.find((g) => {
            return g.id === this.props.match.params.gameId;
        });

        let template = this.props.games.find((g) => {
            return g.id === this.props.match.params.gameId;
        }).template;

        let logic = this.props.templates.find((t) => {
            return t.id === template;
        }).logic;

        let gameName = 'Game';
        let varList = Object.keys(game.variables).map((varName, index) => {
            if (varName === 'gameName') {
                gameName = game.variables[varName];
            }
            return (
                <View key={index} style={{flexDirection: 'row', padding: 10}}>
                    <Text style={{fontSize: 20}}>{varName + ': '}</Text>
                    <Text style={{borderRadius: 10, backgroundColor: pallette.lightergray,
                        flex: 1, padding: 10}}>{game.variables[varName]}</Text>
                </View>
            );
        });

        let actionList = [];
        if (logic) {
            logic = JSON.parse(logic);
            console.log(logic.actions);

            actionList = logic.actions.map((action, index) => {
                return (
                    <View key={index} style={{flexDirection: 'row',  justifyContent: 'center', padding: 10}}>
                        <TouchableOpacity>
                            <Text style={{backgroundColor: pallette.darkgray,
                                color: pallette.white,
                                borderRadius: 10,
                                padding: 10,
                                fontSize: 10}}>{action.name}</Text>
                        </TouchableOpacity>
                    </View>
                );
            });
        }

        return (
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.header]}>{gameName}</Text>
                    <TouchableOpacity style={{ marginLeft: 10, marginTop: 5 }}
                        onPress={() => {
                        console.log(this.props.match.params.gameId);
                        let setupPath = `/home/gameSetup/${this.props.match.params.gameId}`;
                        console.log(setupPath);
                        this.props.history.push(setupPath);
                    }}>
                        <Icon name="wrench" size={20} color={pallette.darkgray} />
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 10, marginBottom: 30 }}>{template + ', ' + this.props.match.params.gameId}</Text>
                <View style={{ minWidth: 300, marginBottom: 50}}>
                    {varList}
                </View>
                <View style={{ flexDirection: 'row', minWidth: 300, marginBottom: 50}}>
                    {actionList}
                </View>
            </View>
        );
    };
}

export default compose(
    firestoreConnect(['templates', 'games']),
    connect((state, props) => ({
        firebase: state.firebase,
        templates: state.firestore.ordered.templates,
        games: state.firestore.ordered.games,
    }))
)(GameSetup);
