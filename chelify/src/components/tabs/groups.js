import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
import {
    Text, View, TouchableNativeFeedback, PanResponder, Modal,
    RefreshControl, Image, Dimensions, ScrollView, ToastAndroid, TextInput,
    TouchableOpacity, Button, Alert, AsyncStorage, ActivityIndicator
} from 'react-native'
import { StackNavigator, NavigationActions, TabNavigator } from 'react-navigation';
import ActionButton from 'react-native-action-button'
import removeDiacritics from '../../util/removeDiacritics.js'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import users from '../../api/users.js'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

var ImagePicker = require('react-native-image-picker');
import {
    Card,
    List,
    ListView,
    ListItem,
    SearchBar,
    FormLabel,
    FormInput,
    FormValidationMessage,
    Divider,
    Badge
} from 'react-native-elements';
const groups = [
    {
        name: 'Ejemplo',
        description: 'No somos de na',
        goal: 1000000,
        balance: 36000,
        avatar: require('../../../assets/img/welcome/screen4.png'),
        groupUsers: [users[1], users[4]],
        transactions: [
            {
                user: users[1],
                amount: 36000
            }
        ]
    }
]
const MAX_POINTS = 100;

export class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            refreshing: false,
            loading: true
        }
    }
    static navigationOptions = {
        title: 'Grupos',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="users" size={15} color="#FFF" />
        )
    }

    async getUser() {
        try {
            if (this.state.user == null) {


                let user = await AsyncStorage.getItem('currentUser');
                let value = JSON.parse(user);
                console.log(value);
                if (value !== null) {
                    this.setState({ user: value.user }, () => {

                        this.getGroups();
                    })
                }
            }
        } catch (error) {
            console.log('2value');

        }
    }
    getGroups() {
        fetch("https://chelify-nicoavn.c9users.io/chelify_server/public/api/group/by-user/" + this.state.user.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ groups: responseJson.groups, loading: false, refreshing: false })
            })
            .catch((error) => {
                ToastAndroid.show('2', 3)
                console.log(error)

            });
    }
    _onRefresh() {
        this.setState({ refreshing: true });
        this.getGroups();
        this.setState({ refreshing: false });
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
    update() {
        this._onRefresh()
    }
    componentWillMount() {
        this.getUser()
    }
    render() {
        return (
            !this.state.loading ? (
                this.state.groups.length > 0 ? (
                    <View style={{ flex: 1 }}>
                        <ScrollView refreshControl={<RefreshControl
                            enabled={true}
                            refreshing={this.state.refreshing}
                            onRefresh={() => (this._onRefresh.bind(this))}
                        />}>
                            <List>
                                {
                                    this.state.groups.map((l, i) => (
                                        <ListItem
                                            key={i}
                                            title={l.title}
                                            subtitle={"Alcanzado: RD$" + this.cashify(l.current_amount) + " / " + this.cashify(l.target_amount)}
                                            hideChevron={true}
                                            avatarStyle={{ backgroundColor: 'white' }}
                                            avatar={require('../../../assets/img/welcome/screen4.png')}
                                            fontFamily={"Circular"}
                                            onPress={() => this.props.navigation.navigate('GroupDetails', { title: l.title, data: l, onSuccess: () => this.update() })}
                                            subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                        />
                                    ))
                                }
                            </List>
                        </ScrollView>

                        <ActionButton
                            buttonColor="#24E189"
                            onPress={() => this.props.navigation.navigate('AddGroup', { onSuccess: () => this.update() })}
                        />
                    </View>
                ) : (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 15 }}>
                                <TouchableNativeFeedback
                                >
                                    <Image
                                        style={{ width: 128, height: 128 }}
                                        source={require('../../../assets/img/welcome/screen4.png')}
                                    />
                                </TouchableNativeFeedback>
                                <Text style={{ fontFamily: 'Circular', fontSize: 20, textAlign: 'center', marginTop: 10 }}>No eres miembro de ningún grupo todavía</Text>
                            </View>
                            <ActionButton
                                buttonColor="#24E189"
                                onPress={() => this.props.navigation.navigate('AddGroup', { onSuccess: () => this.update() })}
                            />
                        </View>
                    )

            ) : (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#24E189" animating={this.state.loading} />
                    </View>
                )
        )

    }
}

export class GroupDetails extends React.Component {
    constructor(props) {
        super(props);
        
    }
    state = {
        data: null,
        goal: 0,
        formattedAmount: '0.00',
        groupUsers: [],
        name: "",
        balance: 0,
        loading: true,
        isMoving: false,
        pointsDelta: 0,
        points: 62,
        groupKey: 0,
        modalVisible: false
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="users" size={15} color="#FFF" />
        )
    });
    modalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    getGoal() {
        return this.cashify(this.state.goal);
    }

    getBalance() {
        return this.cashify(this.state.balance);
    }

    getRemaining() {
        return this.cashify(this.state.goal - this.state.balance);
    }
    getPercentage() {
        return (this.state.balance / this.state.goal * 100)
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
    async getUser() {
        try {
            if (this.state.user == null) {
                let user = await AsyncStorage.getItem('currentUser');
                let value = JSON.parse(user);
                console.log(value);
                if (value !== null) {
                    this.setState({ user: value.user }, () =>
                        this.getCategories())
                }
            }
        } catch (error) {
            console.log('2value');

        }
    }
    getGroupInfo() {
        let id = this.props.navigation.state.params.data.id
        fetch("https://chelify-nicoavn.c9users.io/chelify_server/public/api/group/" + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                let g = responseJson.group
                this.setState({
                    data: g,
                    goal: g.target_amount,
                    groupUsers: g.users,
                    name: g.title,
                    balance: g.current_amount,
                    loading: false,
                    groupKey: Math.random()
                }, function() {if(this.state.goal <= this.state.balance) this.modalVisible(true)})
                
            })
            .catch((error) => {
                ToastAndroid.show('2', 3)
                console.log(error)

            });

    }
    async empty() {
        console.log('Pay me')
        this.getGroupInfo()
    }
    componentWillMount() {
        this.getGroupInfo()
        
    }
    updateAll(newBalance, user) {
        this.setState({ balance: this.state.balance + newBalance }, function () {
            let val = groups.indexOf(this.state.data);
            groups[val].balance = this.state.balance;
            groups[val].transactions.push({
                user: user,
                amount: newBalance
            })
        })
    }
    deletefromGroup() {
        //
    }
    render() {
        let data = this.state.data;
        const fill = this.getPercentage()
        return (
            
            !this.state.loading ? (
                <View style={{ flex: 1 }}>
                <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.modalVisible(false)}
                    ><View style={{ paddingHorizontal: 28, flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(44, 47, 51, 0.9)', justifyContent: 'center' }}>
                            <View style={{ flex: 1, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white' }}>
                            <Image
                                            style={{ width: 100, height: 100, alignSelf: 'center' }}
                                            source={require('../../../assets/img/trophy.png')}
                                        />    
                            <Text style={{ fontFamily: 'Circular', color: 'black', fontSize: 18, textAlign: 'center' }}>¡Misión cumplida!</Text>
                                
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Circular' }}>
                                        Este grupo ha alcanzado la meta propuesta. Puedes abandonar el grupo ahora o hacerlo luego.
                    </Text>
                                </View>
                                <View style={[styles.buttonsContainer, { alignSelf: 'stretch', alignContent: 'center', justifyContent: 'space-around', marginBottom: 10 }]}>
                                    <Button
                                        style={[styles.buttons]}
                                        color="#24E189"
                                        onPress={() => this.deleteFromGroup()}
                                        title="Abandonar grupo"
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={{ height: 160, backgroundColor: 'white', flexDirection: 'row' }}>

                        <View style={{ flex: 3, height: 200 }}>
                            <ListItem
                                hideChevron={true}
                                subtitle={"Meta"}
                                fontFamily={'Circular'}
                                subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                title={"RD$" + this.getGoal()} />
                            <ListItem
                                hideChevron={true}
                                fontFamily={'Circular'}
                                subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                subtitle={"Alcanzado"}
                                title={"RD$" + this.getBalance()} />
                            <ListItem
                                hideChevron={true}
                                fontFamily={'Circular'}
                                subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                subtitle={"Restante"}
                                title={"RD$" + this.getRemaining()} />
                        </View>
                        <View style={{ flex: 2, alignItems: 'center', height: 170, justifyContent: 'center' }}>
                            <AnimatedCircularProgress
                                size={113}
                                width={10}
                                fill={fill}
                                prefill={0}
                                tintColor="#24E189"
                                onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="gray">
                                {
                                    (fill) => (
                                        <Text style={styles.points}>
                                            {Math.round(MAX_POINTS * fill / 100)}%
                      </Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>
                    </View>
                    <GroupTabView key={this.state.groupKey} screenProps={{ data: data, changeMe: this.updateAll.bind(this), balance: this.state.balance, refresh: this.empty.bind(this) }} />

                </View>
            ) : (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#24E189" animating={this.state.loading} />
                    </View>
                )


        )
    }
}
export class GroupTransactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            amount: 0,
            formattedAmount: '0.00',
            data: this.props.screenProps.data,
            trans: [],
            loading: true,
            user: null
        }
    }
    async getUser() {
        try {
            if (this.state.user == null) {
                let user = await AsyncStorage.getItem('currentUser');
                let value = JSON.parse(user);
                console.log(value);
                if (value !== null) {
                    this.setState({ user: value.user }, () =>
                    this.searchTransactions())
                }
            }
        } catch (error) {
            console.log('2value');

        }
    }
    backAction = NavigationActions.back();

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
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
    pushInput() {
        
        fetch("https://chelify-nicoavn.c9users.io/chelify_server/public/api/group/add-contribution", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                group_id: this.state.data.id,
                user_id: this.state.user.id,
                contribution: this.state.amount
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.props.screenProps.refresh()
                this.setModalVisible(false)
                this.setState({ amount: 0, formattedAmount: '0.00' })
            })
            .catch((error) => {
                ToastAndroid.show('2', 3)
                console.log(error)

            });
        
    }
    searchTransactions() {
        let id = this.state.data.id
        fetch("https://chelify-nicoavn.c9users.io/chelify_server/public/api/group/" + id + "/contributions", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    trans: responseJson.contributions,
                    loading: false

                })
            })
            .catch((error) => {
                ToastAndroid.show('2', 3)
                console.log(error)

            });
    }
    componentWillMount() {
        this.getUser()
    }
    render() {
        let data = this.state.data;
        console.log(data)
        return (
            !this.state.loading ? (
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <Modal
                            transparent={true}
                            animationType="slide"
                            visible={this.state.modalVisible}
                            onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}>
                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(44, 47, 51, 0.9)', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontFamily: 'Circular', marginBottom: 3 }}>Monto del aporte:</Text>
                                <Text style={{ fontFamily: 'Circular', color: '#FFF', fontSize: 34, marginBottom: 10 }}>RD${this.state.formattedAmount}</Text>
                                <View style={{ marginBottom: 15 }}>
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
                                <Button
                                    style={[styles.buttons, { marginTop: 15 }]}
                                    color="#24E189"
                                    onPress={() => this.pushInput()}
                                    title="Aceptar"
                                />
                            </View>
                        </Modal>
                        <List>
                            {
                                this.state.trans.reverse().map((l, i) => (
                                    <ListItem
                                        key={i}
                                        hideChevron={true}
                                        roundAvatar
                                        rightTitleStyle={{ fontWeight: "100", fontFamily: 'Circular' }}
                                        fontFamily={"Circular"}
                                        title={l.user_id}
                                        rightTitle={"RD$" + this.cashify(l.amount)}
                                    />
                                ))
                            }
                        </List>
                    </ScrollView>
                    <ActionButton
                        buttonColor="#24E189"
                        onPress={() => this.setModalVisible(true)}
                    />
                </View>
            ) : (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#24E189" animating={this.state.loading} />
                    </View>
                )
        )
    }
}
export class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true,
            modalVisible: false,
            newUser: ''
        }
    }

    isCurrentUserAdmin() {

    }
    isCurrentUserTryingToDeleteThemselves() {

    }
    canDelete(id) {
        let data = this.props.screenProps.data;
        if ((this.state.user.id == data.manager.id) || (this.state.user.id == id)) return true
        return false
    }
    async getImage(id) {

        await fetch("https://chelify-nicoavn.c9users.io/chelify_server/public/api/image/by-account/" + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.images.length)
                    return { uri: "https://chelify-nicoavn.c9users.io/chelify_server/public/api/image/show/" + responseJson.images[responseJson.images.length - 1].file_name }
                else return require('../../../assets/img/add-picture.jpg')
            })
            .catch((error) => {
                console.log(error)
                return null

            });
    }
    addMember() {
        let data = this.props.screenProps.data;
        let newMember = this.state.newUser
        fetch("https://chelify-nicoavn.c9users.io/chelify_server/public/api/group/add-member-by-email", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                group_id: data.id,
                email: newMember
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.modalVisible(false);
                ToastAndroid.show('Se ha agregado el miembro', 3);
                this.props.screenProps.refresh()
                
            })
            .catch((error) => {
                console.log(error)

            });

    }
    modalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    async getUser() {
        try {
            if (this.state.user == null) {
                let user = await AsyncStorage.getItem('currentUser');
                let value = JSON.parse(user);
                console.log(value);
                if (value !== null) {
                    this.setState({ user: value.user, loading: false })
                }
            }
        } catch (error) {
            console.log('2value');

        }
    }
    componentWillMount() {
        this.getUser()
    }
    render() {
        let data = this.props.screenProps.data;
        return (
            !this.state.loading ? (
                <View style={{ flex: 1 }}>
                    <ScrollView>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.modalVisible(false)}
                    ><View style={{ paddingHorizontal: 28, flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(44, 47, 51, 0.9)', justifyContent: 'center' }}>
                            <View style={{ flex: 1, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white' }}>
                                <Text style={{ fontFamily: 'Circular', color: 'black', fontSize: 18, textAlign: 'center' }}>Crear código de acceso</Text>
                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'Circular' }}>
                                        Introduzca el correo electrónico del usuario que quiere agregar
                    </Text>
                                </View>
                                <TextInput
                                    placeholder="Correo electrónico"
                                    style={{ fontFamily: 'Circular' }}
                                    placeholderTextColor="#787878"
                                    underlineColorAndroid="#787878"
                                    value={this.state.newUser}
                                    onChangeText={(text) => this.setState({ newUser: text })} />

                                <View style={[styles.buttonsContainer, { marginBottom: 10 }]}>
                                    <Button
                                        style={styles.buttons}
                                        color="#24E189"
                                        onPress={() => this.addMember()}
                                        title="Agregar"
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                        <Text style={{ fontFamily: 'Circular', marginTop: 10, textAlign: 'center' }}>ADMINISTRADOR</Text>
                        <List>
                            {
                                this.state.user.id == data.manager.id ? (
                                    <ListItem
                                        title={data.manager.name}
                                        subtitle={data.manager.email}
                                        avatarStyle={{ backgroundColor: 'white' }}
                                        roundAvatar
                                        avatar={require('../../../assets/img/add-picture.jpg')}
                                        fontFamily={"Circular"}
                                        subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                        rightIcon={<Image
                                            style={{ width: 10, height: 10, marginRight: 6, alignSelf: 'center' }}
                                            source={require('../../../assets/img/icons/delete.png')}
                                        />}
                                    />
                                ) : (
                                        <ListItem
                                            title={data.manager.name}
                                            subtitle={data.manager.email}
                                            avatarStyle={{ backgroundColor: 'white' }}
                                            roundAvatar
                                            hideChevron={true}
                                            avatar={require('../../../assets/img/add-picture.jpg')}
                                            fontFamily={"Circular"}
                                            subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                        />
                                    )
                            }

                        </List>
                        <Text style={{ fontFamily: 'Circular', marginTop: 10, textAlign: 'center' }}>MIEMBROS</Text>
                        <List>
                            {
                                data.users.map((l, i) => (
                                    this.canDelete(l.id) ? (
                                        <ListItem
                                            key={i}
                                            title={l.name}
                                            subtitle={l.email}
                                            avatarStyle={{ backgroundColor: 'white' }}
                                            roundAvatar
                                            avatar={require('../../../assets/img/add-picture.jpg')}
                                            fontFamily={"Circular"}
                                            subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                            rightIcon={<Image
                                                style={{ width: 10, height: 10, marginRight: 6, alignSelf: 'center' }}
                                                source={require('../../../assets/img/icons/delete.png')}
                                            />}
                                        />
                                    ) : (
                                            <ListItem
                                                key={i}
                                                title={l.name}
                                                subtitle={l.email}
                                                avatarStyle={{ backgroundColor: 'white' }}
                                                roundAvatar
                                                hideChevron={true}
                                                avatar={require('../../../assets/img/add-picture.jpg')}
                                                fontFamily={"Circular"}
                                                subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                            />
                                        )
                                ))
                            }
                        </List>
                    </ScrollView>
                    <ActionButton
                        buttonColor="#24E189"
                        onPress={() => this.modalVisible(true)}
                    />
                </View>
            ) : (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#24E189" animating={this.state.loading} />
                    </View>
                )
        )
    }
}

export class AddGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            formattedAmount: '0.00',
            incomingUser: '',
            groupUsers: [],
            name: '',
            description: ''
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
    addUser() {
        let nusers = this.state.groupUsers;
        nusers.push(this.state.incomingUser);
        this.setState({
            groupUsers: nusers
        }, function () {
            this.setState({ incomingUser: '' })
        })
    }
    remove(index) {
        let users = this.state.groupUsers;
        users.splice(index, 1);
        this.setState({ groupUsers: users })
    }
    pushGroup() {
        let newGroup = {
            amount: this.state.amount,
            groupUsers: this.state.groupUsers,
            name: this.state.name,
            goal: this.state.amount,
            transactions: [],
            balance: 0,
            description: this.state.description,
            avatar: require('../../../assets/img/welcome/screen4.png')
        }

        groups.push(newGroup);

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
                        <Text style={{ color: 'white', fontFamily: 'Circular', marginBottom: 3 }}>Meta a alcanzar:</Text>
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

                    <TextInput
                        placeholder="Nombre"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        value={this.state.name}
                        onChangeText={(text) => this.setState({ name: text })}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 7 }}>
                            <TextInput
                                placeholder="Agregar miembro (correo electrónico)"
                                placeholderTextColor="#787878"
                                underlineColorAndroid="#787878"
                                value={this.state.incomingUser}
                                keyboardType="email-address"
                                onChangeText={(text) => this.setState({ incomingUser: text })}
                                autoCapitalize="none"
                            /></View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <TouchableOpacity style={[styles.circleMedium, { backgroundColor: '#24E189', justifyContent: 'center', alignItems: 'center' }]} onPress={() => this.addUser()}>
                                <Text style={{ color: 'white', fontFamily: 'Circular' }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ padding: 2, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {
                            this.state.groupUsers.map((l, i) => (
                                <TouchableOpacity key={i} style={{ padding: 3 }} onPress={() => this.remove(i)}>
                                    <Badge containerStyle={{ flexDirection: 'row' }}>
                                        <Image
                                            style={{ width: 10, height: 10, marginRight: 6 }}
                                            source={require('../../../assets/img/icons/delete.png')}
                                        />
                                        <Text style={{ fontFamily: 'Circular', color: 'white' }}>{l}</Text>
                                    </Badge>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button
                            style={styles.buttons}
                            color="#24E189"
                            onPress={() => this.pushGroup()}
                            title="Aceptar"
                        />
                    </View>
                </View>
            </ParallaxScroll>
        )
    }
}

const GroupsStack = StackNavigator({
    Groups: {
        screen: Groups
    },
    AddGroup: {
        screen: AddGroup,

        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    },
    GroupDetails: {
        screen: GroupDetails,
        path: 'groups/:name',
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    }
})

const GroupTabView = TabNavigator({
    Transacciones: {
        screen: GroupTransactions
    },
    Miembros: {
        screen: Members
    }
},
    {
        tabBarPosition: 'top',
        tabBarOptions: {
            style:
                {
                    backgroundColor: 'white'
                },
            indicatorStyle: {
                backgroundColor: '#24E189'
            },
            labelStyle: {
                color: 'gray',
                fontFamily: 'Circular'
            },
            pressColor: 'lightgray'
        }
    })

export default GroupsStack;