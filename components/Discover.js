import React from 'react';
import {View, ListView, Text, TouchableOpacity} from 'react-native';
import { styles, pallette } from '../styles';
import {compose} from "redux";
import {firestoreConnect, withFirestore} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";

class Discover extends React.Component {
    render() {
        let gameRows = [];
        if (this.props.games) {
            this.props.games.map((g, index) => {
                gameRows.push((
                    <TouchableOpacity key={index}>
                        <Text style={[{padding: 10, fontSize: 20},
                            (index % 2) ? {backgroundColor: pallette.lightergray} : {backgroundColor: pallette.lightgray},
                            (index === this.props.templates.length - 1) ? {borderBottomLeftRadius: 10, borderBottomRightRadius: 10} : {},
                            (index === 0) ? {borderTopLeftRadius: 10, borderTopRightRadius: 10} : {},
                        ]}>{g.variables.find((v) => {
                            return (v.name === 'gameName');
                        }).value + '\n'}
                            <Text style={{fontSize: 10}}>{g.template}</Text>
                        </Text>
                    </TouchableOpacity>
                ))
            })
        }

        return (
            <View style={styles.content}>
                <Text style={[styles.header, { marginBottom: 50 }]}>Discover</Text>
                <View style={styles.listView}>
                    {gameRows}
                </View>
            </View>
        );
    }
};

export default compose(
    withFirestore,
    firestoreConnect(['templates', 'games']),
    connect((state, props) => ({
        firebase: state.firebase,
        templates: state.firestore.ordered.templates,
        games: state.firestore.ordered.games,
    }))
)(Discover);
