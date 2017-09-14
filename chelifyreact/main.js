import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput
} from 'react-native';
import { StackNavigator, NavigationActions, DrawerNavigator, TabNavigator } from 'react-navigation';

export default class chelifyreact extends Component {
    render() {
        return (
            <ModalStack />
        );
    }
}

class OverviewScreen extends React.Component {
    static navigationOptions = {
        title: '1',
        header: null,
    }

    render() {
        return (
            <Text>Overview</Text>
        );
    }
}

class TransactionsScreen extends React.Component {
    static navigationOptions = {
        title: '2',
        header: null
    }

    render() {
        return (
            <Text>Transacciones</Text>
        );
    }
}

class ReportScreen extends React.Component {
    static navigationOptions = {
        title: '3',
        header: null
    }

    render() {
        return (
            <Text>Reportes</Text>
        );
    }
}
class GroupScreen extends React.Component {
    static navigationOptions = {
        title: '4',
        header: null
    }

    render() {
        return (
            <Text>Grupos</Text>
        );
    }
}
class OptionsScreen extends React.Component {
    static navigationOptions = {
        title: '5',
        header: null
    }

    render() {
        return (
            <Text>Opciones</Text>
        );
    }
}


class Principal extends React.Component {
    static navigationOptions = {
        header: null,
    }
    static resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Start' })
        ]
    })
    render() {
        return (
            <View style={styles.container}>
                <Image
                style={{width: 200, height: 100}}
                    resizeMode = 'contain'
                    source={require('./assets/img/logo.png')}
                />
                <View style={{alignSelf:'stretch',paddingHorizontal:20}}>
                <TextInput
                style={styles.inputs}
                keyboardType="email-address"
                placeholder="Correo electrónico"
                placeholderTextColor="#787878"
              />
                <TextInput
                style={styles.inputs}
                secureTextEntry={true}
                placeholder="Contraseña"
                placeholderTextColor="#787878"
              />
               </View>
    <View style={{flexDirection:"row",marginTop:20, flexWrap: 'wrap'}}>
                <Button
                style={styles.buttons}
                color="#24E189"
                    onPress={() => this.props.navigation.dispatch(Principal.resetAction)}
                    title="Iniciar sesión"
                />
                <Button
                style={styles.buttons}  
                color="#24E189"                
                onPress={() => this.props.navigation.dispatch(Principal.resetAction)}
                title="Nueva cuenta"
            />
</View>
            </View>
        );
    }
}
const MyApp = TabNavigator({
    Overview: {
      screen: OverviewScreen,
    },
    Transactions: {
        screen: TransactionsScreen,
    },
    Reports: {
        screen: ReportScreen,
    },
    Groups: {
        screen: GroupScreen,
    },
    Options: {
        screen: OptionsScreen,
    },
  },{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style:
        {
            backgroundColor: '#2C2F33'
        },
        indicatorStyle: {
            backgroundColor: '#24E189'
        },
        showIcon: true
    }
  });
const ModalStack = StackNavigator({
    Home: {
        screen: Principal,
    },
    Inicio: {
        screen: chelifyreact,
    },
    Start: {
        screen: MyApp,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2C2F33',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFFFFF'
    },
    instructions: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    inputs: {
        alignSelf: 'stretch',
        color: '#FFFFFF',
        borderColor: '#FFFFFF'
    },
    buttons: {
        
    }
});

AppRegistry.registerComponent('chelifyreact', () => chelifyreact);
