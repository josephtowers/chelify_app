import React, { Component } from 'react';
import { AppRegistry, BackHandler } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import Reducers from './src/reducers'
import Root from './src/components'
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Client } from 'bugsnag-react-native';

const bugsnag = new Client();
const loggerMiddleware = createLogger()

export function configureStore(preloadedState) {
    const store = createStore(
      Reducers,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      )
    );
  
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./src/reducers', () => {
        const nextRootReducer = require('./src/reducers/index.js');
        store.replaceReducer(nextRootReducer);
      });
    }
  
    return store;
  }

const mapStateToProps = (state) => ({
    nav: state.nav,
    transactions: state.transactions
  });

export class App extends Component{
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav, transactions } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      transactions: transactions
    });
    return (
      <Root />
    )
  }
        
      }

  const MainScreen = connect(mapStateToProps)(App);

export default class chelifyreact extends Component {
    render() {
        return (
            <Provider store={configureStore()}>
                <MainScreen />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('chelify', () => chelifyreact);