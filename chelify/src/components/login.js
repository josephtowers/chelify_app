import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import styles from '../styles/style.js'
import * as Animatable from 'react-native-animatable'
import {
    View,
    Text,
    ActivityIndicator,
    StatusBar,
    Image,
    TextInput,
    Button,
    Dimensions,
    AsyncStorage,
    ToastAndroid
} from 'react-native'
//import { login } from '../api/users';
const baseUrl = 'https://chelify-nicoavn.c9users.io/chelify_server/public';
const loginApi = baseUrl + '/api/auth/login';
export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            animating: false
        };
    }

    static navigationOptions = {
        header: null,
    }
    static resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Start' })
        ]
    })
    async checkForPasscode() {
        try {
            let value = await AsyncStorage.getItem('passcode');
            if (value !== null) {
                this.props.navigation.dispatch(Login.goToPasscodePage)
            }
        } catch (error) {
            // Error retrieving data
            console.log('2value');

        }
    }
    async save(obj) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(obj), () => console.log('Guarde a fulanito'))
    }
    leave() {
        this.props.navigation.dispatch(Login.resetAction);
    }
    async saveCurrentUser(obj) {
        try {
            if (obj != null && obj.access_token != null) {
                console.log('suavecito')
                this.save(obj)
                setTimeout(() => this.leave(), 5000)
                  
            } else {
                ToastAndroid.show("Usuario o contraseña incorrecta", ToastAndroid.SHORT);
                this.setState({ animating: false })
            }
        }
        catch (error) {
            // Error retrieving data
            ToastAndroid.show('lol', ToastAndroid.SHORT)
            console.log(error);

        }
    }
    componentDidMount() {
        this.checkForPasscode()
    }
    async logMeIn(email, password, callback) {
        fetch(loginApi, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.saveCurrentUser(responseJson);
            })
            .catch((error) => {
                console.log(error)
                console.log('Lo mandé a ' + loginApi)

            });
    }
    async loginAction() {
        console.log('toy aqui')
        this.setState({ animating: true });
        this.logMeIn(this.state.email, this.state.password)
    }

    static goToPasscodePage = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Passcode' })
        ]
    })
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#2C2F33"
                    barStyle="light-content"
                />
                <Animatable.Image
                    animation="bounceIn"
                    style={{ width: 200, height: 100 }}
                    resizeMode='contain'
                    source={require('../../assets/img/logo.png')}
                />
                <Animatable.View style={{ width: Dimensions.get('window').width }} animation="fadeInUpBig"
                    delay={1000}>
                    <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
                        <TextInput
                            style={styles.inputs}
                            keyboardType="email-address"
                            placeholder="Correo electrónico"
                            placeholderTextColor="#787878"
                            underlineColorAndroid="#787878"
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.email}
                        />
                        <TextInput
                            style={styles.inputs}
                            secureTextEntry={true}
                            placeholder="Contraseña"
                            placeholderTextColor="#787878"
                            underlineColorAndroid="#787878"
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                        />
                    </View>
                    <View style={[styles.buttonsContainer, { marginBottom: 25 }]}>
                        <Button
                            style={styles.buttons}
                            color="#24E189"
                            onPress={() => this.loginAction()}
                            title="Iniciar sesión"
                        />
                        <Button
                            style={styles.buttons}
                            color="#24E189"
                            onPress={() => this.props.navigation.navigate('Register')}
                            title="Nueva cuenta"
                        />
                    </View>
                    <ActivityIndicator size="large" color="#24E189" animating={this.state.animating} />
                </Animatable.View>
            </View>

        );
    }
}

export default Login;