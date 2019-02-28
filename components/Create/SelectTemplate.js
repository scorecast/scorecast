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

        let templateRows = [];
        //let lastRow = this.props.templates.length;
        if (this.props.templates) {
            this.props.templates.map((t, index) => {
                templateRows.push((
                    <View>
                        <Text style={[styles.listViewRowText,
                            (index % 2) ? {} : {backgroundColor: pallette.lightergray},
                            (index === this.props.templates.length) ? {borderBottomLeftRadius: 10, borderBottomRightRadius: 10} : {},
                            (index === 0) ? {borderTopLeftRadius: 10, borderTopRightRadius: 10} : {},
                        ]}>{t.name}</Text>
                    </View>
                ))
            })
        }

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
                                                    style={[styles.listViewRow,
                                                        (rowId % 2) ? {} : {backgroundColor: pallette.lightergray},
                                                        //(rowId == lastRow) ? {borderBottomLeftRadius: 10, borderBottomRightRadius: 10} : {},
                                                        (rowId === 0) ? {borderTopLeftRadius: 10, borderTopRightRadius: 10} : {},
                                                        {width: 200}]}>
                                      <Text style={styles.listViewRowText}>{template.name}</Text>
                                  </TouchableOpacity>)
                          }}/>
                {templateRows}
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
