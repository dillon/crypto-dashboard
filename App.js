import React from 'react';
import { StyleSheet, Text, View, Button, NavigatorIOS, } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Store from './src/Store';
import { Header, CryptoContainer, CoinView } from './src/components';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <NavigatorIOS
          initialRoute={{
            component: CryptoContainer,
            title: 'Cryptocurrencies',
            passProps: { title: 'Cryptocurrencies', index: 1 },
          }}
          style={styles.container}
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
