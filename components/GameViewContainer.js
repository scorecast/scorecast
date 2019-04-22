import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

import TopBar from './TopBar/Bar';

import GameView1 from './GameView';
import GameView2 from './GameView2';

import ShareDialog from './ShareDialog';
import { createTag } from '../config/functions';

class GameViewContainer extends Component {
    state = { dialogVisible: false };

    showDialog = () => {
        if (!this.props.game.tag) this.getTag();
        this.setState({ dialogVisible: true });
    };

    getTag = async () => {
        const { firestore, match, game } = this.props;
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
    };

    render() {
        const { game, template, match } = this.props;

        return (
            <>
                <ShareDialog
                    tag={game && game.tag}
                    gameId={match.params.gameId}
                    visible={this.state.dialogVisible}
                    onDismiss={() => this.setState({ dialogVisible: false })}
                />
                <TopBar
                    left={{ linkTo: '/home', iconName: 'times' }}
                    right={{ iconName: 'share-alt', onPress: this.showDialog }}
                    logoLeft="Live"
                    logoRight="Score"
                />
                {template &&
                    (() => {
                        switch (template.version) {
                            case 0.2:
                                return <GameView2 {...this.props} />;
                            default:
                                return <GameView1 {...this.props} />;
                        }
                    })()}
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
)(GameViewContainer);
