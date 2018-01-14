import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import styles from '../styles/style.js'
import {
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    Button,
    ToastAndroid,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native'

const baseUrl = 'https://chelify-nicoavn.c9users.io/chelify_server/public/';
const registerApi = baseUrl + '/api/register';

export class Register extends React.Component {
    static navigationOptions = {
        header: null,
    }
    resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Welcome' })
        ]
    })
    async save(obj) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(obj))
    }
    leave() {
        this.props.navigation.dispatch(this.resetAction);
    }
    userLogin() {
        fetch(registerApi, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.save(responseJson);
                this.leave()
            })
            .catch((error) => {
                console.log(error);
            });
    }
    backAction = NavigationActions.back();

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            nameError: false,
            emailError: false,
            emailConfirmationError: false,
            passwordError: false,
            passwordConfirmationError: false
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 200, height: 100 }}
                    resizeMode='contain'
                    source={require('../../assets/img/logo.png')}
                />
                <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Nombre"
                        maxLength={50}
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    />
                    {
                        this.state.nameError && <Text style={{color: 'red', fontFamily: 'Circular'}}>Introduce tu nombre</Text>
                    }
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        maxLength={100}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        autoCapitalize="none"
                    />
                    {
                        this.state.emailError && <Text style={{color: 'red', fontFamily: 'Circular'}}>Introduce un correo válido</Text>
                    }
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        maxLength={100}
                        placeholder="Repetir correo electrónico"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        autoCapitalize="none"
                    />
                    {
                        this.state.emailConfirmationError && <Text style={{color: 'red', fontFamily: 'Circular'}}>Los correos no coinciden</Text>
                    }
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        maxLength={16}
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        autoCapitalize="none"
                    />
                    {
                        this.state.passwordError && <Text style={{color: 'red', fontFamily: 'Circular'}}>La contraseña debe tener entre 8 y 16 caracteres</Text>
                    }
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        maxLength={16}
                        placeholder="Repetir contraseña"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        autoCapitalize="none"
                    />
                    {
                        this.state.passwordConfirmationError && <Text style={{color: 'red', fontFamily: 'Circular'}}>Las contraseñas no coinciden</Text>
                    }
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        style={styles.buttons}
                        color="#24E189"
                        onPress={() => this.userLogin()}
                        title="Crear cuenta"
                    />
                </View>
            </View>
        );
    }
}

export default Register;