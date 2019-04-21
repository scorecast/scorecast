import React, { Component } from 'react';
import { Font, AppLoading, Notifications } from 'expo';
import { Provider } from 'react-redux';
import Store from './config/store';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

import Root from './components/Root';
import registerForPushNotificationsAsync from "./config/pushNotifications";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            notification: {},
        };
    }

    async loadApp() {
        await Font.loadAsync({
            'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        });

        this.setState({ isReady: true });
    }

    componentDidMount() {
        this.loadApp();
        registerForPushNotificationsAsync();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
        this.setState({notification: notification});
    };

    render() {
        return this.state.isReady ? (
            <Provider store={Store}>
                <Root />
            </Provider>
        ) : (
            <AppLoading />
        );
    }
}
