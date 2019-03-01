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
import GameSetup from './Create/GameSetup';
import Game from './Game';

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
                <View style={styles.content}>
                    <SelectTemplate style={[styles.content, {backgroundColor: pallette.lightgreen}]}
                        history={this.props.history}/>
                </View>
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
