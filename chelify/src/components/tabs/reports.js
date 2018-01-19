import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
import {
    Text,
    View,
    ScrollView,
    RefreshControl,
    TouchableNativeFeedback,
    Image,
    ToastAndroid,
    AsyncStorage,
    Alert,
    Button,
    ActivityIndicator
} from 'react-native'

import Chart from 'react-native-chart';
import {
    Picker
} from 'native-base'
import {
    List,
    ListItem
} from 'react-native-elements'
import { StackNavigator, NavigationActions } from 'react-navigation';
import {
    VictoryChart,
    VictoryBar,
    VictoryLegend,
    VictoryLine,
    VictoryPie,
    VictoryTheme,
    VictoryContainer
} from 'victory-native'
import Calendar from 'react-native-calendar-select';
import Settings from '../../settings'

import ActionButton from 'react-native-action-button'

const reports = [

]

export class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: reports
        }
    }

    static navigationOptions = {
        title: 'Reportes',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="bar-chart" size={15} color="#FFF" />
        ),
    }

    cashify(amountIn) {

        let amount = parseFloat(amountIn).toFixed(2);
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
            this.state.reports.length > 0 ? (
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
                        onPress={() => this.props.navigation.navigate('AddReport', { onSuccess: () => this.update() })}
                    />
                </View>
            ) : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 15 }}>
                            <TouchableNativeFeedback
                            >
                                <Image
                                    style={{ width: 128, height: 128 }}
                                    source={require('../../../assets/img/welcome/screen3.png')}
                                />
                            </TouchableNativeFeedback>
                            <Text style={{ fontFamily: 'Circular', fontSize: 20, textAlign: 'center', marginTop: 10 }}>No has creado ningún reporte</Text>
                        </View>
                        <ActionButton
                            buttonColor="#24E189"
                            onPress={() => this.props.navigation.navigate('AddReport', { onSuccess: () => this.update() })}
                        />
                    </View>
                )
        );
    }
}
export class AddReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '0',
            groupBy: '0',
            dateRange: '0',
            user: null,
            loading: true,
            reportType: '0',
            graph: null,
            startDate: new Date(2018, 0, 11),
            endDate: new Date()
        }
        this.confirmDate = this.confirmDate.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
    }
    confirmDate({ startDate, endDate, startMoment, endMoment }) {
        this.setState({
            startDate,
            endDate
        });
    }
    openCalendar() {
        this.calendar && this.calendar.open();
    }
    static navigationOptions = {
        title: 'Reportes',
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        tabBarIcon: ({ tintColor }) => (
            <Icon name="bar-chart" size={15} color="#FFF" />
        ),
    }
    cashify(amountIn) {

        let amount = parseFloat(amountIn).toFixed(2);
        let splitAmount = amount.split(".")[0];
        let i = splitAmount.length - 4;

        while (i >= 0) {
            splitAmount = splitAmount.slice(0, i + 1) + "," + splitAmount.slice(i + 1);
            i = i - 3;
        }
        return splitAmount + "." + amount.split(".")[1];

    }
    generate(obj) {
        let dataset = []
        fetch(Settings.baseUrl + "/api/report/build?account_id=" +
            obj.accountId + "&group_by=" + obj.groupBy + "&start_date="+ obj.startDate +"&end_date=" + obj.endDate, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
            .then((responseJson) => {
                let sum = 0;
                let data = responseJson.result;
                for (let d of data) {
                    let arr = []
                    switch (obj.groupBy) {
                        case "categories": {
                            arr.push(d.name)
                            break
                        }
                        case "financial_instruments": {
                            arr.push(d.identifier)
                            break
                        }
                        case "places": {
                            arr.push(d.place)
                            break
                        }
                        case "month": {
                            let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
                                'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                            let dateParts = d.month.split(/[-]/)
                            arr.push(months[dateParts[1] - 1] + " " + dateParts[0])
                            break
                        }
                    }
                    arr.push(d.total)
                    sum += d.total
                    dataset.push(arr)
                }
                let avg = sum / dataset.length
                if (dataset.length) {
                    this.setState({
                        graph: <View><Chart
                            style={styles.reportChart}
                            data={dataset}
                            type="bar"
                            showGrid={false}
                            showDataPoint={false}
                            color={'#24E189'}
                        /><List containerStyle={{ marginBottom: 20, alignSelf: 'stretch' }}>
                                {
                                    dataset.map((l, i) => (
                                        <ListItem
                                            key={i}
                                            title={l[0]}
                                            hideChevron={true}
                                            fontFamily="Circular"
                                            rightTitle={"RD$" + this.cashify(l[1])}
                                            rightTitleStyle={{ fontFamily: 'Circular' }}
                                        />
                                    ))

                                }
                                <ListItem
                                    title={"Total"}
                                    hideChevron={true}
                                    fontFamily="Circular"
                                    rightTitle={"RD$" + this.cashify(sum)}
                                    rightTitleStyle={{ fontFamily: 'Circular', fontWeight: 'bold' }}
                                    titleStyle={{ fontWeight: '400' }}
                                />
                                <ListItem
                                    title={"Promedio"}
                                    hideChevron={true}
                                    fontFamily="Circular"
                                    rightTitle={"RD$" + this.cashify(avg)}
                                    titleStyle={{ fontWeight: 'bold' }}
                                    rightTitleStyle={{ fontFamily: 'Circular', fontWeight: 'bold' }}
                                />
                            </List></View>
                    })
                } else {
                    this.setState({
                        graph: <View style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 15 }}>
                            <TouchableNativeFeedback
                            >
                                <Image
                                    style={{ width: 128, height: 128 }}
                                    source={require('../../../assets/img/file.png')}
                                />
                            </TouchableNativeFeedback>
                            <Text style={{ fontFamily: 'Circular', fontSize: 20, textAlign: 'center', marginTop: 10 }}>No hay información que coincida con tu solicitud</Text>
                        </View>
                    })
                }
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
                    this.setState({ user: value.user, loading: false })
                }
            }
        } catch (error) {
            ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)

        }
    }
    async createReport() {
        if(this.state.groupBy == '0') {
            ToastAndroid.show("Debe seleccionar una valor para agrupar", ToastAndroid.SHORT)
        } 
        else {
            let startDateYear = this.state.startDate.getFullYear().toString()
            let startDateMonth = (this.state.startDate.getMonth() + 1).toString()
            let startDateDay = this.state.startDate.getDate().toString()
            let startDate = ""
            if(startDateMonth.length == 1) {
                if(startDateDay.length == 1) {
                    startDate = startDateYear + '-0' + startDateMonth + '-0' + startDateDay  
                } else {
                    startDate = startDateYear + '-0' + startDateMonth + '-' + startDateDay
                }
            } else {
                if(startDateDay.length == 1) {
                    startDate = startDateYear + '-' + startDateMonth + '-0' + startDateDay  
                } else {
                    startDate = startDateYear + '-' + startDateMonth + '-' + startDateDay
                }
            }
            let endDateYear = this.state.endDate.getFullYear().toString()
            let endDateMonth = (this.state.endDate.getMonth() + 1).toString()
            let endDateDay = this.state.endDate.getDate().toString()
            let endDate = ""
            if(endDateMonth.length == 1) {
                if(endDateDay.length == 1) {
                    endDate = endDateYear + '-0' + endDateMonth + '-0' + endDateDay  
                } else {
                    endDate = endDateYear + '-0' + endDateMonth + '-' + endDateDay
                }
            } else {
                if(endDateDay.length == 1) {
                    endDate = endDateYear + '-' + endDateMonth + '-0' + endDateDay  
                } else {
                    endDate = endDateYear + '-' + endDateMonth + '-' + endDateDay
                }
            }
            let newReport = {
                groupBy: this.state.groupBy,
                startDate: startDate,
                endDate: endDate,
                reportType: this.state.reportType,
                accountId: this.state.user.account_id
            }
            this.generate(newReport)
        }
        
    }
    componentWillMount() {
        this.getUser()
    }
    render() {
        let customI18n = {
            'w': ['', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
            'weekday': ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            'text': {
                'start': 'Desde',
                'end': 'Hasta',
                'date': 'fecha',
                'save': 'Confirmar',
                'clear': 'Borrar'
            },
            'date': 'YYYY-MM-DD'  // date format
        };
        // optional property, too.
        let color = {
            mainColor: '#2c2f33',
            subColor: 'white'
        };
        return (
            !this.state.loading ? (
                <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                    <Calendar
                        i18n="en"
                        ref={(calendar) => { this.calendar = calendar; }}
                        customI18n={customI18n}
                        color={color}
                        format="YYYYMMDD"
                        minDate="20170510"
                        maxDate="20180118"
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onConfirm={this.confirmDate}
                    />
                    <View style={{ alignSelf: 'stretch', paddingHorizontal: 15 }}>
                        <Picker mode="dropdown" selectedValue={this.state.groupBy}
                            onValueChange={(item) => this.setState({ groupBy: item })}>
                            <Picker.Item label="Agrupar por" value="0" />
                            <Picker.Item label="Categoría" value="categories" />
                            <Picker.Item label="Cuenta" value="financial_instruments" />
                            <Picker.Item label="Lugar" value="places" />
                            <Picker.Item label="Mes" value="month" />
                        </Picker>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Circular', fontSize: 20, color: '#000' }}>Desde</Text>
                            <Text style={{fontFamily: 'Circular'}}>{this.state.startDate.toDateString()}</Text>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Circular', fontSize: 20, color: '#000' }}>Hasta</Text>
                            <Text style={{fontFamily: 'Circular'}}>{this.state.endDate.toDateString()}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button title="Cambiar fecha"
                            color="#24E189" onPress={this.openCalendar} />
                        <Button
                            style={styles.buttons}
                            color="#24E189"
                            title="Generar reporte"
                            onPress={() => this.createReport()}
                        />
                    </View>
                    <View style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
                        {
                            this.state.graph
                        }
                    </View>
                </ScrollView>
            ) : (
                    <View style={styles.whiteContainer}>
                        <ActivityIndicator size="large" color="#24E189" animating={this.state.loading} />
                    </View>
                )
        )
    }
}

const ReportsStack = StackNavigator({
    Reports: {
        screen: AddReport
    },
    AddReport: {
        screen: AddReport,
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    }
})

export default ReportsStack;