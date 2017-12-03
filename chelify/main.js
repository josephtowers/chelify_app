import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import Reducers from './src/reducers'
import Root from './src/components'

export default class chelifyreact extends Component {
    render() {
        return (
            <Provider store={createStore(Reducers)}>
                <Root />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('chelify', () => chelifyreact);