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
            this.props.games.filter((g) => {
                return (g.variables['gameName']);
            }).map((g, index) => {
                let templateName = this.props.templates.find((t) => {
                    return t.id === g.template;
                }).name;
                gameRows.push((
                    <TouchableOpacity key={index} onPress={() => {
                        // TODO: Either wrap Discover in a nested 'navigation router' (see Create.js), or
                        //this.props.history.push('/game/' + this.props.match.params.gameId);
                        this.props.history.push(`/home/game/` + g.id);
                    }}>
                        <Text style={[{padding: 10, fontSize: 20},
                            (index % 2) ? {backgroundColor: pallette.lightergray} : {backgroundColor: pallette.lightgray},
                            (index === this.props.games.length - 1) ? {borderBottomLeftRadius: 10, borderBottomRightRadius: 10} : {},
                            (index === 0) ? {borderTopLeftRadius: 10, borderTopRightRadius: 10} : {},
                        ]}>{g.variables[Object.keys(g.variables).find((k) => {
                            return (k === 'gameName');
                        })] + '\n'}
                            <Text style={{fontSize: 10}}>{templateName}</Text>
                        </Text>
                    </TouchableOpacity>
                ));
            })
        }

        //console.log(gameRows);
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
