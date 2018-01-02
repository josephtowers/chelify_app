import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
import { Text, View, TouchableNativeFeedback, PanResponder, Modal, RefreshControl, Image, Dimensions, ScrollView, ToastAndroid, TextInput, TouchableOpacity, Button, Alert } from 'react-native'
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
            groups: groups,
            refreshing: false
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

    _onRefresh() {
        this.setState({ refreshing: true });
        this.setState({ groups: groups });
        this.setState({ refreshing: false });
    }

    update() {
        this._onRefresh()
    }
    render() {
        return (
            this.state.groups.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <ScrollView refreshControl={<RefreshControl
                        enabled={true}
                        refreshing={this.state.refreshing}
                        onRefresh={() => (this._onRefresh.bind(this))}
                    />}>
                        <List>
                            {
                                groups.map((l, i) => (
                                    <ListItem
                                        key={i}
                                        title={l.name}
                                        subtitle={"Miembros: " + l.groupUsers.length}
                                        hideChevron={true}
                                        avatarStyle={{ backgroundColor: 'white' }}
                                        avatar={l.avatar}
                                        fontFamily={"Circular"}
                                        onPress={() => this.props.navigation.navigate('GroupDetails', { title: l.name, data: l, onSuccess: () => this.update() })}
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

        );
    }
}

export class GroupDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.navigation.state.params.data,
            goal: props.navigation.state.params.data.goal,
            formattedAmount: '0.00',
            groupUsers: props.navigation.state.params.data.groupUsers,
            name: props.navigation.state.params.data.name,
            balance: props.navigation.state.params.data.balance,
            description: props.navigation.state.params.data.description,
            isMoving: false,
            pointsDelta: 0,
            points: 62
        }
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
    render() {
        let data = this.props.navigation.state.params.data;
        const fill = this.getPercentage()

        return (
            <View style={{ flex: 1 }}>
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
                <GroupTabView screenProps={{ data: data, changeMe: this.updateAll.bind(this), balance: this.state.balance }} />

            </View>
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
            data: this.props.screenProps.data
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
        this.props.screenProps.changeMe(this.state.amount, users[1]);
        this.setState({ amount: 0, formattedAmount: '0.00' }, function () {
            let val = groups.indexOf(this.state.data)
            this.setState({ data: groups[val] })
        })
        this.setModalVisible(false)
    }
    render() {
        let data = this.state.data;
        return (
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
                            data.transactions.reverse().map((l, i) => (
                                <ListItem
                                    key={i}
                                    hideChevron={true}
                                    roundAvatar
                                    avatar={l.user.image}
                                    rightTitleStyle={{ fontWeight: "100", fontFamily: 'Circular' }}
                                    fontFamily={"Circular"}
                                    title={l.user.name}
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
        )
    }
}
export class Members extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data = this.props.screenProps.data;
        return (
            <ScrollView style={{ flex: 1 }}>
                <List>
                    {
                        data.groupUsers.map((l, i) => (
                            <ListItem
                                key={i}
                                title={l.name}
                                subtitle={l.email}
                                avatarStyle={{ backgroundColor: 'white' }}
                                roundAvatar
                                avatar={l.image}
                                fontFamily={"Circular"}
                                subtitleStyle={{ fontFamily: 'Circular', fontWeight: '100' }}
                                rightIcon={<Image
                                    style={{ width: 10, height: 10, marginRight: 6, alignSelf: 'center' }}
                                    source={require('../../../assets/img/icons/delete.png')}
                                />}
                            />
                        ))
                    }
                </List>
            </ScrollView>
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
                    <TextInput
                        placeholder="Descripción"
                        placeholderTextColor="#787878"
                        underlineColorAndroid="#787878"
                        value={this.state.description}
                        onChangeText={(text) => this.setState({ description: text })}
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