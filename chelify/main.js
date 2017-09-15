import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    FlatList,
    StatusBar,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigator, NavigationActions, DrawerNavigator, TabNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';

export default class chelifyreact extends Component {
    render() {
        return (
            <ModalStack />
        );
    }
}

class OverviewScreen extends React.Component {
    static navigationOptions = {
        title: 'Dashboard',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={15} color="#FFF" />
        ),
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Text>Overview</Text>
            </ScrollView>
        );
    }
}

class Swipe extends React.Component {
    static navigationOptions = {

        header: null,
    }
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
                <View style={styles.slide}>
                    <StatusBar
                        hidden={true}
                    />
                    <Image
                    style={{ width: 200, height: 100 }}
                    resizeMode='contain'
                    source={require('./assets/img/welcome/screen1.png')}
                />
                    <Text style={styles.text}>Página 1</Text>
                </View>
                <View style={styles.slide}>
                <Image
                style={{ width: 200, height: 100 }}
                resizeMode='contain'
                source={require('./assets/img/welcome/screen2.png')}
            />
                    <Text style={styles.text}>Página 2</Text>
                </View>
                <View style={styles.slide}>
                <Image
                style={{ width: 200, height: 100 }}
                resizeMode='contain'
                source={require('./assets/img/welcome/screen3.png')}
            />
                    <Text style={styles.text}>Página 3</Text>
                </View>
                <View style={styles.slide}>
                <Image
                style={{ width: 200, height: 100 }}
                resizeMode='contain'
                source={require('./assets/img/welcome/screen4.png')}
            />
                    <Text style={styles.text}>Página 4</Text>
                </View>
                <View style={styles.slide}>
                <Image
                style={{ width: 200, height: 100 }}
                resizeMode='contain'
                source={require('./assets/img/welcome/screen5.png')}
            />
                    <Text style={styles.text}>Página 5</Text>
                    <Button
                        style={styles.buttons}
                        color="#24E189"
                        onPress={() => this.props.navigation.dispatch(Principal.resetAction)}
                        title="Comenzar"
                    />
                </View>
            </Swiper>
        )
    }
}

class TransactionsScreen extends React.Component {
    static navigationOptions = {
        title: 'Transacciones',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="credit-card" size={15} color="#FFF" />
        ),
    }

    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="#2C2F33"
                    barStyle="light-content"
                />
                <Text>Transacciones</Text>
            </View>
        );
    }
}

class ReportScreen extends React.Component {
    static navigationOptions = {
        title: 'Reportes',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF' },
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

class GroupScreen extends React.Component {
    static navigationOptions = {
        title: 'Grupos',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="users" size={15} color="#FFF" />
        )
    }

    render() {
        return (

            <Text>Grupos</Text>
        );
    }
}

class OptionsScreen extends React.Component {

    static navigationOptions = {
        title: 'Opciones',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" size={15} color="#FFF" />
        ),
    }
    render() {
        return (
            <Text>Opciones</Text>
        );
    }
}

class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }
    resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Welcome' })
        ]
    })
    backAction = NavigationActions.back();
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 200, height: 100 }}
                    resizeMode='contain'
                    source={require('./assets/img/logo.png')}
                />
                <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Nombre"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                    />
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        placeholder="Correo electrónico"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                    />
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        placeholder="Repetir correo electrónico"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                    />
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                    />
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        placeholder="Repetir contraseña"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        style={styles.buttons}
                        color="#24E189"
                        onPress={() => this.props.navigation.dispatch(this.resetAction)}
                        title="Crear cuenta"
                    />
                </View>
            </View>
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
                <StatusBar
                    backgroundColor="#2C2F33"
                    barStyle="light-content"
                />
                <Image
                    style={{ width: 200, height: 100 }}
                    resizeMode='contain'
                    source={require('./assets/img/logo.png')}
                />
                <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        placeholder="Correo electrónico"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                    />
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        style={styles.buttons}
                        color="#24E189"
                        onPress={() => this.props.navigation.dispatch(Principal.resetAction)}
                        title="Iniciar sesión"
                    />
                    <Button
                        style={styles.buttons}
                        color="#24E189"
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Nueva cuenta"
                    />
                </View>
            </View>
        );
    }
}

const OverviewStack = StackNavigator({
    Overview: {
        screen: OverviewScreen
    }
})

const TransactionsStack = StackNavigator({
    Transactions: {
        screen: TransactionsScreen
    }
})

const ReportsStack = StackNavigator({
    Reports: {
        screen: ReportScreen
    }
})

const GroupStack = StackNavigator({
    Groups: {
        screen: GroupScreen
    }
})

const OptionsStack = StackNavigator({
    Options: {
        screen: OptionsScreen
    }
})

const MyApp = TabNavigator({
    Overview: {
        screen: OverviewStack,
    },
    Transactions: {
        screen: TransactionsStack,
    },
    Reports: {
        screen: ReportsStack,
    },
    Groups: {
        screen: GroupStack,
    },
    Options: {
        screen: OptionsStack,
        navigationOptions: {
            tabBarOptions: {
                showIcon: true
            }
        }
    },
}, {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        tabBarOptions: {
            style:
            {
                backgroundColor: '#2C2F33'
            },
            indicatorStyle: {
                backgroundColor: '#24E189'
            },
            showIcon: true,
            showLabel: false
        }
    });


const ModalStack = StackNavigator({
    Home: {
        screen: Principal,
    },
    Register: {
        screen: RegisterScreen,
    },
    Inicio: {
        screen: chelifyreact,
    },
    Start: {
        screen: MyApp,
        navigationOptions: {
            header: null
        }
    },
    Welcome: {
        screen: Swipe
    }
});

const styles = StyleSheet.create({
    header:
    {
        backgroundColor: '#2C2F33',
    },
    headerText: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2C2F33',

    },
    buttonsContainer: {
        alignSelf: 'stretch',
        flexDirection: "row",
        marginTop: 20,
        alignContent: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 35
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

    },
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20 
    }
});

AppRegistry.registerComponent('chelifyreact', () => chelifyreact);
