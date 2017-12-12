import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
import { Text, View, ScrollView, Alert } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'

export class Options extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pushNotifications: false,
            backup: false
        }
    }
    static resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Home' })
        ]
    })
        static navigationOptions = {
            title: 'Opciones',
            headerStyle: { backgroundColor: '#2C2F33' },
            headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
            tabBarIcon: ({ tintColor }) => (
                <Icon name="cog" size={15} color="#FFF" />
            ),
        }
        logout() {
            Alert.alert(
                'Cerrar sesión',
                '¿Seguro que quieres cerrar tu sesión?',
                [
                    { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    {
                        text: 'Cerrar sesión', onPress: () => {
                            this.props.screenProps.rootNavigation.dispatch(Options.resetAction)
                        }
                    },
                ],
                { cancelable: false }
            )
        }
        render() {
            return (
                <ScrollView>
                    <List>
                    <ListItem 
                    hideChevron={true}
                    fontFamily={"Circular"}
                    title={"Manejar métodos de pago"}
                    onPress={() => this.props.navigation.navigate("Payments")}
                    />
                    <ListItem 
                    hideChevron={true}
                    fontFamily={"Circular"}
                    title={"Manejar transacciones recurrentes"}
                    />
                    <ListItem 
                    hideChevron={true}
                    fontFamily={"Circular"}
                    title={"Recibir notificaciones push"}
                    switchButton={true}
                    onSwitch={() => this.setState({pushNotifications: !this.state.pushNotifications})}
                    switched={this.state.pushNotifications}
                    />
                    <ListItem 
                    hideChevron={true}
                    fontFamily={"Circular"}
                    title={"Crear copias de seguridad"}
                    switchButton={true}
                    onSwitch={() => this.setState({backup: !this.state.backup})}
                    switched={this.state.backup}
                    />
                    <ListItem 
                    hideChevron={true}
                    fontFamily={"Circular"}
                    title={"Reportar error"}
                    onPress={() => this.props.navigation.navigate("ErrorReporting")}
                    />
                    <ListItem 
                    hideChevron={true}
                    fontFamily={"Circular"}
                    title={"Información legal"}
                    />
                    <ListItem 
                    hideChevron={true}
                    fontFamily={"Circular"}
                    title={"Cerrar sesión"}
                    onPress={() => this.logout()}
                    />
                    </List>
                </ScrollView>
            );
        }
}

export class Payments extends Component {
    static navigationOptions = {
        title: 'Métodos de pago',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" size={15} color="#FFF" />
        ),
    }
    render() {
        return(<View style={{flex:1}}><Text>Placeholder</Text></View>)
    }
    
}
export class RecurringTransactions extends Component {
    static navigationOptions = {
        title: 'Transacciones recurrentes',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" size={15} color="#FFF" />
        ),
    }
    render() {
        return(<View style={{flex:1}}><Text>Placeholder</Text></View>)
    }
}
export class ErrorReporting extends Component {
    static navigationOptions = {
        title: 'Reportar error',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" size={15} color="#FFF" />
        ),
    }
    render() {
        return(<View style={{flex:1}}><Text>Placeholder</Text></View>)
    }
}
export class LegalInfo extends Component {
    static navigationOptions = {
        title: 'Información legal',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" size={15} color="#FFF" />
        ),
    }
    render() {
        return(<View style={{flex:1}}><Text>Placeholder</Text></View>)
    }
}


const mapStateToProps = (state) => ({
    transactions: state.transactions
});

    const OptionsStack = StackNavigator({
        Options: {
            screen:connect(mapStateToProps)(Options)
        },
        Payments: {
            screen:connect(mapStateToProps)(Payments),
            navigationOptions: ({ navigation }) => ({
                tabBarVisible: false
            })
        },
        Recurring: {
            screen:connect(mapStateToProps)(RecurringTransactions),
            navigationOptions: ({ navigation }) => ({
                tabBarVisible: false
            })
        },
        ErrorReporting: {
            screen:connect(mapStateToProps)(ErrorReporting),
            navigationOptions: ({ navigation }) => ({
                tabBarVisible: false
            })
        }
    })
    
export default OptionsStack;