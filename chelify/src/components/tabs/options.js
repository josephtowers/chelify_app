import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
import { Text, View } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
export class Options extends React.Component {
    
        static navigationOptions = {
            title: 'Opciones',
            headerStyle: { backgroundColor: '#2C2F33' },
            headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
            tabBarIcon: ({ tintColor }) => (
                <Icon name="cog" size={15} color="#FFF" />
            ),
        }
        render() {
            const { transactions } = this.props;
            console.log(transactions);
            return (
                <View>
                    <Text>Opciones</Text>
                </View>
            );
        }
}

const mapStateToProps = (state) => ({
    transactions: state.transactions
});

    const OptionsStack = StackNavigator({
        Options: {
            screen:connect(mapStateToProps)(Options)
        }
    })
    
export default OptionsStack;