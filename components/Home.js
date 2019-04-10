import React from 'react';

import TopBar from './TopBar/Bar';
import Discover from './Discover';
import JoinBar from './JoinBar';

const Home = props => (
    <>
        <TopBar
            left={{ linkTo: '/me', iconName: 'user' }}
            right={{ linkTo: '/create', iconName: 'plus' }}
            logoLeft="Score"
            logoRight="Cast"
        />
        <Discover />
        <JoinBar />
    </>
);

export default Home;
