import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import styles from '../styles/style.js'
import {
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    Button
} from 'react-native'

export class Login extends React.Component {
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
                    source={require('../../assets/img/logo.png')}
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
                        onPress={() => this.props.navigation.dispatch(Login.resetAction)}
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

export default Login;