import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, Share, ImageBackground } from 'react-native';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import TopBar from './TopBar/Bar';

import { Operation } from '../config/gameAction';
import { createTag } from '../config/functions';

import { pallette, styles } from '../styles';
import Button from "./TopBar/Button";
import VariableElement from "./Game/VariableElement";
import EditElement from "./Game/EditElement";
//import ButtonElement from "./Game/ButtonElement";
import LinkElement from "./Game/LinkElement";
import ButtonElement from "./Game/ButtonElement";

class GameView2 extends Component {
    constructor(props) {
        super(props);
        /*this.state = {
            //currentView: -1,
        };*/

      const { game, template, auth, match } = this.props;
      const isAdmin = auth.uid === game.admin;
      const viewLogic = JSON.parse(template.view);

      let currentView = (game.variables['win'] !== 0) ? viewLogic.over :
        (isAdmin ? viewLogic.adminDefault : viewLogic['default']);
      this.state = {
        currentView: currentView,
      };
    }

    componentDidMount() {

    }

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

    renderElements() {
      const { game, template, auth, match } = this.props;
      if (!game) return [];

      const isAdmin = auth.uid === game.admin;

      const logic = JSON.parse(template.logic);
      const viewLogic = JSON.parse(template.view);

      if (typeof this.state.currentView === 'undefined') {
        return ([]);
      }

      //Check win condition
      let isWon = game.variables['win'] !== 0;
      let winText = game.variables['winString'];

      let view = viewLogic.views[this.state.currentView];

      let elements = view.elements.map((e, index) => {
        //console.warn(`Rendering ${e.ref}`);
        if (e.target) {
          return (
            <LinkElement
              onPress={() => {
                this.setState({
                  currentView: e.target
                });
              }}
              label={e.target}
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
            let editCallback = isInt ? (e) => {
              this.props.firestore
                .collection('games')
                .doc('' + match.params.gameId)
                .update({
                  [`variables.${varName}`]: parseInt(e.nativeEvent.text),
                })
                .catch(console.error);
            } : (e) => {
              this.props.firestore
                .collection('games')
                .doc('' + match.params.gameId)
                .update({
                  [`variables.${varName}`]: e.nativeEvent.text,
                })
                .catch(console.error);
            };
            editCallback.bind(this);
            return (
              <EditElement
                key={index}
                e={e}
                varName={game.variables[varName]}
                isAdmin={isAdmin}
                editCallback={editCallback}
              />
            );
          } else {
            let goToSetup = () => {
              console.log(this.props.match.params.gameId);
              let setupPath = `${match.url}/edit`;
              //console.log(setupPath);
              this.history.push(setupPath);
            };
            goToSetup.bind(this);

            return (
              <VariableElement
                key={index}
                e={e}
                varName={game.variables[varName]}
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
                .then(values => {
                })
                .catch(console.error);
            };
            buttonPress.bind(this);

            return (
              <ButtonElement
                key={index}
                e={e}
                onPress={buttonPress}
                label={action.label || action.name}
              />);
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
            <>
                <TopBar
                    left={{ linkTo: '/home', iconName: 'times' }}
                    right={{ iconName: 'share-alt', onPress: this.shareGameTag }}
                    logoLeft="Live"
                    logoRight="Score"
                />
                <View
                    style={[
                        {
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: view.backgroundColor,
                        },
                    ]}
                >
                  <ImageBackground style={{
                                   flex: 1,
                                     flexDirection: 'row'
                                   }}
                                   imageStyle={{
                                     resizeMode: 'stretch',
                                     opacity: 0.25
                                   }}
                                   source={{
                                     uri: view.backgroundSrc,
                                   }}>
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
)(GameView2);
