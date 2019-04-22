import React, { Component } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import TopBar from '../TopBar/Bar';
import GameForm from '../GameForm';

class GameSetup extends Component {
    startGame = state => {
        const { auth, match, firestore, history } = this.props;

        const game = {
            admin: auth.uid,
            variables: state,
            template: match.params.templateId,
            reposters: [],
        };

        firestore.add({ collection: 'games' }, game).then(ref => {
            const gamePath = '/game/' + ref.id;
            console.log(`Game started: ${gamePath}`);
            history.push(gamePath);
        });
    };

    render() {
        const { match, logic } = this.props;

        const defaultState = logic.variables.reduce((acc, cur) => {
            acc[cur.name] = cur.type === 'Int' ? 0 : ''; //default is String
            return acc;
        }, {});

        return (
            <>
                <TopBar
                    left={{ linkTo: '/create', iconName: 'arrow-left' }}
                    logoLeft="Setup"
                    logoRight="Game"
                />
                <GameForm
                    templateId={match.params.templateId}
                    defaultState={defaultState}
                    onSubmit={this.startGame}
                    submitText="Start Game"
                />
            </>
        );
    }
}

const mapStateToProps = ({ firestore: { data }, firebase }, { match }) => {
    const template = data.templates && data.templates[match.params.templateId];
    const logic = template && JSON.parse(template.logic);
    return {
        auth: firebase.auth,
        logic,
    };
};

// not connected to Firestore because new data isn't needed
export default compose(
    withFirestore,
    connect(mapStateToProps)
)(GameSetup);
