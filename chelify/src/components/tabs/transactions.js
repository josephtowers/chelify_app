import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    Image,
    TextInput,
    RefreshControl,
    CheckBox,
    StatusBar,
    AsyncStorage,
    ScrollView,
    ToastAndroid,
    Alert,
    Modal,
    Dimensions,
    BackHandler,
    Linking,
    TouchableOpacity,
    ActivityIndicator,
    TouchableNativeFeedback,
    Picker
} from 'react-native';
import MapView from 'react-native-maps'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import styles from '../../styles/style.js'
import removeDiacritics from '../../util/removeDiacritics.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions, StackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper';
import ActionButton from 'react-native-action-button';
import {
    Card,
    List,
    ListView,
    ListItem,
    SearchBar,
    FormLabel,
    FormInput,
    FormValidationMessage,
    Divider
} from 'react-native-elements';
import { connect } from 'react-redux'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import transactions from '../../api/transactions'
import payments from '../../api/payments'
import categoryIcons from '../../util/icons'
import Settings from '../../settings'

let formatDate = (date, time) => {
    let year = new Date().getFullYear()
    let day = new Date().getDate()
    let month = new Date().getMonth()
    let finalDate = ""
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
        'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    let dateParts = date.split(/[- :]/)
    if (dateParts[2][0] == '0') dateParts[2] = dateParts[2].substring(1, 2)
    if (day.toString() == dateParts[2] && (month + 1) == parseInt(dateParts[1]) && year == parseInt(dateParts[0])) {
        finalDate = "Hoy"
    }
    else finalDate = dateParts[2] + " de " + months[dateParts[1] - 1].toLowerCase()
    year.toString() != dateParts[0] && (finalDate += " del " + dateParts[0])
    time && (finalDate += " a las " + dateParts[3] + ":" + dateParts[4])
    return finalDate

}

let groupTransactionsByDate = (arr) => {
    let res = []
    let dates = []
    for (let trans of arr) {
        let d = formatDate(trans.created_at)
        if (dates.indexOf(d) == -1) {
            dates.push(d)
        }
    }
    for (let ds of dates) {
        let ts = []
        for (let trans of arr) {
            let d = formatDate(trans.created_at)
            if (ds == d) {
                ts.push(trans)
            }
        }
        let newGroup = {
            date: ds,
            transactions: ts
        }
        res.push(newGroup)
    }
    return res
}

const categories = [
    {
        name: "Depósito",
        avatar: require('../../../assets/img/icons/deposit.png')
    },
    {
        name: "Ropa",
        avatar: require('../../../assets/img/icons/clothes.png')
    },
    {
        name: "Alcohol",
        avatar: require('../../../assets/img/icons/alcohol.png')
    },
    {
        name: "Combustible",
        avatar: require('../../../assets/img/icons/gas.png')
    }

];


export class Transactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trans: transactions,
            loading: true,
            user: null,
        }
    }
    static navigationOptions = {
        title: 'Transacciones',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="credit-card" size={15} color="#FFF" />
        ),
    }
    async getUser() {
        try {
            if (this.state.user == null) {
                let user = await AsyncStorage.getItem('currentUser');
                let value = JSON.parse(user);
                if (value !== null) {
                    this.setState({ user: value.user }, () => {
                        this.getTransactions();
                    })
                }
            }
        } catch (error) {
            ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)

        }
    }
    getTransactions() {
        fetch(Settings.baseUrl + "/api/transaction/by-account/" + this.state.user.account_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + this.state.user.access_token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ trans: responseJson.transactions, loading: false, refreshing: false })
            })
            .catch((error) => {
                ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)


            });
    }
    getIcon(name) {
        for (let obj of categoryIcons) {
            if (obj.name == name) {
                return obj.source
            }
        }
        return null

    }
    componentWillMount() {
        this.getUser();
    }
    _onRefresh() {
        this.setState({ refreshing: true }, () => this.getTransactions());
    }

    update() {
        this._onRefresh()
    }
    cashify(amountIn) {

        let amount = parseFloat(amountIn).toFixed(2);
        // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
        let splitAmount = amount.split(".")[0];
        let i = splitAmount.length - 4;

        while (i >= 0) {
            splitAmount = splitAmount.slice(0, i + 1) + "," + splitAmount.slice(i + 1);
            i = i - 3;
        }
        return splitAmount + "." + amount.split(".")[1];

    }

    render() {

        return (
            !this.state.loading ? (
                this.state.trans.length > 0 ? (
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            refreshControl={<RefreshControl
                                enabled={true}
                                refreshing={this.state.refreshing}
                                onRefresh={() => (this._onRefresh())}
                            />}>
                            <StatusBar backgroundColor="#2C2F33" barStyle="light-content" />

                            <View style={{ alignSelf: 'stretch', alignItems: 'center', marginTop: 20 }}>
                                {
                                    groupTransactionsByDate(this.state.trans).map((j, l) => (
                                        <View key={l} style={{ alignSelf: 'stretch', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'Circular' }}>{j.date}</Text>
                                            <List containerStyle={{ marginBottom: 10, alignSelf: 'stretch' }}>
                                                {
                                                    j.transactions.map((m, i) => (
                                                        <ListItem
                                                            key={i}
                                                            title={m.title}
                                                            hideChevron={true}
                                                            avatarStyle={{ backgroundColor: 'white' }}
                                                            avatar={this.getIcon(m.category.icon)}
                                                            subtitle={m.category.name}
                                                            subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                                            rightTitleNumberOfLines={2}
                                                            fontFamily="Circular"
                                                            rightTitle={"RD$" + this.cashify(m.amount)}
                                                            rightTitleStyle={{ fontFamily: 'Circular', textAlign: 'right' }}
                                                            onPress={() => this.props.navigation.navigate('Trans', { name: m.name, data: m, onSuccess: () => this.update() })}
                                                        />

                                                    ))}
                                            </List>
                                        </View>
                                    ))
                                }

                            </View>

                        </ScrollView>
                        <ActionButton
                            buttonColor="#24E189"
                            onPress={() => this.props.navigation.navigate('Add', { onSuccess: () => this.update() })}
                        />
                    </View>
                ) : (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 15 }}>
                                <TouchableNativeFeedback
                                >
                                    <Image
                                        style={{ width: 128, height: 128 }}
                                        source={require('../../../assets/img/receipt.png')}
                                    />
                                </TouchableNativeFeedback>
                                <Text style={{ fontFamily: 'Circular', fontSize: 20, textAlign: 'center', marginTop: 10 }}>No tienes transacciones. ¡Utiliza el botón para crear una!</Text>
                            </View>
                            <ActionButton
                                buttonColor="#24E189"
                                onPress={() => this.props.navigation.navigate('Add', { onSuccess: () => this.update() })}
                            />
                        </View>
                    )
            ) : (
                    <View style={styles.whiteContainer}>
                        <ActivityIndicator size="large" color="#24E189" animating={this.state.loading} />
                    </View>
                ))
    }
}


export class AddTransaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: "",
            loading: true,
            inputValue: 10,
            modalVisible: false,
            paymentModalVisible: false,
            dayId: 0,
            id: 0,
            name: "",
            description: "",
            user: null,
            payment: null,
            paymentName: "",
            amount: 0,
            categories: null,
            payments: null,
            category: null,
            categoryName: "",
            date: 'Hoy a las 11:09PM',
            searchResult: categories,
            paymentSearchResult: payments,
            formattedAmount: '0.00',
            places: [],
            locationModalVisible: false,
            isLocationLoading: false,
            location: null

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
            <Icon name="credit-card" size={15} color="#FFF" />
        ),
    }

    backAction = NavigationActions.back();

    timeout = null;
    searchLocation(query) {

        clearTimeout(this.timeout);
        let changeLocationStateToTrue = () => this.setState({ isLocationLoading: true });
        let changeLocation = (obj) => this.setState({ places: obj }, this.setState({ isLocationLoading: false }));
        let changeLocationStateToFalse = () => this.setState({ isLocationLoading: false });
        // Make a new timeout set to go off in 800ms
        this.timeout = setTimeout(function () {
            changeLocationStateToTrue();
            fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyCjcuW_DPA0pRKBTvkJjDqapNshQH1Mrss&location=18.4874874,-69.9645857&radius=50000&query=" + query, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((responseJson) => {
                    changeLocation(responseJson.results)
                })
                .catch((error) => {
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);

                });
        }, 1000);

    }
    searchPayment(query) {
        let result = [];
        for (let val of this.state.payments) {
            let searchIn = removeDiacritics(val.name.toLowerCase());
            let term = removeDiacritics(query.toLowerCase())
            if (searchIn.search(term) >= 0) {
                result.push(val)
            }
        }
        this.setState({ paymentSearchResult: result })
    }
    searchCategory(query) {
        let result = [];
        for (let val of this.state.categories) {
            let searchIn = removeDiacritics(val.name.toLowerCase());
            let term = removeDiacritics(query.toLowerCase())
            if (searchIn.search(term) >= 0) {
                result.push(val)
            }
        }
        this.setState({ searchResult: result })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setLocationModalVisible(visible) {
        this.setState({ locationModalVisible: visible });
    }

    setPaymentModalVisible(visible) {
        this.setState({ paymentModalVisible: visible });
    }
    truncator(numToTruncate, intDecimalPlaces) {
        let numPower = Math.pow(10, intDecimalPlaces); // "numPowerConverter" might be better
        return ~~(numToTruncate * numPower) / numPower;
    }
    cashify(amountIn) {

        let amount = parseFloat(amountIn).toFixed(2);
        // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
        let splitAmount = amount.split(".")[0];
        let i = splitAmount.length - 4;

        while (i >= 0) {
            splitAmount = splitAmount.slice(0, i + 1) + "," + splitAmount.slice(i + 1);
            i = i - 3;
        }
        return splitAmount + "." + amount.split(".")[1];

    }
    changeCategory(obj) {
        this.setState({ category: obj })
        this.setModalVisible(!this.state.modalVisible)
        this.setState({ searchResult: this.state.categories })
    }
    changePayment(obj) {
        this.setState({ payment: obj })
        this.setPaymentModalVisible(!this.state.paymentModalVisible)
        this.setState({ paymentSearchResult: this.state.payments })
    }
    changeLocation(obj) {
        this.setState({ location: obj })
        this.setLocationModalVisible(!this.state.locationModalVisible)
        this.setState({ places: [] })
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
    pushTransaction() {
        let newTransaction = {
            google_place_id: this.state.location.place_id,
            title: this.state.name,
            amount: this.state.amount,
            financial_instrument_id: this.state.payment.id,
            transaction_category_id: this.state.category.id,
            description: this.state.description
        }

        fetch(Settings.baseUrl + "/api/transaction", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTransaction)
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.navigation.state.params.onSuccess();
                this.props.navigation.dispatch(this.backAction);
                ToastAndroid.show('La transacción se ha agregado', ToastAndroid.SHORT)
            })
            .catch((error) => {
                ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)


            });

    }
    async getUser() {
        try {
            if (this.state.user == null) {
                let user = await AsyncStorage.getItem('currentUser');
                let value = JSON.parse(user);
                if (value !== null) {
                    this.setState({ user: value.user }, () =>
                        this.getCategories())
                }
            }
        } catch (error) {
            ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)


        }
    }
    getInstruments() {
        fetch(Settings.baseUrl + "/api/financial-instrument/by-account/" + this.state.user.account_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    paymentSearchResult: responseJson.financial_instruments,
                    payments: responseJson.financial_instruments,
                    loading: false
                })
            })
            .catch((error) => {
                ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)


            });
    }
    getCategories() {
        fetch(Settings.baseUrl + "/api/transaction-category", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    searchResult: responseJson.transaction_categories,
                    categories: responseJson.transaction_categories
                }, () =>
                        this.getInstruments())
            })
            .catch((error) => {
                ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)


            });
    }
    getIcon(name) {
        for (let obj of categoryIcons) {
            if (obj.name == name) {
                return obj.source
            }
        }
        return null

    }
    componentWillMount() {
        this.setState({ loading: true }, () => this.getUser())
    }
    render() {
        return (
            !this.state.loading ? (
                <ParallaxScroll
                    style={{ backgroundColor: '#2C2F33' }}
                    parallaxHeight={500}
                    renderParallaxForeground={() => (
                        <View style={{ height: 500, zIndex: 0, alignItems: 'center', justifyContent: 'center', zIndex: -100 }}>
                            <Text style={{ color: 'white', fontFamily: 'Circular', marginBottom: 3 }}>Monto de la transacción:</Text>
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
                            visible={this.state.modalVisible}
                            onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}>
                            <ScrollView flex={1}>
                                <SearchBar
                                    inputStyle={{ fontFamily: 'Circular' }}
                                    placeholder='Buscar categoría'
                                    onChangeText={(text) => this.searchCategory(text)} />
                                <List>
                                    {
                                        this.state.searchResult.map((l, i) => (
                                            <ListItem
                                                avatar={this.getIcon(l.icon)}
                                                avatarStyle={{ backgroundColor: 'white' }}
                                                fontFamily={'Circular'}
                                                title={l.name}
                                                hideChevron={true}
                                                onPress={() => this.changeCategory(l)}
                                                key={i}
                                            />
                                        ))
                                    }
                                </List>
                            </ScrollView>
                        </Modal>
                        <Modal
                            animationType="slide"
                            visible={this.state.paymentModalVisible}
                            onRequestClose={() => { this.setPaymentModalVisible(!this.state.paymentModalVisible) }}>
                            <ScrollView flex={1}>
                                <SearchBar
                                    inputStyle={{ fontFamily: 'Circular' }}
                                    placeholder='Buscar método de pago'
                                    onChangeText={(text) => this.searchPayment(text)} />
                                <List>
                                    {
                                        this.state.paymentSearchResult.map((l, i) => (
                                            <ListItem
                                                avatarStyle={{ backgroundColor: 'white' }}
                                                fontFamily={'Circular'}
                                                title={l.identifier}
                                                hideChevron={true}
                                                onPress={() => this.changePayment(l)}
                                                key={i}
                                            />
                                        ))
                                    }
                                </List>
                            </ScrollView>
                        </Modal>
                        <Modal
                            animationType="slide"
                            visible={this.state.locationModalVisible}
                            onRequestClose={() => { this.setLocationModalVisible(!this.state.locationModalVisible) }}>
                            <ScrollView flex={1}>
                                <SearchBar
                                    inputStyle={{ fontFamily: 'Circular' }}
                                    placeholder='Agregar ubicación'
                                    onChangeText={(text) => this.searchLocation(text)} />
                                {
                                    this.state.isLocationLoading ? <ActivityIndicator style={{ marginTop: 30 }} size="large" color="#24E189" /> : (
                                        <List>
                                            {
                                                this.state.places.map((l, i) => (
                                                    <ListItem
                                                        fontFamily={'Circular'}
                                                        title={l.name}
                                                        subtitle={l.formatted_address}
                                                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                                        hideChevron={true}
                                                        onPress={() => this.changeLocation(l)}
                                                        key={i}
                                                    />
                                                ))
                                            }
                                        </List>
                                    )
                                }

                            </ScrollView>
                        </Modal>

                        <List style={{ marginVertical: 5 }}>
                            {
                                this.state.category != null ? (
                                    <ListItem
                                        title={this.state.category.name}
                                        onPress={() => { this.setModalVisible(true) }}
                                        hideChevron={true}
                                        fontFamily={'Circular'}
                                        leftIcon={<Image
                                            style={{ width: 24, height: 24, marginRight: 6 }}
                                            source={this.getIcon(this.state.category.icon)}
                                        />}
                                    />
                                ) : (
                                        <ListItem
                                            title={'Seleccionar categoría'}
                                            onPress={() => { this.setModalVisible(true) }}
                                            hideChevron={true}
                                            fontFamily={'Circular'}
                                            leftIcon={<Image
                                                style={{ width: 24, height: 24, marginRight: 6 }}
                                                source={require('../../../assets/img/icons/category.png')}
                                            />}
                                        />
                                    )}
                            {
                                this.state.payment != null ? (
                                    <ListItem
                                        title={this.state.payment.identifier}
                                        onPress={() => { this.setPaymentModalVisible(true) }}
                                        hideChevron={true}
                                        fontFamily={'Circular'}
                                        leftIcon={<Image
                                            style={{ width: 24, height: 24, marginRight: 6 }}
                                            source={require('../../../assets/img/icons/point-of-service.png')}
                                        />}
                                    />
                                ) : (
                                        <ListItem
                                            title={'¿Cómo pagaste?'}
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
                            {
                                this.state.location != null ? (
                                    <ListItem
                                        title={this.state.location.name}
                                        onPress={() => { this.setLocationModalVisible(true) }}
                                        hideChevron={true}
                                        fontFamily={'Circular'}
                                        leftIcon={<Image
                                            style={{ width: 24, height: 24, marginRight: 6 }}
                                            source={require('../../../assets/img/icons/placeholder.png')}
                                        />}
                                    />
                                ) : (
                                        <ListItem
                                            title={'Agregar ubicación'}
                                            onPress={() => { this.setLocationModalVisible(true) }}
                                            hideChevron={true}
                                            fontFamily={'Circular'}
                                            leftIcon={<Image
                                                style={{ width: 24, height: 24, marginRight: 6 }}
                                                source={require('../../../assets/img/icons/map.png')}
                                            />}
                                        />
                                    )
                            }


                        </List>
                        <TextInput
                            placeholder="Nombre"
                            placeholderTextColor="#787878"
                            underlineColorAndroid="#787878"
                            value={this.state.name}
                            style={{fontFamily: 'Circular'}}
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                        <TextInput
                            placeholder="Descripción"
                            placeholderTextColor="#787878"
                            underlineColorAndroid="#787878"
                            value={this.state.description}
                            style={{fontFamily: 'Circular'}}
                            onChangeText={(text) => this.setState({ description: text })}
                        />
                        <View style={styles.buttonsContainer}>
                            <Button
                                style={styles.buttons}
                                color="#24E189"
                                onPress={() => this.pushTransaction()}
                                title="Aceptar"
                            />
                        </View>
                    </View>
                </ParallaxScroll>) : (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#24E189" animating={this.state.loading} />
                    </View>
                )
        )
    }
}


export class EditTransaction extends React.Component {

    constructor(props) {
        super(props);
        const data = this.props.navigation.state.params.data;
        this.state = {
            language: "",
            loading: true,
            inputValue: 10,
            modalVisible: false,
            paymentModalVisible: false,
            dayId: 0,
            id: data.id,
            name: data.title,
            description: data.description,
            user: null,
            payment: data.financial_instrument,
            paymentName: "",
            amount: data.amount,
            categories: null,
            payments: null,
            category: data.category,
            categoryName: "",
            date: 'Hoy a las 11:09PM',
            searchResult: categories,
            paymentSearchResult: payments,
            formattedAmount: '0.00',
            places: [],
            locationModalVisible: false,
            isLocationLoading: false,
            location: data.place

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
            <Icon name="credit-card" size={15} color="#FFF" />
        ),
    }

    backAction = NavigationActions.back();

    timeout = null;
    searchLocation(query) {

        clearTimeout(this.timeout);
        let changeLocationStateToTrue = () => this.setState({ isLocationLoading: true });
        let changeLocation = (obj) => this.setState({ places: obj }, this.setState({ isLocationLoading: false }));
        let changeLocationStateToFalse = () => this.setState({ isLocationLoading: false });
        // Make a new timeout set to go off in 800ms
        this.timeout = setTimeout(function () {
            changeLocationStateToTrue();
            fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyCjcuW_DPA0pRKBTvkJjDqapNshQH1Mrss&location=18.4874874,-69.9645857&radius=50000&query=" + query, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((responseJson) => {
                    changeLocation(responseJson.results)
                })
                .catch((error) => {
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);

                });
        }, 1000);

    }
    searchPayment(query) {
        let result = [];
        for (let val of this.state.payments) {
            let searchIn = removeDiacritics(val.name.toLowerCase());
            let term = removeDiacritics(query.toLowerCase())
            if (searchIn.search(term) >= 0) {
                result.push(val)
            }
        }
        this.setState({ paymentSearchResult: result })
    }
    searchCategory(query) {
        let result = [];
        for (let val of this.state.categories) {
            let searchIn = removeDiacritics(val.name.toLowerCase());
            let term = removeDiacritics(query.toLowerCase())
            if (searchIn.search(term) >= 0) {
                result.push(val)
            }
        }
        this.setState({ searchResult: result })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setLocationModalVisible(visible) {
        this.setState({ locationModalVisible: visible });
    }

    setPaymentModalVisible(visible) {
        this.setState({ paymentModalVisible: visible });
    }
    truncator(numToTruncate, intDecimalPlaces) {
        let numPower = Math.pow(10, intDecimalPlaces); // "numPowerConverter" might be better
        return ~~(numToTruncate * numPower) / numPower;
    }
    cashify(amountIn) {

        let amount = parseFloat(amountIn).toFixed(2);
        // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
        let splitAmount = amount.split(".")[0];
        let i = splitAmount.length - 4;

        while (i >= 0) {
            splitAmount = splitAmount.slice(0, i + 1) + "," + splitAmount.slice(i + 1);
            i = i - 3;
        }
        return splitAmount + "." + amount.split(".")[1];

    }
    changeCategory(obj) {
        this.setState({ category: obj.avatar, categoryName: obj.name })
        this.setModalVisible(!this.state.modalVisible)
        this.setState({ searchResult: categories })
    }
    changePayment(obj) {
        this.setState({ payment: obj.avatar, paymentName: obj.name })
        this.setPaymentModalVisible(!this.state.paymentModalVisible)
        this.setState({ paymentSearchResult: payments })
    }
    changeLocation(obj) {
        this.setState({ location: obj })
        this.setLocationModalVisible(!this.state.locationModalVisible)
        this.setState({ places: [] })
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
    pushTransaction() {
        let newTransaction = {
            google_place_id: this.state.location.place_id,
            title: this.state.name,
            amount: this.state.amount,
            financial_instrument_id: this.state.payment.id,
            transaction_category_id: this.state.category.id,
            description: this.state.description
        }

        fetch(Settings.baseUrl + "/api/transaction/" + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTransaction)
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.navigation.state.params.onSuccess();
                this.props.navigation.dispatch(this.backAction);
                ToastAndroid.show('La transacción se ha actualizado', ToastAndroid.SHORT)
            })
            .catch((error) => {
                ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)


            });

    }
    async getUser() {
        try {
            if (this.state.user == null) {
                let user = await AsyncStorage.getItem('currentUser');
                let value = JSON.parse(user);
                if (value !== null) {
                    this.setState({ user: value.user }, () =>
                        this.getCategories())
                }
            }
        } catch (error) {
            ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)


        }
    }
    getInstruments() {
        fetch(Settings.baseUrl + "/api/financial-instrument/by-account/" + this.state.user.account_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    paymentSearchResult: responseJson.financial_instruments,
                    payments: responseJson.financial_instruments,
                    loading: false
                })
            })
            .catch((error) => {
                ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)


            });
    }
    getCategories() {
        fetch(Settings.baseUrl + "/api/transaction-category", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    searchResult: responseJson.transaction_categories,
                    categories: responseJson.transaction_categories
                }, () =>
                        this.getInstruments())
            })
            .catch((error) => {
                ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)


            });
    }
    getIcon(name) {
        for (let obj of categoryIcons) {
            if (obj.name == name) {
                return obj.source
            }
        }
        return null

    }
    componentWillMount() {
        this.setState({ loading: true }, () => this.getUser())
    }

    render() {
        return (
            !this.state.loading ? (
                <ParallaxScroll
                    style={{ backgroundColor: '#2C2F33' }}
                    parallaxHeight={500}
                    renderParallaxForeground={() => (
                        <View style={{ height: 500, zIndex: 0, alignItems: 'center', justifyContent: 'center', zIndex: -100 }}>
                            <Text style={{ fontFamily: 'Circular', color: '#FFF', fontSize: 34, marginBottom: 10 }}>RD${this.cashify(this.state.amount)}</Text>
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
                            visible={this.state.modalVisible}
                            onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}>
                            <View flex={1}>
                                <SearchBar
                                    inputStyle={{ fontFamily: 'Circular' }}
                                    placeholder='Buscar categoría'
                                    onChangeText={(text) => this.searchCategory(text)} />
                                <List>
                                    {
                                        this.state.searchResult.map((l, i) => (
                                            <ListItem
                                                avatar={l.avatar}
                                                avatarStyle={{ backgroundColor: 'white' }}
                                                fontFamily={'Circular'}
                                                title={l.name}
                                                hideChevron={true}
                                                onPress={() => this.changeCategory(l)}
                                                key={i}
                                            />
                                        ))
                                    }
                                </List>
                            </View>
                        </Modal>
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
                        <Modal
                            animationType="slide"
                            visible={this.state.locationModalVisible}
                            onRequestClose={() => { this.setLocationModalVisible(!this.state.locationModalVisible) }}>
                            <ScrollView flex={1}>
                                <SearchBar
                                    inputStyle={{ fontFamily: 'Circular' }}
                                    placeholder='Agregar ubicación'
                                    onChangeText={(text) => this.searchLocation(text)} />
                                {
                                    this.state.isLocationLoading ? <ActivityIndicator style={{ marginTop: 30 }} size="large" color="#24E189" /> : (
                                        <List>
                                            {
                                                this.state.places.map((l, i) => (
                                                    <ListItem
                                                        fontFamily={'Circular'}
                                                        title={l.name}
                                                        subtitle={l.formatted_address}
                                                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                                        hideChevron={true}
                                                        onPress={() => this.changeLocation(l)}
                                                        key={i}
                                                    />
                                                ))
                                            }
                                        </List>
                                    )
                                }

                            </ScrollView>
                        </Modal>

                        <List style={{ marginVertical: 5 }}>
                            {
                                this.state.category != null ? (
                                    <ListItem
                                        title={this.state.category.name}
                                        onPress={() => { this.setModalVisible(true) }}
                                        hideChevron={true}
                                        fontFamily={'Circular'}
                                        leftIcon={<Image
                                            style={{ width: 24, height: 24, marginRight: 6 }}
                                            source={this.getIcon(this.state.category.icon)}
                                        />}
                                    />
                                ) : (
                                        <ListItem
                                            title={'Seleccionar categoría'}
                                            onPress={() => { this.setModalVisible(true) }}
                                            hideChevron={true}
                                            fontFamily={'Circular'}
                                            leftIcon={<Image
                                                style={{ width: 24, height: 24, marginRight: 6 }}
                                                source={require('../../../assets/img/icons/category.png')}
                                            />}
                                        />
                                    )}
                            {
                                this.state.payment != null ? (
                                    <ListItem
                                        title={this.state.payment.identifier}
                                        onPress={() => { this.setPaymentModalVisible(true) }}
                                        hideChevron={true}
                                        fontFamily={'Circular'}
                                        leftIcon={<Image
                                            style={{ width: 24, height: 24, marginRight: 6 }}
                                            source={require('../../../assets/img/icons/point-of-service.png')}
                                        />}
                                    />
                                ) : (
                                        <ListItem
                                            title={'¿Cómo pagaste?'}
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
                            {
                                this.state.location != null ? (
                                    <ListItem
                                        title={this.state.location.name}
                                        onPress={() => { this.setLocationModalVisible(true) }}
                                        hideChevron={true}
                                        fontFamily={'Circular'}
                                        leftIcon={<Image
                                            style={{ width: 24, height: 24, marginRight: 6 }}
                                            source={require('../../../assets/img/icons/placeholder.png')}
                                        />}
                                    />
                                ) : (
                                        <ListItem
                                            title={'Agregar ubicación'}
                                            onPress={() => { this.setLocationModalVisible(true) }}
                                            hideChevron={true}
                                            fontFamily={'Circular'}
                                            leftIcon={<Image
                                                style={{ width: 24, height: 24, marginRight: 6 }}
                                                source={require('../../../assets/img/icons/map.png')}
                                            />}
                                        />
                                    )
                            }


                        </List>
                        <TextInput
                            placeholder="Nombre"
                            placeholderTextColor="#787878"
                            underlineColorAndroid="#787878"
                            value={this.state.name}
                            style={{fontFamily: 'Circular'}}
                            onChangeText={(text) => this.setState({ name: text })}
                        />
                        <TextInput
                            placeholder="Descripción"
                            placeholderTextColor="#787878"
                            underlineColorAndroid="#787878"
                            value={this.state.description}
                            style={{fontFamily: 'Circular'}}
                            onChangeText={(text) => this.setState({ description: text })}
                        />
                        <View style={styles.buttonsContainer}>
                            <Button
                                style={styles.buttons}
                                color="#24E189"
                                onPress={() => this.pushTransaction()}
                                title="Aceptar"
                            />
                        </View>
                    </View>
                </ParallaxScroll>
            ) : (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#24E189" animating={this.state.loading} />
                    </View>
                )
        )
    }
}

export class TransactionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            shouldUpdate: false
        }
    }
    static navigationOptions = {
        title: 'Detalle de la transacción',
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
            <Icon name="bar-chart" size={15} color="#FFF" />
        ),
    }
    backAction = NavigationActions.back();
    
    delete() {
        Alert.alert(
            'Eliminar transacción',
            '¿Seguro que quieres borrar esta transacción?',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Eliminar', onPress: () => {
                        fetch(Settings.baseUrl + "/api/transaction/" + this.props.navigation.state.params.data.id, {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            }
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                this.props.navigation.state.params.onSuccess();
                                this.props.navigation.dispatch(this.backAction);
                                ToastAndroid.show('La transacción se ha eliminado', ToastAndroid.SHORT)

                            })
                            .catch((error) => {
                                ToastAndroid.show('No se pudo eliminar la transacción', 3)

                            });

                    }
                },
            ],
            { cancelable: false }
        )
    }
    refresh() {
        this.setState({loading: true}, () => this.getTransactionInfo())
    }
    getIcon(name) {
        for (let obj of categoryIcons) {
            if (obj.name == name) {
                return obj.source
            }
        }
        return null

    }
    cashify(amountIn) {

        let amount = parseFloat(amountIn).toFixed(2);
        // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
        let splitAmount = amount.split(".")[0];
        let i = splitAmount.length - 4;

        while (i >= 0) {
            splitAmount = splitAmount.slice(0, i + 1) + "," + splitAmount.slice(i + 1);
            i = i - 3;
        }
        return splitAmount + "." + amount.split(".")[1];

    }
    getTransactionInfo() {
        let id = this.props.navigation.state.params.data.id
        fetch(Settings.baseUrl + "/api/transaction/" + id, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                this.setState({data: responseJson.transaction, loading: false})
                            })
                            .catch((error) => {
                                ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)

                            });
    }
    componentWillMount() {
        this.getTransactionInfo()
    }
    componentDidMount() {
        
    }
    render() {
        const data = this.state.data;
        return (
            !this.state.loading ? (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ backgroundColor: '#2C2F33', paddingVertical: 15 }}>
                    <View style={{ marginTop: 30 }}>
                        <Card>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 5 }}>
                                        <Text style={{ fontFamily: 'Circular', color: 'black', fontSize: 20 }}>{data.title}</Text>
                                        <Text style={{ fontFamily: 'Circular', fontSize: 12 }}>{data.category.name}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Image
                                            style={{ width: 36, height: 36, marginLeft: 6 }}
                                            source={this.getIcon(data.category.icon)}
                                        />
                                    </View>
                                </View>

                                <Divider style={{ marginVertical: 15, backgroundColor: 'lightgray' }} />
                                <Text style={{ fontFamily: 'Circular', fontSize: 30, color: 'red', textAlign: 'center' }}>{"RD$" + this.cashify(data.amount)}</Text>

                            </View>
                            <List>
                                <ListItem
                                    title={formatDate(data.created_at, true)}
                                    hideChevron={true}
                                    leftIcon={<Image
                                        style={{ width: 24, height: 24, marginRight: 6 }}
                                        source={require('../../../assets/img/icons/details/calendar.png')}
                                    />}
                                    avatarStyle={{ backgroundColor: 'white' }}
                                    fontFamily={'Circular'}
                                />
                                <ListItem
                                    title={data.financial_instrument.identifier}
                                    hideChevron={true}
                                    leftIcon={<Image
                                        style={{ width: 24, height: 24, marginRight: 6 }}
                                        source={require('../../../assets/img/icons/details/wallet.png')}
                                    />}
                                    avatarStyle={{ backgroundColor: 'white' }}
                                    fontFamily={'Circular'}
                                />
                            </List>
                        </Card>
                    </View>
                </View>
                <ScrollView style={{ padding: 15 }}>
                    <Text style={{ fontFamily: 'Circular', color: 'black' }}>Descripción</Text>
                    <Text style={{ fontFamily: 'Circular' }}>{data.description != null ? data.description : 'No hay descripción'}</Text>
                    <List style={{ marginVertical: 5 }}>
                        <ListItem
                            title={'Editar transacción'}
                            hideChevron={true}
                            fontFamily={'Circular'}
                            leftIcon={<Image
                                style={{ width: 24, height: 24, marginRight: 6 }}
                                source={require('../../../assets/img/icons/edit.png')}
                            />}
                            onPress={() => this.props.navigation.navigate('Edit', { name: data.name, data: data, onSuccess: () => this.refresh() })}
                        />
                        <ListItem
                            title={'Eliminar transacción'}
                            fontFamily={'Circular'}
                            leftIcon={<Image
                                style={{ width: 24, height: 24, marginRight: 6 }}
                                source={require('../../../assets/img/icons/delete.png')}
                            />}
                            onPress={() => this.delete()}
                            hideChevron={true}
                        />
                    </List>

                    <MapView style={{ width: Dimensions.get('window').width, height: 200, marginBottom: 40 }}
                        initialRegion={{
                            latitude: data.place.lat,
                            longitude: data.place.lon,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        zoomEnabled={false}
                        scrollEnabled={false}>
                        <MapView.Marker coordinate={{
                            latitude: data.place.lat,
                            longitude: data.place.lon,
                        }} />
                    </MapView>

                </ScrollView>
            </View>
                    ) : (
                        <View style={styles.container}>
                        <ActivityIndicator size="large" color="#24E189" animating={this.state.loading} />
                    </View>
                    )
        );
    }
}

export const TransactionsStack = StackNavigator({
    Transactions: {
        screen: Transactions
    },
    Trans: {
        screen: TransactionDetail,
        path: 'transactions/:name',
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    },
    Add: {
        screen: AddTransaction,
        path: 'addtrans',
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    },
    Edit: {
        screen: EditTransaction,
        path: 'edit/:name',
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })

    }
})
export default TransactionsStack