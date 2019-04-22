import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { withFirestore } from 'react-redux-firebase';

import { Operation } from '../config/gameAction';
import VariableElement from './Game/VariableElement';
import EditElement from './Game/EditElement';
import LinkElement from './Game/LinkElement';
import ButtonElement from './Game/ButtonElement';

class GameView2 extends Component {
    constructor(props) {
        super(props);

        const { game, template, auth, match } = this.props;
        const isAdmin = auth.uid === game.admin;
        const viewLogic = JSON.parse(template.view);

        let isWon = game.variables['win'] !== 0;
        let currentView = isWon
            ? viewLogic.over
            : isAdmin
            ? viewLogic.adminDefault
            : viewLogic['default'];
        this.state = {
            currentView: currentView,
            gameOver: isWon,
        };
    }

    componentDidMount() {}

    renderElements() {
        const { game, template, auth, match } = this.props;
        if (!game) return [];

        const isAdmin = auth.uid === game.admin;

        const logic = JSON.parse(template.logic);
        const viewLogic = JSON.parse(template.view);

        if (typeof this.state.currentView === 'undefined') {
            return [];
        }

        //Check win condition
        let isWon = game.variables['win'] !== 0;
        let winText = game.variables['winString'];

        let view = viewLogic.views[this.state.currentView];

        let elements = view.elements.map((e, index) => {
            //console.warn(`Rendering ${e}`);
            if (typeof e.target !== 'undefined') {
                return (
                    <LinkElement
                        onPress={() => {
                            this.setState({
                                currentView: e.target,
                            });
                        }}
                        label={e.label}
                        e={e}
                        key={index}
                    />
                );
            }
            let varName = Object.keys(game.variables).find(varName => {
                return varName === e.ref;
            });
            let editable = e.edit;
            let lvar = logic.variables.find(a => {
                return a.name === varName;
            });
            let isInt = lvar && lvar.type === 'Int';
            //console.warn("isInt: "+isInt);

            if (varName) {
                // console.warn(`Rendering ${varName}`);
                if (editable) {
                    let editCallback = isInt
                        ? e => {
                              this.props.firestore
                                  .collection('games')
                                  .doc('' + match.params.gameId)
                                  .update({
                                      [`variables.${varName}`]: parseInt(
                                          e.nativeEvent.text
                                      ),
                                  })
                                  .catch(console.error);
                          }
                        : e => {
                              this.props.firestore
                                  .collection('games')
                                  .doc('' + match.params.gameId)
                                  .update({
                                      [`variables.${varName}`]: e.nativeEvent
                                          .text,
                                  })
                                  .catch(console.error);
                          };
                    editCallback.bind(this);
                    return (
                        <EditElement
                            key={index}
                            e={e}
                            varName={varName}
                            value={game.variables[varName]}
                            isAdmin={isAdmin}
                            editCallback={editCallback}
                        />
                    );
                } else {
                    let goToSetup = () => {
                        console.log(this.props.match.params.gameId);
                        let setupPath = `${match.url}/edit`;
                        //console.log(setupPath);
                        this.props.history.push(setupPath);
                    };
                    goToSetup.bind(this);

                    return (
                        <VariableElement
                            key={index}
                            e={e}
                            varName={varName}
                            value={game.variables[varName]}
                            isAdmin={isAdmin}
                            goToSetup={goToSetup}
                        />
                    );
                }
            } else if (logic) {
                let action = logic.actions.find(a => {
                    return a.name === e.ref;
                });

                if (action) {
                    let buttonPress = () => {
                        //Store result of gameAction in variables
                        let updatePromises = Promise.all(
                            action.variables.map((varName, index) => {
                                let val = new Operation(
                                    action.values[index]
                                ).evaluate(game.variables);
                                game.variables[varName] = val;

                                //Now Update the store
                                return this.props.firestore
                                    .collection('games')
                                    .doc('' + match.params.gameId)
                                    .update({
                                        [`variables.${varName}`]: val,
                                    });
                            })
                        )
                            .then(values => {})
                            .catch(console.error);
                    };
                    buttonPress.bind(this);

                    return (
                        <ButtonElement
                            key={index}
                            e={e}
                            onPress={buttonPress}
                            label={action.label || action.name}
                        />
                    );
                }
            }
        });
        return elements;
    }

    render() {
        const { game, template, auth, match } = this.props;
        if (!game) return null;

        const isAdmin = auth.uid === game.admin;

        const logic = JSON.parse(template.logic);
        const viewLogic = JSON.parse(template.view);

        let view = viewLogic.views[this.state.currentView];
        //console.warn(this.state.currentView);

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
        if (isWon && !this.state.gameOver) {
            this.setState({
                currentView: viewLogic.over,
                gameOver: true,
            });
        }

        let elements = this.renderElements();

        return (
            <View
                style={[
                    {
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: view.backgroundColor,
                    },
                ]}
            >
                <ImageBackground
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                    imageStyle={{
                        resizeMode: 'stretch',
                        opacity: 0.25,
                    }}
                    source={{
                        uri: view.backgroundSrc,
                    }}
                >
                    <View
                        style={[
                            {
                                flex: 1,
                                flexDirection: 'column',
                            },
                        ]}
                    >
                        {elements}
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default withFirestore(GameView2);
