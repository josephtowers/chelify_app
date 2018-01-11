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
    Button,
    ToastAndroid
} from 'react-native'
import {
    Picker
} from 'native-base'
import {
    List,
    ListItem
} from 'react-native-elements'
import { StackNavigator, NavigationActions } from 'react-navigation';
import generate from '../../util/reportGenerator'
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
        reportType: '0'
    }
}

    static navigationOptions = ({ navigation }) => ({
        title: "Nuevo reporte",
        headerStyle: { backgroundColor: '#2C2F33' },
        headerTitleStyle: { color: '#FFF', fontWeight: '200', fontFamily: 'Circular' },
        headerTintColor: '#FFF',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="users" size={15} color="#FFF" />
        )
    });
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <Picker mode="dropdown" selectedValue={this.state.value}
                onValueChange={(item) => this.setState({value: item})}>
                <Picker.Item label="Valor a reportar"/>
                    <Picker.Item label="Ingresos" value="ingresos" />
                    <Picker.Item label="Gastos" value="gastos" />
                </Picker>
                <Picker mode="dropdown" selectedValue={this.state.groupBy}
                onValueChange={(item) => this.setState({groupBy: item})}>
                    <Picker.Item label="Agrupar por" value="0"/>
                    <Picker.Item label="Categoría" value="category" />
                    <Picker.Item label="Cuenta" value="account" />
                    <Picker.Item label="Lugar" value="place" />
                    <Picker.Item label="Mes" value="month" />
                </Picker>
                <Picker mode="dropdown" selectedValue={this.state.dateRange}
                onValueChange={(item) => this.setState({dateRange: item})}>
                    <Picker.Item label="Rango de fecha" value="seven-days" />
                    <Picker.Item label="Últimos 7 días" value="seven-days" />
                    <Picker.Item label="Últimos 30 días" value="thirty-days" />
                    <Picker.Item label="Últimos 6 meses" value="six-months" />
                    <Picker.Item label="Últimos 12 meses" value="twelve-months" />
                </Picker>
                <Picker mode="dropdown" selectedValue={this.state.reportType}
                onValueChange={(item) => this.setState({reportType: item})}>
                    <Picker.Item label="Tipo de gráfico" value="area" />
                    <Picker.Item label="Área" value="area" />
                    <Picker.Item label="Barra" value="bar" />
                    <Picker.Item label="Línea" value="line" />
                    <Picker.Item label="Dispersión" value="scatter" />
                    <Picker.Item label="Circular" value="circular" />
                    <Picker.Item label="Pila" value="stack" />
                </Picker>
                <View style={styles.buttonsContainer}>
                        <Button
                            style={styles.buttons}
                            color="#24E189"
                            title="Generar reporte"
                            onPress={() => ToastAndroid.show('Esperando que Alvin termine el endpoint correspondiente...', ToastAndroid.SHORT)}
                        />
                    </View>
                    {
                        generate('guineo')
                    }
            </ScrollView>
        )
    }
}

const ReportsStack = StackNavigator({
    Reports: {
        screen: Reports
    },
    AddReport: {
        screen: AddReport,
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: false
        })
    }
})

export default ReportsStack;