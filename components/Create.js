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
import SelectTemplate from './Create/SelectTemplate';

export default class Join extends Component {
    render() {
        return (
            <NativeRouter
                initialIndex={0}
                initialEntries={['/selectTemplate', '/gameSetup']}>
                <View>
                    <Route path="/selectTemplate" component={SelectTemplate}/>
                    <Route path="/gameSetup" render={() => (<Text>Game Setup</Text>)}/>
                </View>
            </NativeRouter>);
    }
}

const localStyles = StyleSheet.create({
});
