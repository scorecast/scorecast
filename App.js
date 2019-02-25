import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import { NativeRouter, Route, Link } from 'react-router-native';

// TODO: refactor into separate components
const Create = () => <Text style={styles.header}>Create Game</Text>;

const Join = () => <Text style={styles.header}>Join Game</Text>;

const History = () => <Text style={styles.header}>History</Text>;

const Topic = ({ match }) => (
  <Text style={styles.topic}>{match.params.topicId}</Text>
);

const Topics = ({ match }) => (
  <View>
    <Text style={styles.header}>Topics</Text>
    <View>
      <Link
        to={`${match.url}/rendering`}
        style={styles.subNavItem}
        underlayColor="#f0f4f7"
      >
        <Text>Rendering with React</Text>
      </Link>
      <Link
        to={`${match.url}/components`}
        style={styles.subNavItem}
        underlayColor="#f0f4f7"
      >
        <Text>Components</Text>
      </Link>
      <Link
        to={`${match.url}/props-v-state`}
        style={styles.subNavItem}
        underlayColor="#f0f4f7"
      >
        <Text>Props v. State</Text>
      </Link>
    </View>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <Text style={styles.topic}>Please select a topic.</Text>}
    />
  </View>
);

const App = () => (
  <NativeRouter>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Route exact path="/" component={Create} />
        <Route path="/join" component={Join} />
        <Route path="/history" component={History} />
      </View>
      <View style={styles.nav}>
        <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>Create</Text>
        </Link>
        <Link to="/join" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>Join</Text>
        </Link>
        <Link to="/history" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>History</Text>
        </Link>
      </View>
    </SafeAreaView>
  </NativeRouter>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
    flex: 1
  },
  content: {
    flex: 1
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: 'center',
    fontSize: 15
  }
});

export default App;
