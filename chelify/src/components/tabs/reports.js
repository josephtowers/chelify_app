import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
import {
    Text,
    View
} from 'react-native'
import {
    VictoryChart,
    VictoryLine,
    VictoryTheme
} from 'victory-native'
import { StackNavigator, NavigationActions } from 'react-navigation';
import reportGenerator from '../../util/reportGenerator'

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
            <View style={{flex: 1}}>
                {
                    reportGenerator('2017-11-28 23:50:48')
                }
            </View>
        );
    }
}

const ReportsStack = StackNavigator({
    Reports: {
        screen: Reports
    }
})

export default ReportsStack;