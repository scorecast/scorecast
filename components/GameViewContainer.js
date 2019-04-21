import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Share, ImageBackground } from 'react-native';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import TopBar from './TopBar/Bar';
import GameView from './GameView';
import GameView2 from './GameView2';

import { Operation } from '../config/gameAction';
import { createTag } from '../config/functions';

import { pallette, styles } from '../styles';

class GameViewContainer extends Component {
    render() {
        const { game, template, auth, match } = this.props;
        if (!game) return null;

        if (template.version && template.version === 0.2) {
          return (
          <GameView2
            game={game}
            template={template}
            auth={auth}
            match={match}
          />
          );
        } else {
          console.log("GameView 0.1");
          return (
          <GameView
            game={game}
            template={template}
            auth={auth}
            match={match}
          />
          );
        }
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
)(GameViewContainer);
