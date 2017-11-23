import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    FlatList,
    StatusBar,
    ART,
    ScrollView,
    Easing,
    Animated,
    Dimensions,
    TouchableHighlight,
    Alert,
    TouchableOpacity,
    Modal,
} from 'react-native';
import {
    Surface,
    Group
} from 'art';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    StackNavigator,
    NavigationActions,
    DrawerNavigator,
    TabNavigator
} from 'react-navigation';
import Swiper from 'react-native-swiper';
import {
    Card,
    List,
    ListView,
    ListItem
} from 'react-native-elements';
import {
    VictoryChart,
    VictoryLine,
    VictoryPie,
    VictoryBar,
    VictoryContainer,
    VictoryStack,
    VictoryArea,
    VictoryAxis,
    VictoryTheme,
    VictoryScatter,
    VictoryLabel,
    VictoryLegend
} from "victory-native";

import {
    Svg
} from 'react-native-svg';

export default class chelifyreact extends Component {
    render() {
        return (
            <ModalStack />
        );
    }
}

const categories = [
    {
        name: "Depósito",
        avatar: require('./assets/img/icons/deposit.png')
    },
    {
        name: "Ropa",
        avatar: "clothes"
    },
    {
        name: "Alcohol",
        avatar: "alcohol"
    },
    {
        name: "Combustible",
        avatar: "gas"
    }

];

const assets = [
    {
        name: "Efectivo",
        amount: "RD$100.00"
    },
    {
        name: "Cuentas de ahorro",
        amount: "RD$8,900.00"
    },
    {
        name: "Cuentas corrientes",
        amount: "RD$19,000.00"
    }

]

const transactions = [
    {
        on: "Hoy",
        data: [
            {
                name: "Shots Bar",
                account: "Efectivo",
                amount: "RD$200.00",
                category: require('./assets/img/icons/alcohol.png')
            },
            {
                name: "Wendy's",
                account: "Tarjeta de crédito AMEX 5021",
                amount: "RD$315.00",
                category: require('./assets/img/icons/fastfood.png')
            },
            {
                name: "Pull & Bear",
                account: "Tarjeta de débito VISA 2332",
                amount: "RD$595.00",
                category: require('./assets/img/icons/clothes.png')
            },
        ]
    },
    {
        on: "25 de octubre",
        data: [
            {
                name: "Yogen Fruz",
                account: "Efectivo",
                amount: "RD$150.00",
                category: require('./assets/img/icons/fastfood.png')
            }
        ]
    },
    {
        on: "19 de octubre",
        data: [
            {
                name: "Bomba Sunix",
                account: "Tarjeta de débito MC 4001",
                amount: "RD$700.00",
                category: require('./assets/img/icons/gas.png')
            },
            {
                name: "Sophia's Bar and Grill",
                account: "Tarjeta de débito MC 4001",
                amount: "RD$575.00",
                category: require('./assets/img/icons/restaurant.png')
            },
            {
                name: "Wendy's",
                account: "Tarjeta de crédito AMEX 5021",
                amount: "RD$315.00",
                category: require('./assets/img/icons/fastfood.png')
            }
        ]
    }

]

const debts = [
    {
        name: "Tarjetas de crédito",
        amount: "RD$3,500.00"
    },
    {
        name: "Préstamo",
        amount: "RD$7,000.00"
    },
    {
        name: "Otros",
        amount: "RD$800.00"
    }

]

const capital = [
    {
        name: "Total",
        amount: "RD$16,700"
    }

]

const expenses = [
    { name: "Ropa", amount: 400 },
    { name: "Porno", amount: 800 },
    { name: "Comida", amount: 50 },
    { name: "Varios", amount: 550 },
    { name: "Videojuegos", amount: 1000 },
    { name: "Servicios", amount: 620 }
]

const expensesData = [
    { x: 0, y: 0 }, { x: 1, y: 400 }, { x: 2, y: 500 }, { x: 3, y: 350 }, { x: 4, y: 200 }, { x: 5, y: 1000 }, { x: 6, y: 400 }, { x: 7, y: 200 }, { x: 8, y: 0 },
    { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 }, { x: 12, y: 0 }, { x: 13, y: 0 }, { x: 14, y: 0 }, { x: 15, y: 0 }, { x: 16, y: 0 },
    { x: 17, y: 0 }, { x: 18, y: 0 }, { x: 19, y: 0 }, { x: 20, y: 0 }, { x: 21, y: 0 }, { x: 22, y: 0 }, { x: 23, y: 0 }, { x: 24, y: 0 },
    { x: 25, y: 0 }, { x: 26, y: 0 }, { x: 27, y: 0 }, { x: 28, y: 0 }, { x: 29, y: 0 }, { x: 30, y: 0 }, { x: 31, y: 0 }
]

const incomesData = [
    { x: 0, y: 0 }, { x: 1, y: 600 }, { x: 2, y: 201 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 500 }, { x: 6, y: 900 }, { x: 7, y: 0 }, { x: 8, y: 0 },
    { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 }, { x: 12, y: 0 }, { x: 13, y: 0 }, { x: 14, y: 0 }, { x: 15, y: 0 }, { x: 16, y: 0 },
    { x: 17, y: 0 }, { x: 18, y: 0 }, { x: 19, y: 0 }, { x: 20, y: 0 }, { x: 21, y: 0 }, { x: 22, y: 0 }, { x: 23, y: 0 }, { x: 24, y: 0 },
    { x: 25, y: 0 }, { x: 26, y: 0 }, { x: 27, y: 0 }, { x: 28, y: 0 }, { x: 29, y: 0 }, { x: 30, y: 0 }, { x: 31, y: 0 }
]

const chartOptions = {
    scales: {
        yAxes: [{
            stacked: true
        }]
    }
}
class OverviewScreen extends React.Component {
    static navigationOptions = {
        title: 'Dashboard',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={15} color="#FFF" />
        ),
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ alignItems: 'center', alignSelf: 'stretch', backgroundColor: '#FFF' }}>
                <View style={{ height: 120, backgroundColor: '#999', alignSelf: 'stretch', alignItems: 'center' }}>

                </View>
                <View style={{ bottom: 70, backgroundColor: 'transparent', alignSelf: 'stretch', alignItems: 'center' }}>
                    <Image
                        style={{ width: 140, height: 140, borderRadius: 140 / 2 }}
                        resizeMode='contain'
                        source={require('./assets/img/add-picture.jpg')}
                    />
                    <Text style={[{ color: '#000', fontSize: 20 }, styles.font]}>Jane Doe</Text>
                    <View>
                        <View style={{ alignSelf: 'stretch', alignItems: 'flex-start' }}>
                            <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: 'Circular' }}>Resumen del mes de Octubre</Text>
                        </View>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            containerComponent={
                                <VictoryContainer
                                    onTouchStart={() => this.setState({ scrollEnabled: true })}
                                    onTouchEnd={() => this.setState({ scrollEnabled: true })}
                                />
                            }>
                            <VictoryLine
                                data={expensesData}
                            />
                        </VictoryChart>

                    </View>
                    <View style={{ alignSelf: 'stretch', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: 'Circular' }}>Activos</Text>
                    </View>
                    <List containerStyle={{ marginBottom: 20, alignSelf: 'stretch' }}>
                        {
                            assets.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.name}
                                    hideChevron={true}
                                    fontFamily="Circular"
                                    rightTitle={l.amount}
                                    rightTitleStyle={{ fontFamily: 'Circular' }}
                                />
                            ))
                        }
                    </List>
                    <View style={{ alignSelf: 'stretch', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: 'Circular' }}>Pasivos</Text>
                    </View>
                    <List containerStyle={{ marginBottom: 20, alignSelf: 'stretch' }}>
                        {
                            debts.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.name}
                                    hideChevron={true}
                                    fontFamily="Circular"
                                    rightTitle={l.amount}
                                    rightTitleStyle={{ fontFamily: 'Circular' }}
                                />
                            ))
                        }
                    </List>
                    <View style={{ alignSelf: 'stretch', alignItems: 'flex-start' }}>
                        <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: 'Circular' }}>Capital</Text>
                    </View>
                    <List containerStyle={{ marginBottom: 20, alignSelf: 'stretch' }}>
                        {
                            capital.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.name}
                                    hideChevron={true}
                                    fontFamily="Circular"
                                    rightTitle={l.amount}
                                    rightTitleStyle={{ fontFamily: 'Circular' }}
                                />
                            ))
                        }
                    </List>
                </View>


            </ScrollView>
        );
    }
}

class Swipe extends React.Component {
    static navigationOptions = {

        header: null,
    }
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
                <View style={styles.slide}>
                    <StatusBar hidden={true} />
                    <Image style={{ width: 200, height: 100 }} resizeMode='contain'
                        source={require('./assets/img/welcome/screen1.png')} />
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
                            source={require('./assets/img/welcome/screen2.png')} />
                        <Text style={[styles.centralizedTitle, { marginTop: -12 }]}>Agrega una cuenta{"\n"}o tarjeta</Text>
                        <Text style={styles.centralizedParagraph}>
                            Puedes agregar todas las cuentas
                            y tarjetas que tengas para que
                            registres las transacciones que se
                            generen a través de cada una. El
                            efectivo siempre es una opción.
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                       <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                           <TouchableHighlight onPress={() => this.props.navigation.dispatch(Principal.resetAction)}>
                               <Text style={styles.textLink}>AGREGAR CUENTA</Text>
                           </TouchableHighlight>

                           <TouchableHighlight style={{marginLeft: 28}} onPress={() => this.props.navigation.dispatch(Principal.resetAction)}>
                               <Text style={styles.textLink}>SÓLO EFECTIVO</Text>
                           </TouchableHighlight>
                       </View>
                    </View>
                </View>
                <View style={styles.slide}>
                    <Image style={{ width: 200, height: 100 }} resizeMode='contain'
                        source={require('./assets/img/welcome/screen3.png')} />
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
                        source={require('./assets/img/welcome/screen4.png')} />
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
                        source={require('./assets/img/welcome/screen5.png')} />
                    <Text style={styles.centralizedTitle}>Configura pagos{"\n"}recurrentes</Text>
                    <Text style={styles.centralizedParagraph}>
                        Ciertos gastos o ingresos se realizan
                        cada cierto tiempo. Puedes agregar
                        esta recurrencia en la aplicación para
                        evitar tener que registrarlo cada vez.
                    </Text>
                    <TouchableHighlight onPress={() => this.props.navigation.dispatch(Principal.resetAction)}>
                        <Text style={[styles.textLink, {paddingTop: 60}]}>COMENZAR</Text>
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
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}>
                    <View flex={1} style={styles.modalBoxBg}>
                        <View flex={0.5} style={styles.modalBox }>
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

class TransactionsScreen extends React.Component {
    static navigationOptions = {
        title: 'Transacciones',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="credit-card" size={15} color="#FFF" />
        ),
    }

    render() {
        return (
            <ScrollView>
                <StatusBar backgroundColor="#2C2F33" barStyle="light-content" />

                {
                    transactions.map((l, i) => (
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
                                            rightTitle={m.amount}
                                            rightTitleStyle={{ fontFamily: 'Circular', textAlign: 'right' }}
                                            onPress={() => this.props.navigation.navigate('Trans', { name: m.name, data: m })}
                                        />
                                    ))
                                }
                            </List>
                        </View>
                    ))}
            </ScrollView>
        );
    }
}

class TransScreen extends React.Component {
    static navigationOptions = {
        headerStyle: { backgroundColor: 'transparent', position: 'absolute', zIndex: 100, top: 0, left: 0, right: 0 },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="credit-card" size={15} color="#FFF" />
        ),
    }

    render() {
        const data = this.props.navigation.state.params.data;
        return (
            <View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 160,
                    backgroundColor: '#2C2F33'
                }}>
                    <Text style={{ color: '#FFF', fontWeight: '200', fontSize: 24, fontFamily: 'Circular' }}>{data.name}</Text>
                </View>
                <View>

                    <Text>{data.name}</Text>
                    <Text>{data.account}</Text>
                    <Text>{data.amount}</Text>
                </View>
            </View>
        )
    }
}

class ReportScreen extends React.Component {
    static navigationOptions = {
        title: 'Reportes',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="bar-chart" size={15} color="#FFF" />
        ),
    }

    render() {
        return (
            <Text>Reportes</Text>
        );
    }
}

class GroupScreen extends React.Component {
    static navigationOptions = {
        title: 'Grupos',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="users" size={15} color="#FFF" />
        )
    }

    render() {
        return (
            <Text>Grupos</Text>
        );
    }
}

class OptionsScreen extends React.Component {

    static navigationOptions = {
        title: 'Opciones',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="cog" size={15} color="#FFF" />
        ),
    }
    render() {
        return (
            <View>
                <Text>Opciones</Text>
            </View>
        );
    }
}
class PasswordScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }
    static resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Start' })
        ]
    })
    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            colorOne: 'transparent',
            colorTwo: 'transparent',
            colorThree: 'transparent',
            colorFour: 'transparent'
        };
    }
    changePass(val) {
        this.setState({ pass: this.state.pass + val });
        if (this.state.pass.length >= 0) {
            this.setState({ colorOne: 'white' })
        }
        if (this.state.pass.length >= 1) {
            this.setState({ colorTwo: 'white' })
        }
        if (this.state.pass.length >= 2) {
            this.setState({ colorThree: 'white' })
        }
        if (this.state.pass.length >= 3) {
            this.setState({ colorFour: 'white' });
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Start' })
                ]
            }));
        }


    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 200, height: 100 }}
                    resizeMode='contain'
                    source={require('./assets/img/logo.png')}
                />
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <View style={[styles.circleSmall, { backgroundColor: this.state.colorOne }]}>
                    </View>
                    <View style={[styles.circleSmall, { backgroundColor: this.state.colorTwo }]}>
                    </View>
                    <View style={[styles.circleSmall, { backgroundColor: this.state.colorThree }]}>
                    </View>
                    <View style={[styles.circleSmall, { backgroundColor: this.state.colorFour }]}>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.changePass('1')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>1</Text>
                            <Text style={{ color: 'transparent', fontSize: 10 }}>.</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('2')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>2</Text>
                            <Text style={styles.circleSubtext}>ABC</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('3')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>3</Text>
                            <Text style={styles.circleSubtext}>DEF</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.changePass('4')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>4</Text>
                            <Text style={styles.circleSubtext}>GHI</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('5')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>5</Text>
                            <Text style={styles.circleSubtext}>JKL</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('6')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>6</Text>
                            <Text style={styles.circleSubtext}>MNO</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.changePass('7')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>7</Text>
                            <Text style={styles.circleSubtext}>PQRS</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('8')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>8</Text>
                            <Text style={styles.circleSubtext}>TUV</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changePass('9')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>9</Text>
                            <Text style={styles.circleSubtext}>WXYZ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.changePass('0')}>
                        <View style={styles.circle}>
                            <Text style={styles.circleText}>0</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }
    resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Welcome' })
        ]
    })
    backAction = NavigationActions.back();
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 200, height: 100 }}
                    resizeMode='contain'
                    source={require('./assets/img/logo.png')}
                />
                <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Nombre"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                    />
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        placeholder="Correo electrónico"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                    />
                    <TextInput
                        style={styles.inputs}
                        keyboardType="email-address"
                        placeholder="Repetir correo electrónico"
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
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
                        placeholder="Repetir contraseña"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
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

class Principal extends React.Component {
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
                    source={require('./assets/img/logo.png')}
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
                        onPress={() => this.props.navigation.dispatch(Principal.resetAction)}
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

// const TestStack = StackNavigator({
//     Test: {
//         screen: AddCardForm
//     }
// })

const OverviewStack = StackNavigator({
    Overview: {
        screen: OverviewScreen
    }
})

const TransactionsStack = StackNavigator({
    Transactions: {
        screen: TransactionsScreen
    },
    Trans: {
        screen: TransScreen,
        path: 'transactions/:name',
        navigationOptions: ({ navigation }) => ({
            title: null,
        })
    }
})

const ReportsStack = StackNavigator({
    Reports: {
        screen: ReportScreen
    }
})

const GroupStack = StackNavigator({
    Groups: {
        screen: GroupScreen
    }
})

const OptionsStack = StackNavigator({
    Options: {
        screen: OptionsScreen
    }
})

const MyApp = TabNavigator({
    Overview: {
        screen: OverviewStack,
    },
    Transactions: {
        screen: TransactionsStack,
    },
    Reports: {
        screen: ReportsStack,
    },
    Groups: {
        screen: GroupStack,
    },
    Options: {
        screen: OptionsStack,
        navigationOptions: {
            tabBarOptions: {
                showIcon: true
            }
        }
    },
}, {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        tabBarOptions: {
            style:
                {
                    backgroundColor: '#2C2F33'
                },
            indicatorStyle: {
                backgroundColor: '#24E189'
            },
            showIcon: true,
            showLabel: false
        }
    });


const ModalStack = StackNavigator({
    // Test: {
    //     screen: AddCardForm,
    // },
    Home: {
        screen: Principal,
    },
    Register: {
        screen: RegisterScreen,
    },
    Inicio: {
        screen: chelifyreact,
    },
    Password: {
        screen: PasswordScreen
    },
    Start: {
        screen: MyApp,
        navigationOptions: {
            header: null
        }
    },
    Welcome: {
        screen: Swipe
    }
}, {
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [layout.initWidth, 0, 0]
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                    outputRange: [0, 1, 1, 0.3, 0]
                });

                return { opacity, transform: [{ translateX }] }
            }
        })
    });

const styles = StyleSheet.create({
    header:
        {
            backgroundColor: '#2C2F33',
        },
    headerText: {
        color: '#FFF',
        fontFamily: 'Circular'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2C2F33',

    },
    buttonsContainer: {
        alignSelf: 'stretch',
        flexDirection: "row",
        marginTop: 20,
        alignContent: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 35
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFFFFF',
        fontFamily: 'Circular'
    },
    instructions: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    inputs: {
        alignSelf: 'stretch',
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        fontFamily: 'Circular'
    },
    buttons: {
        fontFamily: 'Circular'
    },
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 32
    },
    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        fontFamily: 'Circular',
        textAlign: 'center'
    },
    textLink: {
        color: '#078B75',
        fontSize: 14,
        fontWeight: '400'
    },
    centralizedTitle: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    circleText: {
        fontSize: 20,
        color: 'white'
    },
    circleSubtext: {
        fontSize: 10,
        color: 'white'
    },
    centralizedParagraph: {
        color: '#95989A',
        fontSize: 19,
        textAlign: 'center',
        padding: 15,
        lineHeight: 30,
        marginTop: 20
    },
    ptext: {
        fontSize: 18,
        marginTop: 16,
        fontFamily: 'Circular',
        textAlign: 'center'
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white'
    },
    circleSmall: {
        width: 16,
        height: 16,
        borderRadius: 16 / 2,
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white'
    },
    chart: {
        width: 360,
        height: 200
    },
    chartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    font:
        {
            fontFamily: 'Circular'
        },
    modalBox: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 16
    },
    modalBoxBg: {
        backgroundColor: "rgba(52, 52, 52, 0.75)",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
});

AppRegistry.registerComponent('chelifyreact', () => chelifyreact);
