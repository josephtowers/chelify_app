import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import styles from '../styles/style.js'
import * as Animatable from 'react-native-animatable'
import {
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    Button,
    Dimensions
} from 'react-native'
import {login} from '../api/users';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    static navigationOptions = {
        header: null,
    }

    loginAction = function() {
        login(this.state.email, this.state.password)
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
                
                <Animatable.Image
                animation="bounceIn"
                    style={{ width: 200, height: 100 }}
                    resizeMode='contain'
                    source={require('../../assets/img/logo.png')}
                />
                <Animatable.View style={{width: Dimensions.get('window').width}} animation="fadeInUpBig" 
                delay={1000}>
                <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        placeholder="Correo electrónico"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                    />
                </View>
                <View style={styles.buttonsContainer}>
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
                </Animatable.View>
            </View>

        );
    }
}

export default Login;