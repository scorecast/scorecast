import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Share } from 'react-native';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import TopBar from './TopBar/Bar';

import { Operation } from '../config/gameAction';
import { createTag } from '../config/functions';

import { pallette, styles } from '../styles';

class GameView extends Component {
    shareGameTag = () => {
        this.getTag(this.props).then(tag => Share.share({ message: "Welcome to ScoreCast. Here is your game id: " + tag }));
    };

    async getTag({ firestore, game, match }) {
        if (game.tag) return game.tag;

        let tag;
        let query;
        do {
            tag = createTag();
            query = await firestore
                .collection('games')
                .where('tag', '==', tag)
                .get();
        } while (query.size > 0);

        firestore.update(
            { collection: 'games', doc: match.params.gameId },
            { tag }
        );

        return tag;
    }

    render() {
        const { game, template, auth, match } = this.props;
        if (!game) return null;

        const isAdmin = auth.uid === game.admin;

        const logic = JSON.parse(template.logic);
        const view = JSON.parse(template.view);

        //Update composite variables
        logic.variables.map(v => {
            if (v.value) {
                let val = new Operation(v.value).evaluate(game.variables);
                game.variables[v.name] = val;

                //Now Update the store
                this.props.firestore
                    .collection('games')
                    .doc('' + match.params.gameId)
                    .update({
                        [`variables.${v.name}`]: val,
                    })
                    .catch(console.error);
                ``;
            }
        });

        //Check win condition
        let isWon = game.variables['win'] !== 0;
        let winText = game.variables['winString'];
        //console.warn(winText);

        let elements = view.elements.map((e, index) => {
            let varName = Object.keys(game.variables).find(varName => {
                return varName === e.ref;
            });

            if (varName) {
                return (
                    <View
                        style={{
                            position: 'absolute',
                            top: e.py,
                            left: e.px,
                            width: e.w,
                        }}
                        key={index}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                left: -(e.w / 2),
                                width: e.w,
                                flexDirection: 'row',
                                textAlign: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    fontSize: e.size,
                                }}
                            >
                                {game.variables[varName]}
                            </Text>
                            {//Display the setup icon if user is admin
                            isAdmin && varName === 'gameName' ? (
                                <TouchableOpacity
                                    style={{ marginLeft: 10, marginTop: 5 }}
                                    onPress={() => {
                                        console.log(match.params.gameId);
                                        let setupPath = `${match.url}/edit`;
                                        //console.log(setupPath);
                                        this.props.history.push(setupPath);
                                    }}
                                >
                                    <Icon
                                        name="wrench"
                                        size={20}
                                        color={pallette.darkgray}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <></>
                            )}
                        </View>
                    </View>
                );
            } else if (logic) {
                let action = logic.actions.find(a => {
                    return a.name === e.ref;
                });

                if (action) {
                    return (
                        <View
                            style={{
                                position: 'absolute',
                                top: e.py,
                                left: e.px,
                                width: e.w,
                            }}
                            key={index}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    left: -(e.w / 2),
                                    width: e.w,
                                    flexDirection: 'row',
                                    textAlign: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    style={{ marginLeft: 10, marginTop: 5 }}
                                    onPress={() => {
                                        //Store result of gameAction in variables
                                        let updatePromises = Promise.all(
                                            action.variables.map(
                                                (varName, index) => {
                                                    let val = new Operation(
                                                        action.values[index]
                                                    ).evaluate(game.variables);
                                                    game.variables[
                                                        varName
                                                    ] = val;

                                                    //Now Update the store
                                                    return this.props.firestore
                                                        .collection('games')
                                                        .doc(
                                                            '' +
                                                                match.params
                                                                    .gameId
                                                        )
                                                        .update({
                                                            [`variables.${varName}`]: val,
                                                        });
                                                }
                                            )
                                        )
                                            .then(values => {})
                                            .catch(console.error);
                                    }}
                                >
                                    <Text
                                        style={[
                                            {
                                                flex: 1,
                                                textAlign: 'center',
                                                fontSize: e.size,
                                            },
                                            {
                                                backgroundColor:
                                                    pallette.darkgray,
                                                color: pallette.white,
                                                borderRadius: 10,
                                                padding: 10,
                                                fontSize: e.size,
                                            },
                                        ]}
                                    >
                                        {action.label || action.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }
            }
        });

        return (
            <>
                <TopBar
                    left={{ linkTo: '/home', iconName: 'times' }}
                    right={{ iconName: 'share', onPress: this.shareGameTag }}
                    logoLeft="Live"
                    logoRight="Score"
                />
                <View
                    style={[
                        {
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: '#ffccdd',
                        },
                    ]}
                >
                    {isWon ? (
                        <View
                            style={[
                                styles.content,
                                { backgroundColor: view.backgroundColor },
                            ]}
                        >
                            <Text style={styles.header}>{winText}</Text>
                        </View>
                    ) : (
                        <View
                            style={[
                                {
                                    flex: 1,
                                    flexDirection: 'column',
                                    backgroundColor: view.backgroundColor,
                                },
                            ]}
                        >
                            {elements}
                        </View>
                    )}
                </View>
            </>
        );
    }
}

const mapStateToProps = ({ firestore: { data }, firebase }, { match }) => {
    const game = data.games && data.games[match.params.gameId];
    const template = game && data.templates && data.templates[game.template];
    return {
        auth: firebase.auth,
        game,
        template,
    };
};

export default compose(
    firestoreConnect(['templates', 'games']),
    connect(mapStateToProps)
)(GameView);
