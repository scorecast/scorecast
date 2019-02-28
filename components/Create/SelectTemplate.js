import {pallette, styles} from "../../styles";
import {ListView, Text, TouchableOpacity, View} from "react-native";
import React, { Component } from "react";

import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';


class SelectTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            templates: [],
        };
    }

    componentDidMount() {
    }

    render() {
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        }).cloneWithRows(this.props.templates || []);

        var options =["Home","Savings","Car","GirlFriend"];

        return (
            <View style={[styles.content, {justifyContent: 'center', alignItems: 'center'}]}>
                <Text style={[styles.header, { marginBottom: 50 }]}>Create</Text>
                <ListView dataSource={dataSource}
                          style={[{flexDirection: 'row', padding: 10, overflow: 'hidden'}]}
                          contentContainerStyle={{flex: 0}}
                          enableEmptySections={true}
                          renderRow={(template, sectionId, rowId) => {
                              //console.log(rowId);
                              return (
                                  <TouchableOpacity onPress={() => {
                                      this.props.onSelect(template.name);
                                      this.props.history.push('/gameSetup/' + template.name);
                                  }}
                                                    style={[styles.listViewRow, (rowId % 2) ? {} : {backgroundColor: pallette.lightergray},
                                                        {width: 200}]}>
                                      <Text style={styles.listViewRowText}>{template.name}</Text>
                                  </TouchableOpacity>)
                          }}/>
            </View>
        );
    };
}

export default compose(
    firestoreConnect(['templates']),
    connect((state, props) => ({
        templates: state.firestore.ordered.templates,
    }))
)(SelectTemplate);
