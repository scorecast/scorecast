import React from 'react';
import { Switch, Route } from 'react-router-native';

import GameView from './GameView';
import EditGame from './Game/Edit';

const Game = ({ match }) => {
    return (
        <>
            <Switch>
                <Route
                    exact
                    path={`${match.url}/:gameId`}
                    component={GameView}
                />
                <Route
                    path={`${match.url}/:gameId/edit`}
                    component={EditGame}
                />
            </Switch>
        </>
    );
};

export default Game;
