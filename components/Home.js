import React from 'react';
import TopBar from './TopBar/Bar';
import Discover from './Discover';

const Home = props => (
    <>
        <TopBar
            left={{ linkTo: '/user', iconName: 'user' }}
            right={{ linkTo: '/create', iconName: 'plus' }}
            logoLeft="Score"
            logoRight="Cast"
        />
        <Discover />
    </>
);

export default Home;
