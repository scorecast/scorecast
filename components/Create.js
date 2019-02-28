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
import { firebase } from '../config/store';

import { firestoreConnect } from 'react-redux-firebase';

import { styles, pallette } from '../styles';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
        };
    }

    componentDidMount() {
        // firebase
        //     .firestore()
        //     .collection('templates')
        //     .get()
        //     .then(templates => {
        //         templates.forEach(template => {
        //             this.setState({
        //                 templates: [...this.state.templates, template],
        //             });
        //         });
        //     })
        //     .catch(function(error) {
        //         console.log('Error getting document:', error);
        //     });
    }

    render() {
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        }).cloneWithRows(this.props.templates || []);

        var options = ['Home', 'Savings', 'Car', 'GirlFriend'];

        return (
            <View style={styles.content}>
                <Text style={styles.header}>Create</Text>
                <ListView
                    dataSource={dataSource}
                    style={{ flex: 1 }}
                    enableEmptySections={true}
                    renderRow={template => (
                        <Link to="/discover">
                            <Text>{template.name}</Text>
                        </Link>
                    )}
                />
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
