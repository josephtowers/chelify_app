import OverviewStack from './overview.js'
import TransactionsStack from './transactions.js'
import ReportsStack from './reports.js'
import GroupsStack from './groups.js'
import OptionsStack from './options.js'
import { TabNavigator } from 'react-navigation'
import { ToastAndroid } from 'react-native'

export const TabView = TabNavigator({
    Overview: {
        screen: OverviewStack
    },
    Transactions: {
        screen: TransactionsStack
    },
    Reports: {
        screen: ReportsStack,
    },
    Groups: {
        screen: GroupsStack,
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
        animationEnabled: false,
        lazy: true,
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

    export default TabView;