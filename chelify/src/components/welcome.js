import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'
import styles from '../styles/style.js'
import Login from './login.js'
import {
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    Button,
    TouchableHighlight
} from 'react-native'
import Swiper from 'react-native-swiper';

export class Welcome extends React.Component {
    static navigationOptions = {

        header: null,
    }
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
                <View style={styles.slide}>
                    <StatusBar hidden={true} />
                    <Image style={{ width: 200, height: 100 }} resizeMode='contain'
                        source={require('../../assets/img/welcome/screen1.png')} />
                    <Text style={styles.centralizedTitle}>¡Te damos la{"\n"}bienvenida a Chelify!</Text>
                    <Text style={styles.centralizedParagraph}>
                        En breve, comenzarás a administrar
                        tus finanzas personales de forma
                        rápida, segura y dinámica. Primero,
                        vamos a configurar tu entorno.
                    </Text>
                </View>
                <View style={styles.slide}>
                    <View style={{ flex: 4, alignItems: 'center', paddingTop: 120 }}>
                        <Image style={{ width: 148, height: 148 }} resizeMode='contain'
                            source={require('../../assets/img/welcome/screen2.png')} />
                        <Text style={[styles.centralizedTitle, { marginTop: -12 }]}>Agrega una cuenta{"\n"}o tarjeta</Text>
                        <Text style={styles.centralizedParagraph}>
                            Puedes agregar todas las cuentas
                            y tarjetas que tengas para que
                            registres las transacciones que se
                            generen a través de cada una. El
                            efectivo siempre es una opción.
                        </Text>
                    </View>
                    <View style={{ flex: 1, display: 'none' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableHighlight onPress={() => this.props.navigation.dispatch(Principal.resetAction)}>
                                <Text style={styles.textLink}>AGREGAR CUENTA</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={{ marginLeft: 28 }} onPress={() => this.props.navigation.dispatch(Principal.resetAction)}>
                                <Text style={styles.textLink}>SÓLO EFECTIVO</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={styles.slide}>
                    <Image style={{ width: 200, height: 100 }} resizeMode='contain'
                        source={require('../../assets/img/welcome/screen3.png')} />
                    <Text style={styles.centralizedTitle}>
                        Genera reportes de{"\n"}tus gastos e ingresos
                    </Text>
                    <Text style={styles.centralizedParagraph}>
                        La aplicación te permite generar
                        reportes de tus transacciones, con
                        la posibilidad de filtrarlos por fecha,
                        cuentas, lugares, montos y categorías.
                    </Text>
                </View>
                <View style={styles.slide}>
                    <Image style={{ width: 200, height: 100 }} resizeMode='contain'
                        source={require('../../assets/img/welcome/screen4.png')} />
                    <Text style={styles.centralizedTitle}>Colabora con otros{"\n"}usuarios</Text>
                    <Text style={styles.centralizedParagraph}>
                        Puedes ser miembro de un grupo
                        para gastos comunes. Perfecto para
                        hacer planes con familares, amigos
                        o compañeros de trabajo.
                    </Text>
                </View>
                <View style={styles.slide}>
                    <Image style={{ width: 200, height: 100 }} resizeMode='contain'
                        source={require('../../assets/img/welcome/screen5.png')} />
                    <Text style={styles.centralizedTitle}>Configura pagos{"\n"}recurrentes</Text>
                    <Text style={styles.centralizedParagraph}>
                        Ciertos gastos o ingresos se realizan
                        cada cierto tiempo. Puedes agregar
                        esta recurrencia en la aplicación para
                        evitar tener que registrarlo cada vez.
                    </Text>
                    <TouchableHighlight onPress={() => this.props.navigation.dispatch(Login.resetAction)}>
                        <Text style={[styles.textLink, { paddingTop: 60 }]}>COMENZAR</Text>
                    </TouchableHighlight>
                </View>
            </Swiper>
        )
    }
}


class AddCardForm extends React.Component {
    
        state = {
            modalVisible: false,
        }
    
        setModalVisible(visible) {
            this.setState({ modalVisible: visible });
        }
    
        render() {
            return (
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { alert("Modal has been closed.") }}>
                        <View flex={1} style={styles.modalBoxBg}>
                            <View flex={0.5} style={styles.modalBox}>
                                <Text style={styles.centralizedTitle}>Agregar cuenta o tarjeta</Text>
    
                                <TouchableHighlight onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
    
                    <TouchableHighlight onPress={() => { this.setModalVisible(true) }}>
                        <Text>Show Modal</Text>
                    </TouchableHighlight>
    
                </View>
            );
        }
    }

export default Welcome;