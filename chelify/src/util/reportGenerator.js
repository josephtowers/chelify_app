import {
    VictoryChart,
    VictoryArea,
    VictoryScatter,
    VictoryStack,
    VictoryBar,
    VictoryPie,
    VictoryLine,
    VictoryTheme
} from 'victory-native'
import {
    View,
    Text,
    Alert
} from 'react-native'
import React, { Component } from 'react';
import transactions from '../api/transactions'

let data = {
    title: "Mi reporte",
    type: "bar",
    var1: "expenses",
    var2: "categories",
    date: "last-six-months"
}

Array.prototype.fuck = function(){

}

export function getAreaChart() {

}

export const generate = (text) => {
    let dataset = data;
    let sortBy = []
    switch(data.var2) {
        case "categories": {
            for(let c in transactions) {
                if(sortBy.indexOf(c.categoryName) == -1) sortBy.push(c.categoryName)
            }
        }
        break;
        case "account": {
            for(let c in transactions) {
                if(sortBy.indexOf(c.account) != -1) sortBy.push(c.account)  
            }
        }
        break;
        case "month": {
            for(let c in transactions) {
                let month = c.date.split(/[- :]/)
                if(sortBy.indexOf(month[1]) != -1) sortBy.push(month[1])  
            }
        }
        break;
    }
    return (
        <View><Text>{sortBy.toString()}</Text></View>
    )
}
export default generate;