import React from 'react';

import { Route } from 'react-router-native';

import SelectTemplate from './Create/SelectTemplate';
import GameSetup from './Create/GameSetup';

const Create = ({ match }) => (
    <>
        <Route exact path={`${match.url}`} component={SelectTemplate} />

        <Route path={`${match.url}/:gameId`} component={GameSetup} />

        {/* for future refactor */}
        {/* <Route path={`${match.url}/:templateId`} component={GameSetup} /> */}
    </>
);

export default Create;
