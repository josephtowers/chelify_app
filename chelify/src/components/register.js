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
    AsyncStorage,
    Keyboard
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
                ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)

            });
    }
    backAction = NavigationActions.back();

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            emailConfirmation: '',
            password: '',
            passwordConfirmation: '',
            nameError: false,
            emailError: false,
            emailConfirmationError: false,
            passwordError: false,
            passwordConfirmationError: false
        }
    }
    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
    validateName() {
        
        let nameError = false;
        if(this.state.name.length == 0) {
            nameError = true
        }
        this.setState({nameError: nameError})
    }
    validateUserEmail() {
        let emailError = false;
        if(!this.validateEmail(this.state.email)) {
            emailError = true
        }
        this.setState({emailError: emailError})
    }
    validateUserEmailConf() {
        let emailConfirmationError = false;
        if(this.state.email != this.state.emailConfirmation) {
            emailConfirmationError = true
        }
        this.setState({emailConfirmationError: emailConfirmationError})
    }
    validatePassword() {
        let passwordError = false;
        if(this.state.password.length < 8) {
            passwordError = true
        }
        this.setState({passwordError: passwordError})
    }
    validatePasswordConf() {
        let passwordConfirmationError = false;
        if(this.state.password != this.state.passwordConfirmation) {
            passwordConfirmationError = true
        }
        this.setState({passwordConfirmationError: passwordConfirmationError})
    }
    validate() {
        Keyboard.dismiss()
        let errors = 0;
        let nameError = false;
        let emailError = false;
        let emailConfirmationError = false;
        let passwordError = false;
        let passwordConfirmationError = false;
        if(this.state.name.length == 0) {
            nameError = true
            errors++
        }
        if(!this.validateEmail(this.state.email)) {
            emailError = true
            errors++
        }
        if(this.state.email != this.state.emailConfirmation) {
            emailConfirmationError = true
            errors++
        }
        if(this.state.password.length < 8) {
            passwordError = true
            errors++
        }
        if(this.state.password != this.state.passwordConfirmation) {
            passwordConfirmationError = true
            errors++
        }
        this.setState({
            nameError: nameError,
            emailError: emailError,
            emailConfirmationError: emailConfirmationError,
            passwordError: passwordError,
            passwordConfirmationError: passwordConfirmationError
        }, () => !errors && this.userLogin())
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
                        onBlur={() => this.validateName()}
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
                        onBlur={() => this.validateUserEmail()}
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
                        value={this.state.emailConfirmation}
                        onChangeText={(text) => this.setState({emailConfirmation: text})}
                        autoCapitalize="none"
                        onBlur={() => this.validateUserEmailConf()}
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
                        onBlur={() => this.validatePassword()}
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
                        value={this.state.passwordConfirmation}
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({passwordConfirmation: text})}
                        onBlur={() => this.validatePasswordConf()}
                    />
                    {
                        this.state.passwordConfirmationError && <Text style={{color: 'red', fontFamily: 'Circular'}}>Las contraseñas no coinciden</Text>
                    }
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        style={styles.buttons}
                        color="#24E189"
                        onPress={() => this.validate()}
                        title="Crear cuenta"
                    />
                </View>
            </View>
        );
    }
}

export default Register;