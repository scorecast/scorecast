import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeRouter, Route, Link } from 'react-router-native';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {styles, pallette} from '../styles';
import SelectTemplate from './Create/SelectTemplate';

class Create extends Component {
    render() {
        return (
            <NativeRouter
                initialIndex={0}
                initialEntries={['/selectTemplate', '/gameSetup']}>
                <View>
                    <Route path="/selectTemplate" component={SelectTemplate}/>
                    <Route path="/gameSetup" render={() => (<Text>Game Setup</Text>)}/>
                </View>
            </NativeRouter>
        );
    }
}

const localStyles = StyleSheet.create({});

export default compose(
    firestoreConnect(['templates']),
    connect((state, props) => ({
        templates: state.firestore.ordered.templates,
    }))
)(Create);
