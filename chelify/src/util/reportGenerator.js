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
    VictoryTheme,
    VictoryContainer
} from 'victory-native'
let data = {
    title: "Mi reporte",
    type: "bar",
    var1: "expenses",
    var2: "categories",
    date: "last-six-months"
}
let it = 
[
    {x: 'Comida', y: 50},
    {x: 'Romo', y: 250}
]
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
        <VictoryChart
        theme={VictoryTheme.material}
  domainPadding={20}
  containerComponent={<VictoryContainer
/>}>
  
        <VictoryBar 
        data={it}
        alignment={'middle'}
        animate={true}
        horizontal={true} />
        </VictoryChart>
    )
}
export default generate;