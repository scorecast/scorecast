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

import { logic } from '../die';

class GameSetup extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props.match.params.gameId);
    }

    componentDidMount() {
        //TODO: Figure out event listeners so that multiple people can update
        //this.props.firestore.setListener({ collection: 'games', doc: this.props.match.params.gameId });
    }

    render() {
        let setupList = logic.setup.map((setupVar, index) => {
            let type = logic.variables.filter((v) => {
                return (v.name === setupVar.name) ? v.type : '';
            })[0];
            let defaultValue = (type === 'Int') ? 0 : '';   //default is String

            return (
                <View key={index} style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: 20 }}>{setupVar.name + ': '}</Text>
                    <TextInput style={{ borderRadius: 10, backgroundColor: pallette.lightgray, flex: 1, padding: 10}}
                               defaultValue={defaultValue}
                               onChangeText={(text) => {
                                   this.props.firestore.collection('games')
                                       .doc('' + this.props.match.params.gameId).update({
                                       [`variables.${setupVar.name}`]: text
                                   }).catch(console.error);
                               }}/>
                </View>
            );
        });

        return (
            <View style={styles.content}>
                <Text style={[styles.header, { marginBottom: 50 }]}>Game</Text>
            </View>
        );
    };
}

export default compose(
    firestoreConnect(['templates', 'games']),
    connect((state, props) => ({
        firebase: state.firebase,
        templates: state.firestore.ordered.templates,
    }))
)(GameSetup);
