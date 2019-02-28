import {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableOpacity
} from "react-native";
import React from "react";

import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeRouter, Route, Link } from 'react-router-native';
import { firebase } from '../config/store';

import {styles, pallette} from '../styles';

export default class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            templates: [],
        };
    }

    componentDidMount() {
        firebase
            .firestore()
            .collection('templates')
            .get()
            .then(templates => {
                templates.forEach(template => {
                    this.setState({
                        templates: [...this.state.templates, template],
                    });
                });
            })
            .catch(function(error) {
                console.log('Error getting document:', error);
            });
    }

    render() {
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        }).cloneWithRows(this.state.templates);

        var options =["Home","Savings","Car","GirlFriend"];

        return (
            <View style={styles.content}>
                <Text style={styles.header}>Create</Text>
                <ListView dataSource={dataSource}
                          style={{ flex: 1 }}
                          enableEmptySections={true}
                          renderRow={(template) => (
                              <Link to="/discover">

                                      <Text>{template.get('name')}</Text>

                              </Link>)}/>
            </View>);
    }
}

const localStyles = StyleSheet.create({
});
