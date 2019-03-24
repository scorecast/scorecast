import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import { styles, pallette } from '../styles';
import {compose} from "redux";
import {firestoreConnect, withFirestore} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";

class Discover extends React.Component {
    render () {
        let availableGames = this.props.games ? this.props.games.filter((g) => { return (g.variables['gameName']); })
            : [];

        const renderGameItem = ({ item, index }) => (
            <TouchableOpacity key={index} onPress={() => {
                // TODO: Either wrap Discover in a nested 'navigation router' (see Create.js), or
                //this.props.history.push('/game/' + this.props.match.params.gameId);
                this.props.history.push(`/home/game/` + item.id);
            }}>
                <Text style={[{padding: 10, fontSize: 20},
                    (index % 2) ? {backgroundColor: pallette.lightergray} : {backgroundColor: pallette.lightgray},
                    (index === availableGames.length - 1) ? {borderBottomLeftRadius: 10, borderBottomRightRadius: 10} : {},
                    (index === 0) ? {borderTopLeftRadius: 10, borderTopRightRadius: 10} : {},
                ]}>{item.variables[Object.keys(item.variables).find((k) => {
                    return (k === 'gameName');
                })] + '\n'}
                    <Text style={{fontSize: 10}}>{ this.props.templates.find((t) => { return t.id === item.template }).name }</Text>
                </Text>
            </TouchableOpacity>
        );

        // I apologize for jank empty regions
        return (
            <View>
                <View style={styles.space20}/>
                <FlatList
                    style={styles.listView}
                    data={availableGames}
                    renderItem={renderGameItem}
                    keyExtractor={game => game.id}
                />
                <View style={styles.space20}/>
            </View>
        );
    }
}

// class Discover extends React.Component {
//     render() {
//         let gameRows = [];
//         if (this.props.games) {
//             let availableGames = this.props.games.filter((g) => {
//                 return (g.variables['gameName']);
//             })
//             availableGames.map((g, index) => {
//                 let templateName = this.props.templates.find((t) => {
//                     return t.id === g.template;
//                 }).name;
//                 gameRows.push((
                    
//                 ));
//             })
//         }

//         //console.log(gameRows);
//         return (
//             <View style={styles.content}>
//                 <Text style={[styles.header, { marginBottom: 50 }]}>Discover</Text>
//                 <View style={styles.listView}>
//                     {gameRows}
//                 </View>
//             </View>
//         );
//     }
// };

const mapStateToProps = state => ({
    firebase: state.firebase,
    templates: state.firestore.ordered.templates,
    games: state.firestore.ordered.games,
});

export default compose(
    withFirestore,
    firestoreConnect(['templates', 'games']),
    connect(mapStateToProps)
)(Discover);
