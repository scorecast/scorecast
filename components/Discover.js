import React from 'react';
import {View, ListView, Text, TouchableOpacity} from 'react-native';
import { styles, pallette } from '../styles';
import {compose} from "redux";
import {firestoreConnect, withFirestore} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";

class Discover extends React.Component {
    render() {
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        }).cloneWithRows(this.props.games || []);

        // console.log(`Type of games: ${typeof (this.props.games)}`);
        // console.log(`Type of []: ${typeof ([])}`);
        // console.log(`Games: ${this.props.games || []}`);
        return (
            <View style={styles.content}>
                <Text style={styles.header}>Discover</Text>
                <ListView dataSource={dataSource}
                          style={[{flexDirection: 'row', padding: 10, overflow: 'hidden'}]}
                          contentContainerStyle={{flex: 0}}
                          enableEmptySections={true}
                          renderRow={(game, sectionId, rowId) => {
                              //console.log(rowId);
                              return (
                                  <TouchableOpacity style={[styles.listViewRow,
                                      (rowId % 2) ? {} : {backgroundColor: pallette.lightergray},
                                      (rowId == 0) ? {borderTopLeftRadius: 10, borderTopRightRadius: 10} : {},
                                      {width: 200}]}>
                                      <Text style={styles.listViewRowText}>{
                                          (JSON.stringify(game.variables) !== 'undefined') ?
                                              JSON.parse(JSON.stringify(game.variables)).find((v) => {
                                                  return v.name === 'gameName';
                                              }).value :
                                              ''
                                      }</Text>
                                      <Text style={{fontSize: 10}}>{game.template}</Text>
                                  </TouchableOpacity>)
                          }}/>
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
