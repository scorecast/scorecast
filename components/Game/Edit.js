import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import GameForm from '../GameForm';
import TopBar from '../TopBar/Bar';

const Edit = ({ game, firestore, history, match }) => {
    const onSubmit = state => {
        firestore
            .update(
                { collection: 'games', doc: match.params.gameId },
                { variables: state }
            )
            .then(() => {
                console.log(`Game updated`);
                history.goBack();
            });
    };

    return (
        <>
            <TopBar
                left={{ goBack: true, iconName: 'times' }}
                logoLeft="Edit"
                logoRight="Game"
            />
            <GameForm
                templateId={game.template}
                defaultState={game.variables}
                onSubmit={onSubmit}
                submitText="Edit Game"
            />
        </>
    );
};

const mapStateToProps = ({ firestore: { data } }, { match }) => ({
    game: data.games && data.games[match.params.gameId],
});

// not connected to Firestore because new data isn't needed
export default compose(
    withFirestore,
    connect(mapStateToProps)
)(Edit);
