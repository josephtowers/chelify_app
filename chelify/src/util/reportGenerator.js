import React, { Component } from 'react';
import {
    View,
    Text,
    Alert
} from 'react-native'
import transactions from '../api/transactions'
import {
    VictoryChart,
    VictoryBar,
    VictoryLegend,
    VictoryPie,
    VictoryTheme,
    VictoryContainer
} from 'victory-native'

import Settings from '../settings'


export const generate = (obj) => {
    let dataset = []
    fetch(Settings.baseUrl + "/api/report/build?account_id=" +
        obj.accountId + "&group_by=" + obj.groupBy + "&start_date=2017-01-01&end_date=2018-01-31", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
        .then((responseJson) => {
            dataset = responseJson.result
            return (

                <VictoryPie
                    data={dataset}
                    theme={VictoryTheme.material}
                    containerComponent={<VictoryContainer
                    />}
                    alignment={'middle'}
                    animate={true}
                    horizontal={true} />
            )
        })
        .catch((error) => {
            ToastAndroid.show('Hubo un problema con su solicitud. Intente de nuevo más tarde', ToastAndroid.SHORT)


        });

    
}
export default generate;