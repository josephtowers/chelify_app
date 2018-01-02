import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/style.js'
import {
    Text,
    View,
    ScrollView,
    RefreshControl,
    TouchableNativeFeedback,
    Image
} from 'react-native'
import {
    List,
    ListItem
} from 'react-native-elements'
import { StackNavigator, NavigationActions } from 'react-navigation';
import reportGenerator from '../../util/reportGenerator'
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
    render() {
        return (
            <View>
            <Text>fuckme</Text>
            </View>
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