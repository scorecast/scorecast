import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeRouter, Route, Link, BackButton } from 'react-router-native';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {styles, pallette} from '../styles';
import SelectTemplate from './Create/SelectTemplate';
import GameSetup from "./Create/GameSetup";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTemplate: '',
        };
    }

    selectTemplate(templateName) {
        this.setState({selectedTemplate: templateName});
    }

    render() {
        return (
            <NativeRouter
                initialIndex={0}
                initialEntries={['/selectTemplate', '/gameSetup']}
                style={styles.content}>
                <View style={styles.content}>
                    <Route path="/selectTemplate" render={(props) => (
                        <SelectTemplate style={[styles.content, {backgroundColor: pallette.lightgreen}]}
                            onSelect={this.selectTemplate.bind(this)}
                            history={props.history}/>
                    )}/>
                    <Route path="/gameSetup" render={(props) => (
                        <GameSetup style={styles.content}
                            template={this.state.selectedTemplate}
                            history={props.history}/>
                    )}/>
                    <BackButton/>
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
