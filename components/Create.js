import {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    ListView
} from "react-native";
import React from "react";

import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';

import {styles, pallette} from '../styles';

export default class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        var templateRows = this.props.rows.map((template) => {
            let name = template.get('name');
            return name;
        });
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        let dataSource = ds.cloneWithRows(templateRows);

        return (
            <View style={styles.content}>
                <Text style={styles.header}>Create</Text>
                <ListView dataSource={dataSource}
                renderRow={(template) => (<Text>{template+''}</Text>)}/>
            </View>);
    }
}

const localStyles = StyleSheet.create({
});
