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
    ScrollView,
    ToastAndroid,
    Alert,
    Modal,
    Dimensions,
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
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';

const payments = [
    {
        name: "Efectivo",
        avatar: require('../../../assets/img/icons/details/funds.png')
    },
    {
        name: "Tarjeta de crédito VISA 2215",
        avatar: require('../../../assets/img/icons/visa.png')
    },
    {
        name: "Tarjeta de crédito AMEX 5022",
        avatar: require('../../../assets/img/icons/amex.png')
    },
    {
        name: "Tarjeta de crédito MC 3977",
        avatar: require('../../../assets/img/icons/mastercard.png')
    }
]

const transactions = [
    {
        on: "Hoy",
        data: [
            {
                dayId: 0,
                id: 0,
                name: "Shots Bar",
                account: "Efectivo",
                amount: 500,
                category: require('../../../assets/img/icons/alcohol.png'),
                categoryName: 'Alcohol',
                date: 'Hoy a las 11:09PM'
            },
            {
                dayId: 0,
                id: 1,
                name: "Wendy's",
                account: "Tarjeta de crédito AMEX 5021",
                amount: 315,
                category: require('../../../assets/img/icons/fastfood.png'),
                categoryName: 'Comida rápida',
                date: 'Hoy a las 10:25AM',
                description: 'Me antojé de Wendys'
            },
            {
                dayId: 0,
                id: 2,
                name: "Pull & Bear",
                account: "Tarjeta de débito VISA 2332",
                amount: 595,
                category: require('../../../assets/img/icons/clothes.png'),
                categoryName: 'Ropa',
                date: 'Ayer a las 6:30PM'
            },
        ]
    },
    {
        on: "25 de octubre",
        data: [
            {
                dayId: 1,
                id: 0,
                name: "Yogen Fruz",
                account: "Efectivo",
                amount: 150,
                category: require('../../../assets/img/icons/fastfood.png'),
                categoryName: 'Comida rápida',
                date: '22 de noviembre a las 4:11PM'
            }
        ]
    },
    {
        on: "19 de octubre",
        data: [
            {
                dayId: 2,
                id: 0,
                name: "Bomba Sunix",
                account: "Tarjeta de débito MC 4001",
                amount: 700,
                category: require('../../../assets/img/icons/gas.png'),
                categoryName: 'Combustible',
                date: '19 de noviembre a las 12:33PM'
            },
            {
                dayId: 2,
                id: 1,
                name: "Sophia's Bar and Grill",
                account: "Tarjeta de débito MC 4001",
                amount: 575,
                category: require('../../../assets/img/icons/restaurant.png'),
                categoryName: 'Restaurantes',
                date: '18 de noviembre a las 9:10PM'
            },
            {
                dayId: 2,
                id: 2,
                name: "Wendy's",
                account: "Tarjeta de crédito AMEX 5021",
                amount: 315,
                category: require('../../../assets/img/icons/fastfood.png'),
                categoryName: 'Comida rápida',
                date: '18 de noviembre a las 2:14PM'
            }
        ]
    }

]
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

state = {
    trans: transactions
}

export class Transactions extends React.Component {
    static navigationOptions = {
        title: 'Transacciones',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="credit-card" size={15} color="#FFF" />
        ),
    }
    getInitialState() {
        // This assumes your external thing is written by someone who was
        // smart enough to not allow direct manipulation, but made sure
        // to use API functions that allow for event handling etc.
        return { trans: transactions } 
      }
    state = {
         trans: transactions,
         refreshing: false
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.setState({trans: transactions});
        this.setState({refreshing: false});
    }
      
    update() {
        this._onRefresh()
    }
    cashify(amountIn) {
        
            let amount = parseFloat(amountIn).toFixed(2);
           // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
            console.log(amount);
            let splitAmount = amount.split(".")[0];
            let i = splitAmount.length-4;
        
            while(i>=0){
                splitAmount = splitAmount.slice(0,i+1) + "," + splitAmount.slice(i+1);
                i=i-3;
            }
            return splitAmount + "." + amount.split(".")[1];
        
    }

    render() {
        return (
            this.state.trans.length > 0 ? (
                <View>
                    <ScrollView
                    refreshControl={<RefreshControl
                        enabled={true}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                      />}>
                        <StatusBar backgroundColor="#2C2F33" barStyle="light-content" />
                        {
                            this.state.trans.map((l, i) => (
                                <View key={i} style={{ alignSelf: 'stretch', alignItems: 'center', marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'Circular' }}>{l.on}</Text>
                                    <List containerStyle={{ marginBottom: 10, alignSelf: 'stretch' }}>
                                        {
                                            l.data.map((m, j) => (
                                                <ListItem
                                                    key={j}
                                                    title={m.name}
                                                    hideChevron={true}
                                                    avatar={m.category}
                                                    avatarStyle={{ backgroundColor: 'white' }}
                                                    subtitle={m.account}
                                                    subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                                    rightTitleNumberOfLines={2}
                                                    fontFamily="Circular"
                                                    rightTitle={"RD$"+this.cashify(m.amount)}
                                                    rightTitleStyle={{ fontFamily: 'Circular', textAlign: 'right' }}
                                                    onPress={() => this.props.navigation.navigate('Trans', { name: m.name, data: m, onSuccess: () => this.update() })}
                                                />
                                            ))
                                        }
                                    </List>
                                </View>
                            ))}

                    </ScrollView>
                    <ActionButton
                        buttonColor="#24E189"
                        onPress={() => this.props.navigation.navigate('Add', {onSuccess: () => this.update()})}
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
                            onPress={() => this.props.navigation.navigate('Add', {onSuccess: () => this.update()})}
                        />
                    </View>
                ));
    }
}


export class AddTransaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: "",
            inputValue: 10,
            modalVisible: false,
            paymentModalVisible: false,
            dayId: 0,
            id: 0,
            name: "",
            description: "",
            payment: null,
            paymentName: "",
            amount: 0,
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
        headerStyle: { position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0 },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="credit-card" size={15} color="#FFF" />
        ),
    }

    backAction = NavigationActions.back();
    
    timeout = null;
    searchLocation(query){
        
        clearTimeout(this.timeout);
            let changeLocationStateToTrue = () => this.setState({isLocationLoading: true});
            let changeLocation = (obj) => this.setState({places: obj}, this.setState({isLocationLoading: false}));
            let changeLocationStateToFalse = () => this.setState({isLocationLoading: false});
            // Make a new timeout set to go off in 800ms
            this.timeout = setTimeout(function () {
            changeLocationStateToTrue();
                fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyDrTGuF8dVZziGToj9Q3cBv1k_CKivDTn4&location=18.4874874,-69.9645857&radius=50000&query="+query, {
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
    searchPayment(query){
        let result = [];
        for(let val of payments) {
            let searchIn = removeDiacritics(val.name.toLowerCase());
            let term = removeDiacritics(query.toLowerCase())
            if(searchIn.search(term)>=0) {
                result.push(val)
            }
        }
        this.setState({paymentSearchResult: result})
    }
    searchCategory(query){
        let result = [];
        for(let val of categories) {
            let searchIn = removeDiacritics(val.name.toLowerCase());
            let term = removeDiacritics(query.toLowerCase())
            if(searchIn.search(term)>=0) {
                result.push(val)
            }
        }
        this.setState({searchResult: result})
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
        return ~~(numToTruncate * numPower)/numPower;
    }
    cashify(amountIn) {
        
            let amount = parseFloat(amountIn).toFixed(2);
           // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
            console.log(amount);
            let splitAmount = amount.split(".")[0];
            let i = splitAmount.length-4;
        
            while(i>=0){
                splitAmount = splitAmount.slice(0,i+1) + "," + splitAmount.slice(i+1);
                i=i-3;
            }
            return splitAmount + "." + amount.split(".")[1];
        
    }
    changeCategory(obj) {
        this.setState( { category: obj.avatar, categoryName: obj.name})
        this.setModalVisible(!this.state.modalVisible) 
        this.setState({searchResult: categories})
    }
    changePayment(obj) {
        this.setState( { payment: obj.avatar, paymentName: obj.name})
        this.setPaymentModalVisible(!this.state.paymentModalVisible) 
        this.setState({paymentSearchResult: payments})
    }
    changeLocation(obj) {
        this.setState( { location: obj})
        this.setLocationModalVisible(!this.state.locationModalVisible) 
        this.setState({places: []})
    } 
    changeAmount = number => {
        number === 10 ? (
            this.setState({amount: 0}, () => this.setState({formattedAmount: this.cashify(this.state.amount)}))
            )
        : (
            ((this.state.amount * 1000) + number) * 0.01 <= 9999999.99 ? (
        this.setState({amount : ((this.state.amount * 1000) + number) * 0.01 }, function() {
            this.setState({formattedAmount: this.cashify(this.state.amount)});
        })   ) : (
            this.setState({amount : 9999999.99 }, function() {
                this.setState({formattedAmount: this.cashify(this.state.amount)});
            })   )      
    )
    }
    pushTransaction() {
        let newTransaction = {
            dayId: 0,
            id: 5,
            name: this.state.name,
            account: this.state.paymentName,
            amount: this.state.amount,
            category: this.state.category,
            categoryName: this.state.categoryName,
            description: this.state.description,
            date: 'Ahora'
        }
        transactions[0].data.push(newTransaction);
        this.props.navigation.state.params.onSuccess();
        this.props.navigation.dispatch(this.backAction);
        ToastAndroid.show('La transacción se ha agregado', ToastAndroid.SHORT)
    }

    render() {
        return (
                <ParallaxScroll
                style={{backgroundColor: '#2C2F33'}}
                parallaxHeight={500}
      renderParallaxForeground={() => (
        <View style={{ height:500, zIndex: 0, alignItems: 'center', justifyContent: 'center', zIndex: -100 }}>
           <Text style={{fontFamily: 'Circular', color: '#FFF', fontSize: 34, marginBottom: 10}}>RD${this.state.formattedAmount}</Text>
           <View>
           <View style={{flexDirection: 'row'}}>
           <TouchableOpacity onPress={() => this.changeAmount(1)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>1</Text></View>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => this.changeAmount(2)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>2</Text></View>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => this.changeAmount(3)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>3</Text></View>
           </TouchableOpacity>
           </View>
           <View style={{flexDirection: 'row'}}>
           <TouchableOpacity  onPress={() => this.changeAmount(4)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>4</Text></View>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => this.changeAmount(5)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>5</Text></View>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => this.changeAmount(6)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>6</Text></View>
           </TouchableOpacity>
           </View>
           <View style={{flexDirection: 'row'}}>
           <TouchableOpacity  onPress={() => this.changeAmount(7)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>7</Text></View>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => this.changeAmount(8)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>8</Text></View>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => this.changeAmount(9)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>9</Text></View>
           </TouchableOpacity>
           </View>
           <View style={{flexDirection: 'row'}}>
           <TouchableOpacity>
           <View style={styles.circleBlank}></View>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => this.changeAmount(0)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>0</Text></View>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => this.changeAmount(10)}>
           <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>{"x"}</Text></View>
           </TouchableOpacity>
           </View>
           </View>
         </View>
       )}>
       <View style={{backgroundColor: 'white', borderRadius: 10, marginHorizontal: 10, zIndex: 100 , height: (Dimensions.get('window').height - 85)}}>
       <Modal
       animationType="slide"
       visible={this.state.modalVisible}
       onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}>
       <View flex={1}>
       <SearchBar
       inputStyle={{fontFamily: 'Circular'}}
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
   inputStyle={{fontFamily: 'Circular'}}
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
   inputStyle={{fontFamily: 'Circular'}}
   placeholder='Agregar ubicación'
   onChangeText={(text) => this.searchLocation(text)} />
   {
       this.state.isLocationLoading ? <ActivityIndicator style={{marginTop: 30}} size="large" color="#24E189" /> : (
        <List>
        {
            this.state.places.map((l, i) => (
                <ListItem
                fontFamily={'Circular'}
                title={l.name}
                subtitle={l.formatted_address}
                subtitleStyle={{fontFamily: 'Circular', fontWeight: '100'}}
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
   
       <List style={{marginVertical: 5}}>
       {
           this.state.category != null ? (
            <ListItem 
            title={this.state.categoryName}
            onPress={() => { this.setModalVisible(true) }}
            hideChevron={true}
            fontFamily={'Circular'}
            leftIcon={<Image
                style={{ width: 24, height: 24, marginRight: 6 }}
                source={this.state.category}
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
            title={this.state.paymentName}
            onPress={() => { this.setPaymentModalVisible(true) }}
            hideChevron={true}
            fontFamily={'Circular'}
            leftIcon={<Image
                style={{ width: 24, height: 24, marginRight: 6 }}
                source={this.state.payment}
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
                        onChangeText={(text) => this.setState({name: text})}
                    />
                    <TextInput
                        placeholder="Descripción"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        value={this.state.description}
                        onChangeText={(text) => this.setState({description: text})}
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
        )
    }
}


export class EditTransaction extends React.Component {
    
        constructor(props) {
            super(props);
            const data = this.props.navigation.state.params.data;
            this.state = {
                language: "",
                inputValue: 10,
                modalVisible: false,
                paymentModalVisible: false,
                dayId: data.dayId,
                id: data.id,
                name: data.name,
                description: data.description,
                payment: data.payment,
                paymentName: data.account,
                amount: data.amount,
                category: data.category,
                categoryName: data.categoryName,
                date: data.date,
                searchResult: categories,
                paymentSearchResult: payments,
                formattedAmount: this.cashify(data.amount),
                places: [],
                locationModalVisible: false,
                isLocationLoading: false,
                location: data.location
                
            }
        }
        static navigationOptions = {
            title: '',
            headerStyle: { position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0 },
            headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
            headerTintColor: '#FFF',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="credit-card" size={15} color="#FFF" />
            ),
        }
    
        backAction = NavigationActions.back();
        
        timeout = null;
        searchLocation(query){
            
            clearTimeout(this.timeout);
                let changeLocationStateToTrue = () => this.setState({isLocationLoading: true});
                let changeLocation = (obj) => this.setState({places: obj}, this.setState({isLocationLoading: false}));
                let changeLocationStateToFalse = () => this.setState({isLocationLoading: false});
                // Make a new timeout set to go off in 800ms
                this.timeout = setTimeout(function () {
                changeLocationStateToTrue();
                    fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyDrTGuF8dVZziGToj9Q3cBv1k_CKivDTn4&location=18.4874874,-69.9645857&radius=50000&query="+query, {
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
        searchPayment(query){
            let result = [];
            for(let val of payments) {
                let searchIn = removeDiacritics(val.name.toLowerCase());
                let term = removeDiacritics(query.toLowerCase())
                if(searchIn.search(term)>=0) {
                    result.push(val)
                }
            }
            this.setState({paymentSearchResult: result})
        }
        searchCategory(query){
            let result = [];
            for(let val of categories) {
                let searchIn = removeDiacritics(val.name.toLowerCase());
                let term = removeDiacritics(query.toLowerCase())
                if(searchIn.search(term)>=0) {
                    result.push(val)
                }
            }
            this.setState({searchResult: result})
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
            return ~~(numToTruncate * numPower)/numPower;
        }
        cashify(amountIn) {
            
                let amount = parseFloat(amountIn).toFixed(2);
               // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
                console.log(amount);
                let splitAmount = amount.split(".")[0];
                let i = splitAmount.length-4;
            
                while(i>=0){
                    splitAmount = splitAmount.slice(0,i+1) + "," + splitAmount.slice(i+1);
                    i=i-3;
                }
                return splitAmount + "." + amount.split(".")[1];
            
        }
        changeCategory(obj) {
            this.setState( { category: obj.avatar, categoryName: obj.name})
            this.setModalVisible(!this.state.modalVisible) 
            this.setState({searchResult: categories})
        }
        changePayment(obj) {
            this.setState( { payment: obj.avatar, paymentName: obj.name})
            this.setPaymentModalVisible(!this.state.paymentModalVisible) 
            this.setState({paymentSearchResult: payments})
        }
        changeLocation(obj) {
            this.setState( { location: obj})
            this.setLocationModalVisible(!this.state.locationModalVisible) 
            this.setState({places: []})
        } 
        changeAmount = number => {
            number === 10 ? (
                this.setState({amount: 0}, () => this.setState({formattedAmount: this.cashify(this.state.amount)}))
                )
            : (
                ((this.state.amount * 1000) + number) * 0.01 <= 9999999.99 ? (
            this.setState({amount : ((this.state.amount * 1000) + number) * 0.01 }, function() {
                this.setState({formattedAmount: this.cashify(this.state.amount)});
            })   ) : (
                this.setState({amount : 9999999.99 }, function() {
                    this.setState({formattedAmount: this.cashify(this.state.amount)});
                })   )      
        )
        }
        pushTransaction() {
            let newTransaction = {
                dayId: this.state.dayId,
                id: this.state.id,
                name: this.state.name,
                account: this.state.paymentName,
                amount: this.state.amount,
                category: this.state.category,
                categoryName: this.state.categoryName,
                description: this.state.description,
                date: this.state.date
            }
            transactions[newTransaction.dayId].data[newTransaction.id]= newTransaction;
            this.props.navigation.state.params.onSuccess();
            this.props.navigation.dispatch(this.backAction);
            ToastAndroid.show('La transacción se ha guardado', ToastAndroid.SHORT)
        }
    
        render() {
            return (
                    <ParallaxScroll
                    style={{backgroundColor: '#2C2F33'}}
                    parallaxHeight={500}
          renderParallaxForeground={() => (
            <View style={{ height:500, zIndex: 0, alignItems: 'center', justifyContent: 'center', zIndex: -100 }}>
               <Text style={{fontFamily: 'Circular', color: '#FFF', fontSize: 34, marginBottom: 10}}>RD${this.state.formattedAmount}</Text>
               <View>
               <View style={{flexDirection: 'row'}}>
               <TouchableOpacity onPress={() => this.changeAmount(1)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>1</Text></View>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.changeAmount(2)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>2</Text></View>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => this.changeAmount(3)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>3</Text></View>
               </TouchableOpacity>
               </View>
               <View style={{flexDirection: 'row'}}>
               <TouchableOpacity  onPress={() => this.changeAmount(4)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>4</Text></View>
               </TouchableOpacity>
               <TouchableOpacity  onPress={() => this.changeAmount(5)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>5</Text></View>
               </TouchableOpacity>
               <TouchableOpacity  onPress={() => this.changeAmount(6)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>6</Text></View>
               </TouchableOpacity>
               </View>
               <View style={{flexDirection: 'row'}}>
               <TouchableOpacity  onPress={() => this.changeAmount(7)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>7</Text></View>
               </TouchableOpacity>
               <TouchableOpacity  onPress={() => this.changeAmount(8)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>8</Text></View>
               </TouchableOpacity>
               <TouchableOpacity  onPress={() => this.changeAmount(9)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>9</Text></View>
               </TouchableOpacity>
               </View>
               <View style={{flexDirection: 'row'}}>
               <TouchableOpacity>
               <View style={styles.circleBlank}></View>
               </TouchableOpacity>
               <TouchableOpacity  onPress={() => this.changeAmount(0)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>0</Text></View>
               </TouchableOpacity>
               <TouchableOpacity  onPress={() => this.changeAmount(10)}>
               <View style={styles.circleBlank}><Text style={{color: 'white', fontFamily: 'Circular', fontSize: 30}}>{"x"}</Text></View>
               </TouchableOpacity>
               </View>
               </View>
             </View>
           )}>
           <View style={{backgroundColor: 'white', borderRadius: 10, marginHorizontal: 10, zIndex: 100 , height: (Dimensions.get('window').height - 85)}}>
           <Modal
           animationType="slide"
           visible={this.state.modalVisible}
           onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}>
           <View flex={1}>
           <SearchBar
           inputStyle={{fontFamily: 'Circular'}}
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
       inputStyle={{fontFamily: 'Circular'}}
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
       inputStyle={{fontFamily: 'Circular'}}
       placeholder='Agregar ubicación'
       onChangeText={(text) => this.searchLocation(text)} />
       {
           this.state.isLocationLoading ? <ActivityIndicator style={{marginTop: 30}} size="large" color="#24E189" /> : (
            <List>
            {
                this.state.places.map((l, i) => (
                    <ListItem
                    fontFamily={'Circular'}
                    title={l.name}
                    subtitle={l.formatted_address}
                    subtitleStyle={{fontFamily: 'Circular', fontWeight: '100'}}
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
       
           <List style={{marginVertical: 5}}>
           {
               this.state.category != null ? (
                <ListItem 
                title={this.state.categoryName}
                onPress={() => { this.setModalVisible(true) }}
                hideChevron={true}
                fontFamily={'Circular'}
                leftIcon={<Image
                    style={{ width: 24, height: 24, marginRight: 6 }}
                    source={this.state.category}
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
                title={this.state.paymentName}
                onPress={() => { this.setPaymentModalVisible(true) }}
                hideChevron={true}
                fontFamily={'Circular'}
                leftIcon={<Image
                    style={{ width: 24, height: 24, marginRight: 6 }}
                    source={this.state.payment}
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
                            onChangeText={(text) => this.setState({name: text})}
                        />
                        <TextInput
                            placeholder="Descripción"
                            placeholderTextColor="#787878"
                            underlineColorAndroid="#787878"
                            value={this.state.description}
                            onChangeText={(text) => this.setState({description: text})}
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
            )
        }
    }

export class TransactionDetail extends React.Component {
    static navigationOptions = {
        title: 'Detalle de la transacción',
        headerStyle: { position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0 },
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
              {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Eliminar', onPress: () => {
                  transactions[this.props.navigation.state.params.data.dayId].data.splice(this.props.navigation.state.params.data.id, 1);
                  this.props.navigation.state.params.onSuccess();
                  this.props.navigation.dispatch(this.backAction);
                  ToastAndroid.show('La transacción se ha eliminado', ToastAndroid.SHORT)
                  
            }
        },
            ],
            { cancelable: false }
          )
    }
    refresh() {
        this.render();
    }
    cashify(amountIn) {
        
            let amount = parseFloat(amountIn).toFixed(2);
           // let amount = parseFloat(this.truncator(amountIn, 2)).toString();
            console.log(amount);
            let splitAmount = amount.split(".")[0];
            let i = splitAmount.length-4;
        
            while(i>=0){
                splitAmount = splitAmount.slice(0,i+1) + "," + splitAmount.slice(i+1);
                i=i-3;
            }
            return splitAmount + "." + amount.split(".")[1];
        
    }
    render() {
        const data = this.props.navigation.state.params.data;
        return (
            
            <View style={{backgroundColor: 'white', flex: 1}}>
                <View style={{ backgroundColor: '#2C2F33', paddingVertical: 15 }}>
                <View  style={{marginTop: 30}}>
                    <Card>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{flex: 5}}>
                                    <Text style={{ fontFamily: 'Circular', color: 'black', fontSize: 20 }}>{data.name}</Text>
                                    <Text style={{ fontFamily: 'Circular', fontSize: 12 }}>{data.categoryName}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                <Image
                                style={{ width: 36, height: 36, marginLeft: 6 }}
                                source={data.category}
                            />
                                </View>
                            </View>

                            <Divider style={{ marginVertical: 15, backgroundColor: 'lightgray' }} />
                            <Text style={{ fontFamily: 'Circular', fontSize: 30, color: 'red', textAlign: 'center' }}>{"RD$"+this.cashify(data.amount)}</Text>

                        </View>
                        <List>
                            <ListItem
                                title={data.date}
                                hideChevron={true}
                                leftIcon={<Image
                                    style={{ width: 24, height: 24, marginRight: 6 }}
                                    source={require('../../../assets/img/icons/details/calendar.png')}
                                />}
                                avatarStyle={{ backgroundColor: 'white' }}
                                fontFamily={'Circular'}
                            />
                            <ListItem
                                title={data.account}
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
                <ScrollView style={{padding: 15}}>
                <Text style={{fontFamily: 'Circular', color: 'black'}}>Descripción</Text>
                <Text style={{fontFamily: 'Circular'}}>{data.description != null ? data.description : 'No hay descripción'}</Text>
                <List style={{marginVertical: 5}}>
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
                
                <MapView style={{width: Dimensions.get('window').width, height: 200, marginBottom: 40}}
                initialRegion={{
                  latitude: 18.4874874,
                  longitude: -69.9645857,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                zoomEnabled={false}
                scrollEnabled={false}>
                <MapView.Marker coordinate={{
                    latitude: 18.4874874,
                    longitude: -69.9645857}} />
              </MapView>
   
                </ScrollView>
            </View>

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