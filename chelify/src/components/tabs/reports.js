import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
import { Text } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation';

export class Reports extends React.Component {
    static navigationOptions = {
        title: 'Reportes',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="bar-chart" size={15} color="#FFF" />
        ),
    }

    render() {
        return (
            <Text>Reportes</Text>
        );
    }
}

const ReportsStack = StackNavigator({
    Reports: {
        screen: Reports
    }
})

export default ReportsStack;