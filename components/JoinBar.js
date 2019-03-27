import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';
import { compose } from 'redux';
import { withRouter } from 'react-router-native';
import { withFirestore } from 'react-redux-firebase';
import { pallette } from '../styles';

const localStyles = StyleSheet.create({
    codeTextForm: {
        flexDirection: 'row',
        backgroundColor: pallette.white,
        height: 50,
    },
    codeText: {
        minWidth: 200,
        flex: 1,
        borderColor: pallette.gray,
        borderWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        paddingLeft: 20,
    },
    codeTextButton: {
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pallette.crimson,
    },
    codeTextJoin: {
        fontSize: 16,
        fontWeight: 'bold',
        color: pallette.white,
    },
});

class JoinBar extends Component {
    state = {
        text: '',
    };

    processTag = () =>
        this.props.firestore
            .collection('games')
            .where('tag', '==', this.state.text)
            .limit(1)
            .get()
            .then(query =>
                query.forEach(game =>
                    this.props.history.push(`/game/${game.id}`)
                )
            );

    render() {
        return (
            <KeyboardAvoidingView behavior="position">
                <View style={localStyles.codeTextForm}>
                    <TextInput
                        autoCapitalize="none"
                        onChangeText={text =>
                            this.setState({ text: text.toUpperCase() })
                        }
                        style={localStyles.codeText}
                        value={this.state.text}
                        placeholder="Enter Game ID"
                        placeholderTextColor={pallette.gray}
                    />
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={localStyles.codeTextButton}
                        onPress={this.processTag}
                    >
                        <Text style={localStyles.codeTextJoin}>Join</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default compose(
    withFirestore,
    withRouter
)(JoinBar);
