import {styles} from "../../styles";
import {ListView, Text, TouchableOpacity, View} from "react-native";
import React, { Component } from "react";
import { firebase } from "../../config/store";

class SelectTemplate extends Component {
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
            .catch(function (error) {
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
                          style={{flex: 1}}
                          enableEmptySections={true}
                          renderRow={(template) => (
                              <TouchableOpacity onPress={() => {
                                  this.props.history.push('/gameSetup/' + template.get('name'));
                              }}>

                                  <Text>{template.get('name')}</Text>

                              </TouchableOpacity>)}/>
            </View>
        );
    };
}

export default SelectTemplate;
