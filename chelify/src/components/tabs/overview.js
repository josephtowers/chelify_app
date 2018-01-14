import React, { Component } from 'react';
import { StackNavigator, NavigationActions } from 'react-navigation';
import {
    View,
    ScrollView,
    Image,
    Text,
    ToastAndroid,
    TouchableOpacity,
    StatusBar,
    TouchableNativeFeedback,
    Modal,
    TextInput,
    AsyncStorage,
    ActivityIndicator,
    Button
} from 'react-native'
import {
    List,
    ListItem
} from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
//var ImagePicker = require('react-native-image-picker');
import users from '../../api/users.js'
import Chart from 'react-native-chart';
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
const data = [
    ["01/01", 300],
    ["01/02", 100],
    ["01/03", 50],
    ["01/04", 420],
    ["01/05", 100],
    ["01/06", 100],
    ["01/07", 150]
];
export class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: { uri: 'https://randomuser.me/api/portraits/men/36.jpg' },
            passcodeModalVisible: false,
            passcode: '',
            user: null,
            loading: true,
            summary: [],
            image: ''
        }
    }
    getImage() {
        fetch("https://chelify-nicoavn.c9users.io/chelify_server/public/api/image/by-account/" + this.state.user.account_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.images.length)
                this.setState({ image: {uri: "https://chelify-nicoavn.c9users.io/chelify_server/public/api/image/show/" + responseJson.images[responseJson.images.length - 1].file_name},
            loading: false })
            else this.setState({image: require('../../../assets/img/add-picture.jpg'), loading: false})
            })
            .catch((error) => {
                console.log(error)

            });
    }
    getSummary() {
        fetch("https://chelify-nicoavn.c9users.io/chelify_server/public/api/transaction/month-summary/" + this.state.user.account_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ summary: responseJson },
                this.getImage())
            })
            .catch((error) => {
                console.log(error)

            });
    }
    async checkForPasscode() {
        try {
            let value = await AsyncStorage.getItem('passcode');
            if (value !== null) {
                // We have data!! 
                console.log(value);
            }
            else {
                this.setPasscodeModalVisible(true)
            }
        } catch (error) {
            // Error retrieving data
            console.log('2value');

        }
    }
    async savePasscode() {
        try {
            await AsyncStorage.setItem('passcode', this.state.passcode);
        }
        catch (error) {
            // Error retrieving data
            console.log('2value');

        }
    }
    getUser() {
        try {
            console.log("Tamo en vivo")
            if (this.state.user == null) {
                console.log("¿Quien tu ere?")
                AsyncStorage.getItem('currentUser')
                .then((response) => {
                    console.log("Found this!")
                    let value = JSON.parse(response)
                console.log(value);
                if (value !== null) {
                    this.setState({ user: value.user }, () => {
                        console.log("Vamos por el summary")
                        this.getSummary();
                    })
                }
                })
                
            }
        } catch (error) {
            // Error retrieving data
            console.log('2value');

        }
    }
    componentWillMount() {
        console.log("Buscando usuario")
        this.getUser();
        this.props.navigation.setParams({updateOverview: this.getUser()})
    }
    componentDidMount() {
        console.log('here')
        this.checkForPasscode()
        console.log('there')
    }
    static navigationOptions = {
        title: 'Dashboard',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={15} color="#FFF" />
        ),
    }
    options = {
        title: 'Seleccionar foto de perfil',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    
    selectImage() {/*
        ImagePicker.showImagePicker(this.options, (response) => {
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

                this.setState({
                    avatarSource: source
                }, function () {
                    users[1].image = source;
                });
            }
        });*/
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            cropperToolbarTitle: 'Editar foto'
        }).then(image => {
            console.log(image);
            let source = { uri: image.path };
            let data = new FormData();
            data.append('account_id', this.state.user.account_id); // you can append anyone.
            data.append('image', {
                uri: image.path,
                type: 'image/jpeg', // or photo.type
                name: 'testPhotoName'
            });
            fetch("https://chelify-nicoavn.c9users.io/chelify_server/public/api/image/upload", {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data;',
                },
                body: data
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.getImage()
                })
                .catch((error) => {
                    console.log(error);
                    ToastAndroid.show('Eso no e así viejo...', 5);

                });
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({
                avatarSource: source
            }, function () {
                users[1].image = source;
            });
        }).catch(e => console.log(e));
    }
    setPasscodeModalVisible(visible) {
        this.setState({ passcodeModalVisible: visible });
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
    saveCode() {
        this.savePasscode();
        this.setPasscodeModalVisible(false)
    }
    render() {
        return (

            !this.state.loading ? (
                <ScrollView contentContainerStyle={{ alignItems: 'center', alignSelf: 'stretch', backgroundColor: '#FFF' }}>
                    <StatusBar backgroundColor="#2C2F33" barStyle="light-content" />
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.passcodeModalVisible}
                        onRequestClose={() => console.log('lol nope')}
                    ><View style={{ paddingHorizontal: 28, flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(44, 47, 51, 0.9)', justifyContent: 'center' }}>
                            <View style={{ flex: 1, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white' }}>
                                <Text style={{ fontFamily: 'Circular', color: 'black', fontSize: 18, textAlign: 'center' }}>Crear código de acceso</Text>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'Circular' }}>
                                        Para mantener tu información segura, escoge un código de acceso de
                    4 dígitos para ingresar rápidamente a la app.
                    </Text>
                                </View>
                                <TextInput
                                    placeholder="Código de acceso"
                                    style={{ fontFamily: 'Circular' }}
                                    placeholderTextColor="#787878"
                                    secureTextEntry={true}
                                    keyboardType={"numeric"}
                                    maxLength={4}
                                    underlineColorAndroid="#787878"
                                    value={this.state.passcode}
                                    onChangeText={(text) => this.setState({ passcode: text })} />

                                <View style={[styles.buttonsContainer, { marginBottom: 10 }]}>
                                    <Button
                                        style={styles.buttons}
                                        color="#24E189"
                                        onPress={() => this.saveCode()}
                                        title="Guardar"
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={{ height: 120, backgroundColor: '#999', alignSelf: 'stretch', alignItems: 'center' }}>

                    </View>
                    <View style={{ bottom: 70, backgroundColor: 'transparent', alignSelf: 'stretch', alignItems: 'center' }}>
                        <TouchableNativeFeedback onPress={() => this.selectImage()}>
                            <Image
                                style={{ width: 140, height: 140, borderRadius: 140 / 2 }}
                                resizeMode='cover'
                                source={this.state.image}

                            />
                        </TouchableNativeFeedback>
                        <Text style={[{ color: '#000', fontSize: 20 }, styles.font]}>{this.state.user.name}</Text>
                        <View>
                            <View style={{ alignSelf: 'stretch', alignItems: 'center', marginBottom: 15 }}>
                                <Text style={{ fontSize: 18, fontFamily: 'Circular' }}>Resumen de gastos de la semana</Text>
                            </View>
                        </View>
                        <View style={styles.chartContainer}>
                            <Chart
                                style={styles.chart}
                                data={data}
                                type="line"
                                showGrid={false}
                                showDataPoint={false}
                                color={'#24E189'}
                            /></View>
                        <View style={{ alignSelf: 'stretch', alignItems: 'flex-start' }}>
                            <Text style={{ marginLeft: 20, fontSize: 18, fontFamily: 'Circular' }}>Gastos del mes</Text>
                        </View>
                        {
                            this.state.summary.length > 0 ? (
                                <List containerStyle={{ marginBottom: 20, alignSelf: 'stretch' }}>
                                    {
                                        this.state.summary.map((l, i) => (
                                            <ListItem
                                                key={i}
                                                title={l.name}
                                                hideChevron={true}
                                                fontFamily="Circular"
                                                rightTitle={"RD$" + this.cashify(l.total)}
                                                rightTitleStyle={{ fontFamily: 'Circular' }}
                                            />
                                        ))
                                    }
                                </List>
                            ) : (
                                    <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Circular', marginTop: 15 }}>No tienes gastos este mes</Text>
                                )
                        }
                    </View>
                </ScrollView>
            ) : (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#24E189" animating={this.state.loading} />
                    </View>
                )
        );
    }
}
export const OverviewStack = StackNavigator({
    Overview: {
        screen: Overview
    }
})
export default OverviewStack;