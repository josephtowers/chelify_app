import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
import {
    Text,
    KeyboardAvoidingView,
    View,
    ScrollView,
    Alert,
    Image,
    TextInput,
    Picker,
    TouchableOpacity,
    Modal,
    Dimensions,
    Button,
    RefreshControl,
    ToastAndroid,
    AsyncStorage
} from 'react-native'
import { List, ListItem, Card, SearchBar } from 'react-native-elements'
import { StackNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import payments from '../../api/payments'
import removeDiacritics from '../../util/removeDiacritics.js'
import ActionButton from 'react-native-action-button'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

var ImagePicker = require('react-native-image-picker');

const banks = [
    'Banco Central',
    'Banco Popular',
    'Banreservas',
    'Banco BHD León',
    'Banco del Progreso',
    'Scotiabank',
    'Banco Vimenca',
    'Banco Caribe',
    'Banco Santa Cruz',
    'Banesco',
    'Banco Lopez de Haro',
    'Banco Agrícola',
    'Promerica',
    'Citibank',
    'Banco BDI',
    'Banco Ademi',
    'Bancamérica',
    'Banco Activo Dominicana',
    'Banco de Ahorro y Crédito BDA',
    'Banca Solidaria',
    'Banco Lafise',
    'Banco Confisa',
    'Bonanza Banco de Ahorro y Crédito',
    'Banco de Ahorro y Crédito del Caribe',
    'Banco ADOPEM',
    'Banco Empire',
    'Banco Cofasi',
    'Superintendencia de Bancos RD',
    'Banco Fihogar',
    'Banco Unión',
    'Banaci',
    'Banco Atlántico',
    'BellBank',
    'Banco Mundial Dominicana',
    'Gruficorp',
    'Banco Nacional de las Exportaciones',
    'Bancotuí',
    'Banco Federal'
]

const recurringTransactions = [
    {
        name: 'Netflix',
        dayOfMonth: 22,
        amount: 580,
        takeFrom: 'Tarjeta de débito VISA 3230'
    },
    {
        name: 'Spotify',
        dayOfMonth: 9,
        amount: 80,
        takeFrom: 'Efectivo'
    }
]

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
    async deleteUserData() {
        try {
            await AsyncStorage.removeItem('passcode');
            this.props.screenProps.rootNavigation.dispatch(Options.resetAction)
            
          } catch (error) {
            // Error retrieving data
            console.log('2value');
            
          }
    }
    logout() {
        Alert.alert(
            'Cerrar sesión',
            '¿Seguro que quieres cerrar tu sesión?',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Cerrar sesión', onPress: () => {
                        this.deleteUserData()
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
                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                        onPress={() => this.props.navigation.navigate("Payments")}
                    />
                    <ListItem
                        hideChevron={true}
                        fontFamily={"Circular"}
                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                        title={"Manejar transacciones recurrentes"}
                        onPress={() => this.props.navigation.navigate("Recurring")}
                    />
                    <ListItem
                        hideChevron={true}
                        fontFamily={"Circular"}
                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                        title={"Recibir notificaciones push"}
                        switchButton={true}
                        onSwitch={() => this.setState({ pushNotifications: !this.state.pushNotifications })}
                        switched={this.state.pushNotifications}
                    />
                    <ListItem
                        hideChevron={true}
                        fontFamily={"Circular"}
                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                        title={"Crear copias de seguridad"}
                        switchButton={true}
                        onSwitch={() => this.setState({ backup: !this.state.backup })}
                        switched={this.state.backup}
                    />
                    <ListItem
                        hideChevron={true}
                        fontFamily={"Circular"}
                        title={"Reportar error"}
                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                        onPress={() => this.props.navigation.navigate("ErrorReporting")}
                    />
                    <ListItem
                        hideChevron={true}
                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                        fontFamily={"Circular"}
                        title={"Información legal"}
                        onPress={() => this.props.navigation.navigate("LegalInfo")}
                    />
                    <ListItem
                        hideChevron={true}
                        fontFamily={"Circular"}
                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
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
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <List>
                        {
                            payments.map((l, i) => (
                                <ListItem
                                    avatar={l.avatar}
                                    avatarStyle={{ backgroundColor: 'white' }}
                                    fontFamily={'Circular'}
                                    title={l.name}
                                    key={i}
                                    rightIcon={<Image
                                        style={{ width: 10, height: 10, marginRight: 6, alignSelf: 'center' }}
                                        source={require('../../../assets/img/icons/delete.png')}
                                    />}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
                <ActionButton
                    buttonColor="#24E189"
                    onPress={() => this.props.navigation.navigate("AddPayment")}
                />
            </View>
        )
    }

}
export class RecurringTransactions extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        refreshing: false,
        recurring: recurringTransactions
    }
    static navigationOptions = {
        title: 'Transacciones recurrentes',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" size={15} color="#FFF" />
        ),
    }
    cashify(amountIn) {

        let amount = parseFloat(amountIn).toFixed(2);
        // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
        console.log(amount);
        let splitAmount = amount.split(".")[0];
        let i = splitAmount.length - 4;

        while (i >= 0) {
            splitAmount = splitAmount.slice(0, i + 1) + "," + splitAmount.slice(i + 1);
            i = i - 3;
        }
        return splitAmount + "." + amount.split(".")[1];

    }
    _onRefresh2() {
        this.setState({ refreshing: true }, function () {

            this.setState({ recurring: recurringTransactions }, function () {

                this.setState({ refreshing: false });
            });
        });
    }
    delete(l) {
        Alert.alert(
            'Eliminar transacción',
            '¿Seguro que quieres borrar esta transacción recurrente?',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Eliminar', onPress: () => {
                        recurringTransactions.splice(recurringTransactions.indexOf(l), 1);
                        this._onRefresh2()
                        ToastAndroid.show('La transacción se ha eliminado', ToastAndroid.SHORT)

                    }
                },
            ],
            { cancelable: false }
        )
    }
    render() {
        return (
            this.state.recurring.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }}
                        refreshControl={<RefreshControl
                            enabled={true}
                            refreshing={this.state.refreshing}
                            onRefresh={() => (this._onRefresh2())}
                        />}>
                        <List>
                            {
                                this.state.recurring.map((l, i) => (
                                    <ListItem
                                        avatar={<View style={{
                                            alignContent: 'center', justifyContent: 'center', height: 32, width: 32,
                                            borderRadius: 32 / 2, borderColor: 'black', borderWidth: 1
                                        }}>
                                            <Text style={{ fontFamily: 'Circular', textAlign: 'center' }}>{l.dayOfMonth}</Text>
                                        </View>}
                                        fontFamily={'Circular'}
                                        title={l.name}
                                        subtitle={"RD$" + this.cashify(l.amount) + " - " + l.takeFrom}
                                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                        key={i}
                                        rightIcon={<TouchableOpacity style={{ alignSelf: 'center' }}
                                            onPress={() => (this.delete(l))}><Image
                                                style={{ width: 10, height: 10, marginRight: 6, alignSelf: 'center' }}
                                                source={require('../../../assets/img/icons/delete.png')}
                                            /></TouchableOpacity>}
                                    />
                                ))
                            }
                        </List>
                    </ScrollView>
                    <ActionButton
                        buttonColor="#24E189"
                        onPress={() => this.props.navigation.navigate("AddRecurring", { onSuccess: () => this._onRefresh2() })}
                    />
                </View>
            ) : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 15 }}>
                            <Image
                                style={{ width: 128, height: 128 }}
                                source={require('../../../assets/img/welcome/screen5.png')}
                            />
                            <Text style={{ fontFamily: 'Circular', fontSize: 20, textAlign: 'center', marginTop: 10 }}>No tienes transacciones recurrentes. ¡Utiliza el botón para crear una!</Text>
                        </View>
                        <ActionButton
                            buttonColor="#24E189"
                            onPress={() => this.props.navigation.navigate("AddRecurring", { onSuccess: () => this._onRefresh2() })}
                        />
                    </View>
                )
        )
    }
}

export class AddRecurringTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            formattedAmount: '0.00',
            paymentModalVisible: false,
            paymentSearchResult: payments,
            payment: null,
            name: '',
            dayOfMonth: 1
        }
    }

    static navigationOptions = {
        title: '',
        headerStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
        },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" size={15} color="#FFF" />
        ),
    }
    cashify(amountIn) {

        let amount = parseFloat(amountIn).toFixed(2);
        // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
        console.log(amount);
        let splitAmount = amount.split(".")[0];
        let i = splitAmount.length - 4;

        while (i >= 0) {
            splitAmount = splitAmount.slice(0, i + 1) + "," + splitAmount.slice(i + 1);
            i = i - 3;
        }
        return splitAmount + "." + amount.split(".")[1];

    }
    changeAmount = number => {
        number === 10 ? (
            this.setState({ amount: 0 }, () => this.setState({ formattedAmount: this.cashify(this.state.amount) }))
        )
            : (
                ((this.state.amount * 1000) + number) * 0.01 <= 9999999.99 ? (
                    this.setState({ amount: ((this.state.amount * 1000) + number) * 0.01 }, function () {
                        this.setState({ formattedAmount: this.cashify(this.state.amount) });
                    })) : (
                        this.setState({ amount: 9999999.99 }, function () {
                            this.setState({ formattedAmount: this.cashify(this.state.amount) });
                        }))
            )
    }
    changePayment(obj) {
        this.setState({ payment: obj })
        this.setPaymentModalVisible(!this.state.paymentModalVisible)
        this.setState({ paymentSearchResult: payments })
    }
    setPaymentModalVisible(visible) {
        this.setState({ paymentModalVisible: visible });
    }
    searchPayment(query) {
        let result = [];
        for (let val of payments) {
            let searchIn = removeDiacritics(val.name.toLowerCase());
            let term = removeDiacritics(query.toLowerCase())
            if (searchIn.search(term) >= 0) {
                result.push(val)
            }
        }
        this.setState({ paymentSearchResult: result })
    }
    backAction = NavigationActions.back();
    AddRecurring() {
        let newTransactions = {
            name: this.state.name,
            dayOfMonth: this.state.dayOfMonth,
            takeFrom: this.state.payment.name,
            amount: this.state.amount
        }
        recurringTransactions.push(newTransactions);
        this.props.navigation.state.params.onSuccess();
        this.props.navigation.dispatch(this.backAction);
        ToastAndroid.show('La transacción se ha agregado', ToastAndroid.SHORT)

    }
    render() {
        return (
            <ParallaxScroll
                style={{ backgroundColor: '#2C2F33' }}
                parallaxHeight={500}
                renderParallaxForeground={() => (
                    <View style={{ height: 500, zIndex: 0, alignItems: 'center', justifyContent: 'center', zIndex: -100 }}>
                        <Text style={{ color: 'white', fontFamily: 'Circular', marginBottom: 3 }}>Monto a debitar cada mes:</Text>
                        <Text style={{ fontFamily: 'Circular', color: '#FFF', fontSize: 34, marginBottom: 10 }}>RD${this.state.formattedAmount}</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.changeAmount(1)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>1</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(2)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>2</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(3)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>3</Text></View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.changeAmount(4)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>4</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(5)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>5</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(6)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>6</Text></View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.changeAmount(7)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>7</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(8)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>8</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(9)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>9</Text></View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity>
                                    <View style={styles.circleBlank}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(0)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>0</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(10)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>{"x"}</Text></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}>
                <View style={{ backgroundColor: 'white', borderRadius: 10, marginHorizontal: 10, zIndex: 100, height: (Dimensions.get('window').height - 85) }}>
                    <Modal
                        animationType="slide"
                        visible={this.state.paymentModalVisible}
                        onRequestClose={() => { this.setPaymentModalVisible(!this.state.paymentModalVisible) }}>
                        <View flex={1}>
                            <SearchBar
                                inputStyle={{ fontFamily: 'Circular' }}
                                placeholder='Buscar método de pago'
                                onChangeText={(text) => this.searchPayment(text)} />
                            <List>
                                {
                                    this.state.paymentSearchResult.map((l, i) => (
                                        <ListItem
                                            avatar={l.avatar}
                                            avatarStyle={{ backgroundColor: 'white' }}
                                            fontFamily={'Circular'}
                                            title={l.name}
                                            hideChevron={true}
                                            onPress={() => this.changePayment(l)}
                                            key={i}
                                        />
                                    ))
                                }
                            </List>
                        </View>
                    </Modal>
                    {
                        this.state.payment != null ? (
                            <ListItem
                                title={this.state.payment.name}
                                onPress={() => { this.setPaymentModalVisible(true) }}
                                hideChevron={true}
                                fontFamily={'Circular'}
                                leftIcon={<Image
                                    style={{ width: 24, height: 24, marginRight: 6 }}
                                    source={this.state.payment.avatar}
                                />}
                            />
                        ) : (
                                <ListItem
                                    title={'¿Desde qué cuenta?'}
                                    onPress={() => { this.setPaymentModalVisible(true) }}
                                    hideChevron={true}
                                    fontFamily={'Circular'}
                                    leftIcon={<Image
                                        style={{ width: 24, height: 24, marginRight: 6 }}
                                        source={require('../../../assets/img/icons/point-of-service.png')}
                                    />}
                                />
                            )
                    }
                    <KeyboardAvoidingView style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 5 }}>
                            <TextInput
                                placeholder="Nombre"
                                style={{ fontFamily: 'Circular' }}
                                placeholderTextColor="#787878"
                                underlineColorAndroid="#787878"
                                value={`${this.state.name}`}
                                onChangeText={(text) => this.setState({ name: text })} />
                        </View>
                        <View style={{ flex: 3 }}>
                            <TextInput
                                placeholder="Día del mes"
                                style={{ fontFamily: 'Circular' }}
                                keyboardType={"numeric"}
                                placeholderTextColor="#787878"
                                underlineColorAndroid="#787878"
                                value={this.state.dayOfMonth}
                                onChangeText={(text) => this.setState({ dayOfMonth: text })} />
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.buttonsContainer}>
                        <Button
                            style={styles.buttons}
                            color="#24E189"
                            onPress={() => this.AddRecurring()}
                            title="Crear transacción"
                        />
                    </View>
                </View>
            </ParallaxScroll>
        )
    }
}

export class AddPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            formattedAmount: '0.00',
            cashName: '',
            cashBottomWidth: 2,
            bankBottomWidth: 0,
            cardBottomWidth: 0,
            visaBottomWidth: 2,
            mcBottomWidth: 0,
            amexBottomWidth: 0,
            bankSearchResult: banks,
            bankModalVisible: false,
            debitModalVisible: false,
            bank: '',
            lastFour: '',
            debitCard: null,
            provider: 'VISA',
            providerLogo: require('../../../assets/img/icons/visa.png')
        }
    }

    static navigationOptions = {
        title: '',
        headerStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0
        },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" size={15} color="#FFF" />
        ),
    }
    cashify(amountIn) {

        let amount = parseFloat(amountIn).toFixed(2);
        // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
        console.log(amount);
        let splitAmount = amount.split(".")[0];
        let i = splitAmount.length - 4;

        while (i >= 0) {
            splitAmount = splitAmount.slice(0, i + 1) + "," + splitAmount.slice(i + 1);
            i = i - 3;
        }
        return splitAmount + "." + amount.split(".")[1];

    }
    changeAmount = number => {
        number === 10 ? (
            this.setState({ amount: 0 }, () => this.setState({ formattedAmount: this.cashify(this.state.amount) }))
        )
            : (
                ((this.state.amount * 1000) + number) * 0.01 <= 9999999.99 ? (
                    this.setState({ amount: ((this.state.amount * 1000) + number) * 0.01 }, function () {
                        this.setState({ formattedAmount: this.cashify(this.state.amount) });
                    })) : (
                        this.setState({ amount: 9999999.99 }, function () {
                            this.setState({ formattedAmount: this.cashify(this.state.amount) });
                        }))
            )
    }
    changeAccountType(type) {
        switch (type) {
            case 1: {
                this.setState({ cashBottomWidth: 2 }, function () {
                    this.setState({
                        bankBottomWidth: 0,
                        cardBottomWidth: 0
                    })
                })
                break;
            }
            case 2: {
                this.setState({ bankBottomWidth: 2 }, function () {
                    this.setState({
                        cashBottomWidth: 0,
                        cardBottomWidth: 0
                    })
                })
                break;
            }
            case 3: {
                this.setState({ cardBottomWidth: 2 }, function () {
                    this.setState({
                        bankBottomWidth: 0,
                        cashBottomWidth: 0
                    })
                })
                break;
            }
        }
    }
    changeProvider(type) {
        switch (type) {
            case 1: {
                this.setState({ visaBottomWidth: 2 }, function () {
                    this.setState({
                        mcBottomWidth: 0,
                        amexBottomWidth: 0,
                        provider: 'VISA',
                        providerLogo: require('../../../assets/img/icons/visa.png')
                    })
                })
                break;
            }
            case 2: {
                this.setState({ mcBottomWidth: 2 }, function () {
                    this.setState({
                        visaBottomWidth: 0,
                        amexBottomWidth: 0,
                        provider: 'MC',
                        providerLogo: require('../../../assets/img/icons/mastercard.png')
                    })
                })
                break;
            }
            case 3: {
                this.setState({ amexBottomWidth: 2 }, function () {
                    this.setState({
                        visaBottomWidth: 0,
                        mcBottomWidth: 0,
                        provider: 'AMEX',
                        providerLogo: require('../../../assets/img/icons/amex.png')
                    })
                })
                break;
            }
        }
    }

    backAction = NavigationActions.back();
    setBankModalVisible(visible) {
        this.setState({ bankModalVisible: visible });
    }
    setDebitModalVisible(visible) {
        this.setState({ debitModalVisible: visible });
    }
    searchBank(query) {
        let result = [];
        for (let val of banks) {
            let searchIn = removeDiacritics(val.toLowerCase());
            let term = removeDiacritics(query.toLowerCase())
            if (searchIn.search(term) >= 0) {
                result.push(val)
            }
        }
        this.setState({ bankSearchResult: result })
    }
    changeBank(obj) {
        this.setState({ bank: obj })
        this.setBankModalVisible(!this.state.bankModalVisible)
        this.setState({ bankSearchResult: banks })
    }
    addCard() {
        let newCard = {
            lastFour: this.state.lastFour,
            provider: this.state.provider,
            providerLogo: this.state.providerLogo
        }
        this.setState({debitCard: newCard})
        this.setDebitModalVisible(!this.state.debitModalVisible)
    }
    addCreditCard() {

    }
    render() {
        return (
            <ParallaxScroll
                style={{ backgroundColor: '#2C2F33' }}
                parallaxHeight={500}
                renderParallaxForeground={() => (
                    <View style={{ height: 500, zIndex: 0, alignItems: 'center', justifyContent: 'center', zIndex: -100 }}>
                        <Text style={{ color: 'white', fontFamily: 'Circular', marginBottom: 3 }}>Balance de la {this.state.cardBottomWidth != 0 ? 'tarjeta' : 'cuenta'}:</Text>
                        <Text style={{ fontFamily: 'Circular', color: '#FFF', fontSize: 34, marginBottom: 10 }}>RD${this.state.formattedAmount}</Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.changeAmount(1)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>1</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(2)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>2</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(3)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>3</Text></View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.changeAmount(4)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>4</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(5)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>5</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(6)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>6</Text></View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.changeAmount(7)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>7</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(8)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>8</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(9)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>9</Text></View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity>
                                    <View style={styles.circleBlank}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(0)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>0</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.changeAmount(10)}>
                                    <View style={styles.circleBlank}><Text style={{ color: 'white', fontFamily: 'Circular', fontSize: 30 }}>{"x"}</Text></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}>
                <View style={{ backgroundColor: 'white', borderRadius: 10, marginHorizontal: 10, zIndex: 100, height: (Dimensions.get('window').height - 85) }}>
                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', height: 95 }}>
                        <View style={{ flex: 1, padding: 3, alignItems: 'center', height: 85, borderBottomColor: '#24E189', borderBottomWidth: this.state.cashBottomWidth }}>
                            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.changeAccountType(1)}><Image
                                style={{ width: 40, height: 40, alignSelf: 'center' }}
                                source={require('../../../assets/img/addpayment/cash.png')}
                            />
                                <Text style={{ textAlign: 'center', marginBottom: 4, fontFamily: 'Circular', color: '#C7C7C7' }}>Efectivo</Text></TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, padding: 3, alignItems: 'center', height: 85, borderBottomColor: '#24E189', borderBottomWidth: this.state.bankBottomWidth }}>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.changeAccountType(2)}><Image
                                style={{ width: 40, height: 40, alignSelf: 'center' }}
                                source={require('../../../assets/img/addpayment/bank.png')}
                            /><Text style={{ textAlign: 'center', marginBottom: 4, fontFamily: 'Circular', color: '#C7C7C7' }}>Cuenta de ahorros</Text></TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, padding: 3, alignItems: 'center', height: 85, borderBottomColor: '#24E189', borderBottomWidth: this.state.cardBottomWidth }}>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.changeAccountType(3)}><Image
                                style={{ width: 40, height: 40, alignSelf: 'center' }}
                                source={require('../../../assets/img/addpayment/credit-card.png')}
                            /><Text style={{ textAlign: 'center', marginBottom: 4, fontFamily: 'Circular', color: '#C7C7C7' }}>Tarjeta de crédito</Text></TouchableOpacity>
                        </View>
                    </View>
                    {
                        this.state.cashBottomWidth != 0 && (
                            <View>
                                <TextInput
                                    placeholder="Nombre de la cuenta"
                                    style={{ fontFamily: 'Circular' }}
                                    placeholderTextColor="#787878"
                                    underlineColorAndroid="#787878" />
                                <View style={styles.buttonsContainer}>
                                    <Button
                                        style={styles.buttons}
                                        color="#24E189"
                                        onPress={() => this.props.navigation.dispatch(this.resetAction)}
                                        title="Crear cuenta"
                                    />
                                </View>
                            </View>
                        )
                    }

                    {
                        this.state.bankBottomWidth != 0 && (
                            <View>
                                <Modal
                                    animationType="slide"
                                    visible={this.state.bankModalVisible}
                                    onRequestClose={() => { this.setBankModalVisible(!this.state.bankModalVisible) }}>
                                    <ScrollView flex={1}>
                                        <SearchBar
                                            inputStyle={{ fontFamily: 'Circular' }}
                                            placeholder='Buscar banco'
                                            onChangeText={(text) => this.searchBank(text)} />
                                        <List>
                                            {
                                                this.state.bankSearchResult.map((l, i) => (
                                                    <ListItem
                                                        fontFamily={'Circular'}
                                                        title={l}
                                                        hideChevron={true}
                                                        onPress={() => this.changeBank(l)}
                                                        key={i}
                                                    />
                                                ))
                                            }
                                        </List>
                                    </ScrollView>
                                </Modal>
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={this.state.debitModalVisible}
                                    onRequestClose={() => { this.setDebitModalVisible(!this.state.debitModalVisible) }}>
                                    <View style={{ paddingHorizontal: 10, flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(44, 47, 51, 0.9)', justifyContent: 'center' }}>
                                        <View style={{ flex: 1, paddingVertical: 5, backgroundColor: 'white' }}>
                                            <Text style={{fontFamily: 'Circular', color: 'black', fontSize: 18, textAlign: 'center'}}>{this.state.debitCard != null ? 'Editar' : 'Agregar'} tarjeta de débito</Text>
                                            
                                            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                            <View style={{ flex: 1, padding: 3, alignItems: 'center' }}>
                                                <TouchableOpacity style={{ alignItems: 'center', height: 45, width: 60, borderBottomColor: '#24E189', borderBottomWidth: this.state.visaBottomWidth }} onPress={() => this.changeProvider(1)}><Image
                                                    style={{ width: 40, height: 40, alignSelf: 'center' }}
                                                    source={require('../../../assets/img/icons/visa.png')}
                                                /></TouchableOpacity>
                                            </View>
                                            <View style={{ flex: 1, padding: 3, alignItems: 'center' }}>
                                                <TouchableOpacity style={{ alignSelf: 'center', height: 45, width: 60, borderBottomColor: '#24E189', borderBottomWidth: this.state.mcBottomWidth }} onPress={() => this.changeProvider(2)}><Image
                                                    style={{ width: 40, height: 40, alignSelf: 'center' }}
                                                    source={require('../../../assets/img/icons/mastercard.png')}
                                                /></TouchableOpacity>
                                            </View>
                                            <View style={{ flex: 1, padding: 3, alignItems: 'center' }}>
                                                <TouchableOpacity style={{ alignSelf: 'center', height: 45, width: 60, borderBottomColor: '#24E189', borderBottomWidth: this.state.amexBottomWidth }} onPress={() => this.changeProvider(3)}><Image
                                                    style={{ width: 40, height: 40, alignSelf: 'center' }}
                                                    source={require('../../../assets/img/icons/amex.png')}
                                                /></TouchableOpacity>
                                            </View>
                                        </View>
                                        <TextInput
                                        placeholder="Últimos 4 dígitos"
                                        style={{ fontFamily: 'Circular' }}
                                        placeholderTextColor="#787878"
                                        underlineColorAndroid="#787878"
                                        value={this.state.lastFour}
                                        onChangeText={(text) => this.setState({lastFour: text})} />
                                        <View style={{ marginHorizontal: 5, backgroundColor: 'gray' }}>
                                        <Text style={{ color: 'white', fontFamily: 'Circular', padding: 10 }}>Chelify
                                        utiliza los cuatro últimos dígitos de tu tarjeta para que puedas identificarla en las
                                        transacciones. Nunca utilizaremos la información sumistrada para otro fin, como establece
                                        nuestra política de privacidad</Text>
                                    </View>
                                        <View style={[styles.buttonsContainer, {marginBottom: 10}]}>
                                            <Button
                                                style={styles.buttons}
                                                color="#24E189"
                                                onPress={() => this.addCard()}
                                                title="Guardar tarjeta"
                                            />
                                            <Button
                                                style={styles.buttons}
                                                color="#24E189"
                                                onPress={() => this.setDebitModalVisible(!this.state.debitModalVisible)}
                                                title="Cancelar"
                                            />
                                        </View>
                                        </View>
                                    </View>
                                </Modal>
                                {
                                    this.state.bank != '' ? (
                                        <ListItem
                                            title={this.state.bank}
                                            onPress={() => { this.setBankModalVisible(true) }}
                                            hideChevron={true}
                                            fontFamily={'Circular'}
                                            leftIcon={<Image
                                                style={{ width: 24, height: 24, marginRight: 6 }}
                                                source={require('../../../assets/img/addpayment/ancient.png')}
                                            />}
                                        />
                                    ) : (
                                            <ListItem
                                                title={'Seleccionar banco'}
                                                onPress={() => { this.setBankModalVisible(true) }}
                                                hideChevron={true}
                                                fontFamily={'Circular'}
                                                leftIcon={<Image
                                                    style={{ width: 24, height: 24, marginRight: 6 }}
                                                    source={require('../../../assets/img/addpayment/ancient.png')}
                                                />}
                                            />
                                        )}
                                        {
                                            this.state.debitCard != null ? (
                                                <ListItem
                                                    title={"Tarjeta de débito " + this.state.debitCard.provider + " " + this.state.debitCard.lastFour}
                                                    onPress={() => { this.setDebitModalVisible(true) }}
                                                    hideChevron={true}
                                                    fontFamily={'Circular'}
                                                    leftIcon={<Image
                                                        style={{ width: 24, height: 24, marginRight: 6 }}
                                                        source={this.state.debitCard.providerLogo}
                                                    />}
                                                />
                                            ) : (
                                                    <ListItem
                                                        title={'Agregar tarjeta'}
                                                        onPress={() => { this.setDebitModalVisible(true) }}
                                                        hideChevron={true}
                                                        fontFamily={'Circular'}
                                                        leftIcon={<Image
                                                            style={{ width: 24, height: 24, marginRight: 6 }}
                                                            source={require('../../../assets/img/welcome/screen2.png')}
                                                        />}
                                                    />
                                                )}
                                                <View style={[styles.buttonsContainer, {marginBottom: 10}]}>
                                                <Button
                                                    style={styles.buttons}
                                                    color="#24E189"
                                                    onPress={() => this.addCreditCard()}
                                                    title="Agregar cuenta"
                                                />
                                            </View>
                            </View>
                        )
                    }

                    {
                        this.state.cardBottomWidth != 0 && (
                            <View>
                            {
                                this.state.bank != '' ? (
                                    <ListItem
                                        title={this.state.bank}
                                        onPress={() => { this.setBankModalVisible(true) }}
                                        hideChevron={true}
                                        fontFamily={'Circular'}
                                        leftIcon={<Image
                                            style={{ width: 24, height: 24, marginRight: 6 }}
                                            source={require('../../../assets/img/addpayment/ancient.png')}
                                        />}
                                    />
                                ) : (
                                        <ListItem
                                            title={'Seleccionar banco'}
                                            onPress={() => { this.setBankModalVisible(true) }}
                                            hideChevron={true}
                                            fontFamily={'Circular'}
                                            leftIcon={<Image
                                                style={{ width: 24, height: 24, marginRight: 6 }}
                                                source={require('../../../assets/img/addpayment/ancient.png')}
                                            />}
                                        />
                                    )}
                             <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                <View style={{ flex: 1, padding: 3, alignItems: 'center' }}>
                                    <TouchableOpacity style={{ alignItems: 'center', height: 45, width: 60, borderBottomColor: '#24E189', borderBottomWidth: this.state.visaBottomWidth }} onPress={() => this.changeProvider(1)}><Image
                                        style={{ width: 40, height: 40, alignSelf: 'center' }}
                                        source={require('../../../assets/img/icons/visa.png')}
                                    /></TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, padding: 3, alignItems: 'center' }}>
                                    <TouchableOpacity style={{ alignSelf: 'center', height: 45, width: 60, borderBottomColor: '#24E189', borderBottomWidth: this.state.mcBottomWidth }} onPress={() => this.changeProvider(2)}><Image
                                        style={{ width: 40, height: 40, alignSelf: 'center' }}
                                        source={require('../../../assets/img/icons/mastercard.png')}
                                    /></TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, padding: 3, alignItems: 'center' }}>
                                    <TouchableOpacity style={{ alignSelf: 'center', height: 45, width: 60, borderBottomColor: '#24E189', borderBottomWidth: this.state.amexBottomWidth }} onPress={() => this.changeProvider(3)}><Image
                                        style={{ width: 40, height: 40, alignSelf: 'center' }}
                                        source={require('../../../assets/img/icons/amex.png')}
                                    /></TouchableOpacity>
                                </View>
                            </View>
                            <TextInput
                            placeholder="Últimos 4 dígitos"
                            style={{ fontFamily: 'Circular' }}
                            placeholderTextColor="#787878"
                            underlineColorAndroid="#787878"
                            value={this.state.lastFour}
                            onChangeText={(text) => this.setState({lastFour: text})} />
                            <View style={{ marginHorizontal: 5, backgroundColor: 'gray' }}>
                            <Text style={{ color: 'white', fontFamily: 'Circular', padding: 10 }}>Chelify
                            utiliza los cuatro últimos dígitos de tu tarjeta para que puedas identificarla en las
                            transacciones. Nunca utilizaremos la información sumistrada para otro fin, como establece
                            nuestra política de privacidad</Text>
                        </View>
                            <View style={[styles.buttonsContainer, {marginBottom: 10}]}>
                                <Button
                                    style={styles.buttons}
                                    color="#24E189"
                                    onPress={() => this.addCreditCard()}
                                    title="Agregar tarjeta"
                                />
                            </View>
                            </View>
                        )
                    }

                </View>

            </ParallaxScroll>
        )
    }
}

export class ErrorReporting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenshot1: require('../../../assets/img/placeholder.png'),
            screenshot2: require('../../../assets/img/placeholder.png'),
            screenshot3: require('../../../assets/img/placeholder.png')
        }
    }
    static navigationOptions = {
        title: 'Reportar error',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" size={15} color="#FFF" />
        ),
    }
    backAction = NavigationActions.back();

    options = {
        title: 'Seleccionar foto de perfil',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    addScreenshot(img) {
        ImagePicker.launchImageLibrary(this.options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                switch (img) {
                    case 1: {
                        this.setState({
                            screenshot1: source
                        });
                        break;
                    }
                    case 2: {
                        this.setState({
                            screenshot2: source
                        });
                        break;
                    }
                    case 3: {
                        this.setState({
                            screenshot3: source
                        });
                        break;
                    }
                }

            }
        });
    }
    pushError() {
        this.props.navigation.dispatch(this.backAction);
        ToastAndroid.show('Se ha enviado el reporte. ¡Gracias por la retroalimentación!', ToastAndroid.SHORT)
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <TextInput
                    numberOfLines={4}
                    multiline={true}
                    style={{ textAlignVertical: 'top' }}
                    placeholder={"Descripción del error"} />
                <Card title={"Agregar screenshots:"} titleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => this.addScreenshot(1)}>
                            <Image style={{ width: 90, height: 160 }} source={this.state.screenshot1} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => this.addScreenshot(2)}>
                            <Image style={{ width: 90, height: 160 }} source={this.state.screenshot2} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => this.addScreenshot(3)}>
                            <Image style={{ width: 90, height: 160 }} source={this.state.screenshot3} />
                        </TouchableOpacity>
                    </View>
                </Card>
                <View style={styles.buttonsContainer}>
                    <Button
                        style={styles.buttons}
                        color="#24E189"
                        onPress={() => this.pushError()}
                        title="Aceptar"
                    />
                </View>
            </View>
        )
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
        return (<View style={{ flex: 1 }}><Text>Placeholder</Text></View>)
    }
}


const mapStateToProps = (state) => ({
    transactions: state.transactions
});

const OptionsStack = StackNavigator({
    Options: {
        screen: connect(mapStateToProps)(Options)
    },
    Payments: {
        screen: connect(mapStateToProps)(Payments),
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    },
    AddPayment: {
        screen: connect(mapStateToProps)(AddPayment),
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    },
    Recurring: {
        screen: connect(mapStateToProps)(RecurringTransactions),
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    },
    AddRecurring: {
        screen: connect(mapStateToProps)(AddRecurringTransactions),
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    },
    ErrorReporting: {
        screen: connect(mapStateToProps)(ErrorReporting),
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    },
    LegalInfo: {
        screen: connect(mapStateToProps)(LegalInfo),
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    }
})

export default OptionsStack;