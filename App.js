import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import Store from './config/store';

import Home from './components/Home';

export default class App extends Component {
    state = {
        isReady: false,
        routerHistory: {},
        templates: []
    }

    async componentDidMount() {
        await Font.loadAsync({
            'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        });

        this.setState({ isReady: true });

        // await firebase
        //     .firestore()
        //     .collection('templates')
        //     .get()
        //     .then(templates => {
        //         templates.forEach(template => {
        //             this.setState({
        //                 templates: [...this.state.templates, template],
        //             });
        //         });
        //     })
        //     .catch(function(error) {
        //         console.log('Error getting document:', error);
        //     });
    }

    render() {
        return this.state.isReady ? (
            <Provider store={Store}>
                <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                    <Home />
                </View>
            </Provider>
        ) : (
            <AppLoading />
        );
    }
}
