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
    KeyboardAvoidingView
} from 'react-native'

const baseUrl = 'http://10.6.250.129:8000';
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
                ToastAndroid.show('El usuario ta jevi', ToastAndroid.SHORT);
            })
            .catch((error) => {
                ToastAndroid.show(error.message, ToastAndroid.SHORT);

            });
    }
    backAction = NavigationActions.back();

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
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
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    />
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        placeholder="Correo electrónico"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        placeholder="Repetir correo electrónico"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        placeholder="Repetir contraseña"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        autoCapitalize="none"
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

export default Register;