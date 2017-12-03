const categories = [
    {
        name: "Depósito",
        avatar: require('./assets/img/icons/deposit.png')
    },
    {
        name: "Ropa",
        avatar: "clothes"
    },
    {
        name: "Alcohol",
        avatar: "alcohol"
    },
    {
        name: "Combustible",
        avatar: "gas"
    }

];

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

const transactions = [
    {
        on: "Hoy",
        data: [
            {
                name: "Shots Bar",
                account: "Efectivo",
                amount: "RD$200.00",
                category: require('./assets/img/icons/alcohol.png')
            },
            {
                name: "Wendy's",
                account: "Tarjeta de crédito AMEX 5021",
                amount: "RD$315.00",
                category: require('./assets/img/icons/fastfood.png')
            },
            {
                name: "Pull & Bear",
                account: "Tarjeta de débito VISA 2332",
                amount: "RD$595.00",
                category: require('./assets/img/icons/clothes.png')
            },
        ]
    },
    {
        on: "25 de octubre",
        data: [
            {
                name: "Yogen Fruz",
                account: "Efectivo",
                amount: "RD$150.00",
                category: require('./assets/img/icons/fastfood.png')
            }
        ]
    },
    {
        on: "19 de octubre",
        data: [
            {
                name: "Bomba Sunix",
                account: "Tarjeta de débito MC 4001",
                amount: "RD$700.00",
                category: require('./assets/img/icons/gas.png')
            },
            {
                name: "Sophia's Bar and Grill",
                account: "Tarjeta de débito MC 4001",
                amount: "RD$575.00",
                category: require('./assets/img/icons/restaurant.png')
            },
            {
                name: "Wendy's",
                account: "Tarjeta de crédito AMEX 5021",
                amount: "RD$315.00",
                category: require('./assets/img/icons/fastfood.png')
            }
        ]
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

const expenses = [
    { name: "Ropa", amount: 400 },
    { name: "Porno", amount: 800 },
    { name: "Comida", amount: 50 },
    { name: "Varios", amount: 550 },
    { name: "Videojuegos", amount: 1000 },
    { name: "Servicios", amount: 620 }
]

const expensesData = [
    { x: 0, y: 0 }, { x: 1, y: 400 }, { x: 2, y: 500 }, { x: 3, y: 350 }, { x: 4, y: 200 }, { x: 5, y: 1000 }, { x: 6, y: 400 }, { x: 7, y: 200 }, { x: 8, y: 0 },
    { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 }, { x: 12, y: 0 }, { x: 13, y: 0 }, { x: 14, y: 0 }, { x: 15, y: 0 }, { x: 16, y: 0 },
    { x: 17, y: 0 }, { x: 18, y: 0 }, { x: 19, y: 0 }, { x: 20, y: 0 }, { x: 21, y: 0 }, { x: 22, y: 0 }, { x: 23, y: 0 }, { x: 24, y: 0 },
    { x: 25, y: 0 }, { x: 26, y: 0 }, { x: 27, y: 0 }, { x: 28, y: 0 }, { x: 29, y: 0 }, { x: 30, y: 0 }, { x: 31, y: 0 }
]

const incomesData = [
    { x: 0, y: 0 }, { x: 1, y: 600 }, { x: 2, y: 201 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 500 }, { x: 6, y: 900 }, { x: 7, y: 0 }, { x: 8, y: 0 },
    { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 }, { x: 12, y: 0 }, { x: 13, y: 0 }, { x: 14, y: 0 }, { x: 15, y: 0 }, { x: 16, y: 0 },
    { x: 17, y: 0 }, { x: 18, y: 0 }, { x: 19, y: 0 }, { x: 20, y: 0 }, { x: 21, y: 0 }, { x: 22, y: 0 }, { x: 23, y: 0 }, { x: 24, y: 0 },
    { x: 25, y: 0 }, { x: 26, y: 0 }, { x: 27, y: 0 }, { x: 28, y: 0 }, { x: 29, y: 0 }, { x: 30, y: 0 }, { x: 31, y: 0 }
]

const chartOptions = {
    scales: {
        yAxes: [{
            stacked: true
        }]
    }
}