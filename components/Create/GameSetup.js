import {pallette, styles} from "../../styles";
import {
    ListView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";
import React, { Component } from "react";

import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";

import { logic } from '../../die';

class GameSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: 0,
            setup: {},
        };
    }

    componentDidMount() {
        logic.setup.map((setupVar, index) => {
            let type = logic.variables.filter((v) => {
                return v.name == setupVar.name;
            })[0];
            let defaultValue = (type === 'Int') ? 0 : '';

            this.updateSetup(setupVar.name, defaultValue);
        });
    }

    updateSetup(name, val) {
        let newSetup = this.state.setup;
        newSetup[name] = val;
        this.setState({setup: newSetup});
        console.log(newSetup);
    }

    createGame() {
        let variables = logic.variables.map((v) => {
            if (Object.keys(this.state.setup).includes(v.name)) {
                return {
                    name: v.name,
                    value: this.state.setup[v.name]
                }
            } else {
                let defaultValue = (v.type === 'Int') ? 0 : '';
                return {
                    name: v.name,
                    value: defaultValue
                }
            }
        });
        let game = {
            name: logic.name,
            admin: this.props.firebase.auth.uid,
            variables,
            template: this.props.template
        };

        return this.props.firestore.add({
            collection: 'games'
        },game);
    }

    render() {
        let setupList = logic.setup.map((setupVar, index) => {
            let type = logic.variables.filter((v) => {
                return (v.name == setupVar.name) ? v.type : '';
            })[0];
            let defaultValue = (type === 'Int') ? 0 : '';   //default is String

            return (
                <View key={index}>
                    <Text>{setupVar.name}</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: pallette.gray}}
                        defaultValue={defaultValue}
                        onChangeText={(text) => {
                            this.updateSetup(setupVar.name, text);
                        }}/>
                </View>
            );
        });

        return (
            <View style={styles.content}>
                <Text>Game Setup: {this.props.template}</Text>
                {setupList}
                <TouchableOpacity onPress={() => {
                    this.createGame();
                    this.props.history.push('/game/' + this.state.gameId);
                }}>
                    <Text style={{backgroundColor: pallette.darkgray, color: pallette.white}}>Submit</Text>
                </TouchableOpacity>
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
