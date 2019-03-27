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
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-native';
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

    render() {
        return (
            <KeyboardAvoidingView behavior="position">
                <View style={localStyles.codeTextForm}>
                    <TextInput
                        onChangeText={text => this.setState({ text })}
                        style={localStyles.codeText}
                        value={this.state.text}
                        placeholder="Enter Game ID"
                        placeholderTextColor={pallette.gray}
                    />
                    <Link
                        activeOpacity={0.5}
                        to={this.props.tags[this.state.text]}
                        style={localStyles.codeTextButton}
                        component={TouchableOpacity}
                    >
                        <Text style={localStyles.codeTextJoin}>Join</Text>
                    </Link>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => ({
    tags: state.firestore.data.tags || {},
});

export default compose(
    firestoreConnect(['tags']),
    connect(mapStateToProps)
)(JoinBar);
