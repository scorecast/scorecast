import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import TopBar from '../TopBar/Bar';

import { pallette, styles } from '../../styles';

class GameSetup extends Component {
    state = this.props.logic.variables.reduce((acc, cur) => {
        acc[cur.name] = cur.type === 'Int' ? 0 : ''; //default is String
        return acc;
    }, {});

    startGame = () => {
        const { auth, match, firestore, history } = this.props;

        const game = {
            admin: auth.uid,
            variables: this.state,
            template: match.params.templateId,
        };

        firestore.add({ collection: 'games' }, game).then(ref => {
            const gamePath = '/home/game/' + ref.id;
            console.log(`Game started: ${gamePath}`);
            history.push(gamePath);
        });
    };

    render() {
        console.log(this.state);
        const { template, logic } = this.props;

        // TODO: add form validation for types
        // TODO: add readable name to vars (maybe just setup vars)
        const setupList = logic.setup.map((setupVar, index) => (
            <View key={index} style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={{ fontSize: 20 }}>{setupVar.name + ': '}</Text>
                <TextInput
                    style={{
                        borderRadius: 10,
                        backgroundColor: pallette.lightgray,
                        flex: 1,
                        padding: 10,
                    }}
                    value={this.state[setupVar.name]}
                    onChangeText={text =>
                        this.setState({ [setupVar.name]: text })
                    }
                />
            </View>
        ));

        return (
            <>
                <TopBar
                    left={{ linkTo: '/create', iconName: 'arrow-left' }}
                    logoLeft="Setup"
                    logoRight="Game"
                />
                <KeyboardAwareScrollView
                    style={{ backgroundColor: 'white' }}
                    contentContainerStyle={styles.content}
                >
                    <Text style={[styles.header, { padding: 20 }]}>
                        {template.name}
                    </Text>
                    <View style={{ minWidth: 300 }}>{setupList}</View>
                    <TouchableOpacity
                        style={{ margin: 20 }}
                        onPress={this.startGame}
                    >
                        <Text
                            style={{
                                backgroundColor: pallette.darkgray,
                                color: pallette.white,
                                borderRadius: 20,
                                padding: 20,
                                fontSize: 20,
                            }}
                        >
                            Start Game!
                        </Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </>
        );
    }
}

const mapStateToProps = ({ firestore: { data }, firebase }, { match }) => {
    const template = data.templates && data.templates[match.params.templateId];
    return {
        template,
        auth: firebase.auth,
        logic: JSON.parse(template.logic),
    };
};

// not connected to Firestore because new data isn't needed
export default compose(
    withFirestore,
    connect(mapStateToProps)
)(GameSetup);
