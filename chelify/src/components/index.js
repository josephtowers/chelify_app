import Login from './login.js'
import Welcome from './welcome.js'
import Register from './register.js'
import Passcode from './passcode.js'
import { StackNavigator } from 'react-navigation'
import TabView from './tabs'
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'


const Root = StackNavigator({
    // Test: {
    //     screen: AddCardForm,
    // },
    Home: {
        screen: Login,
    },
    Register: {
        screen: Register,
    },
    Passcode: {
        screen: Passcode
    },
    Start: {
        screen: TabView,
        navigationOptions: {
            header: null
        }
    },
    Welcome: {
        screen: Welcome
    }
}, {
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [layout.initWidth, 0, 0]
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                    outputRange: [0, 1, 1, 0.3, 0]
                });

                return { opacity, transform: [{ translateX }] }
            }
        })
    });

    export default Root;