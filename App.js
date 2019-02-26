import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight} from 'react-native';

import { NativeRouter, Route, Link} from 'react-router-native';

import { Font } from 'expo';
import OpenSansSemiBold from './assets/fonts/OpenSans-SemiBold.ttf';
import Icon from 'react-native-vector-icons/FontAwesome';


// TODO: refactor into separate components
const Create = () => <Text style={styles.header}>Create Game</Text>;

const Join = () => <Text style={styles.header}>Join Game</Text>;

const History = () => <Text style={styles.header}>History</Text>;

const Topic = ({ match }) => (
  <Text style={styles.topic}>{match.params.topicId}</Text>
);

const pallette = {
  white: "#ffffff",
  lightergray: "#f5f5f5",
  lightgray: "#f0f0f0",
  gray: "#b9b9b9",
  darkgray: "#707070",
  black: "#000000",
  crimson: "#ac0000",
  pink: "#ffe6e6",
  lightblue: "#83c2ff",
  green: "#88ff00",
  lightgreen: "#efffe6",
};

const AppView = () => (
  <NativeRouter>
    <SafeAreaView style={styles.container}>
      <View style={[styles.navbar]}>
          <TouchableHighlight>
              <Icon name="arrow-left" size={20} color={pallette.crimson}></Icon>
          </TouchableHighlight>
        <View style={styles.logo}>
            <Text style={styles.logoText}>Score</Text>
            <Text style={[styles.logoText, {color: pallette.crimson}]}>Cast</Text>
        </View>
        <TouchableHighlight>
            <Icon name="user" size={20} color={pallette.crimson}/>
        </TouchableHighlight>
      </View>
      <View style={styles.content}>
        <Route exact path="/" component={Create} />
        <Route path="/join" component={Join} />
        <Route path="/history" component={History} />
      </View>
      <View style={[styles.nav]}>
        <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}
              activeStyle={styles.navItemActive}
              activeOpacity={0.5}>
          <Text>
              <Icon name="pencil" size={20} color={pallette.crimson}/>
          </Text>
        </Link>
        <Link to="/join" underlayColor="#f0f4f7" style={styles.navItem}
              activeStyle={styles.navItemActive}
              activeOpacity={0.5}>
          <Text>
              <Icon name="rocket" size={20} color={pallette.crimson}/>
          </Text>
        </Link>
        <Link to="/history" underlayColor="#f0f4f7" style={styles.navItem}
              activeStyle={styles.navItemActive}
              activeOpacity={0.5}>
          <Text>
              <Icon name="history" size={20} color={pallette.crimson}/>
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  </NativeRouter>
);

export default class App extends Component {
    state = {
        isReady: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        });

        this.setState({
            isReady: true
        });
    }

    render() {
        if (!this.state.isReady) {
            return (<View></View>);
        }

        return AppView();
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 0,
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 20
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: pallette.lightgray,
        padding: 10
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: pallette.lightgray,
        padding: 20
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    navItemActive: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: pallette.lightergray
    },
    subNavItem: {
        padding: 5
    },
    topic: {
        textAlign: 'center',
        fontSize: 15
    },
    logo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    logoText: {
        color: pallette.gray,
        fontFamily: 'open-sans-semibold',
        fontSize: 20,
        fontWeight: "500"
    }
});
