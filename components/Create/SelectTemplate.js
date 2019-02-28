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
        let templateRows = [];
        //let lastRow = this.props.templates.length;
        if (this.props.templates) {
            this.props.templates.map((t, index) => {
                console.log(t.name);

                templateRows.push((
                    <TouchableOpacity key={index}>
                        <Text style={[{padding: 10, fontSize: 20},
                            (index % 2) ? {backgroundColor: pallette.lightergray} : {backgroundColor: pallette.lightgray},
                            (index === this.props.templates.length - 1) ? {borderBottomLeftRadius: 10, borderBottomRightRadius: 10} : {},
                            (index === 0) ? {borderTopLeftRadius: 10, borderTopRightRadius: 10} : {},
                        ]}>{t.name}</Text>
                    </TouchableOpacity>
                ))
            })
        }

        return (
            <View style={styles.content}>
                <Text style={[styles.header, { marginBottom: 50 }]}>Create</Text>
                <View style={styles.listView}>
                    {templateRows}
                </View>
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
