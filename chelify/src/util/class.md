chelifyreact {
    MainScreen {
        Root {
            Login {
                constructor()
                navigationOptions
                state
                resetAction
                checkForPasscode()
                saveCurrentUser(object)
                componentDidMount()
                logMeIn(email, password, callback)
                loginAction()
                goToPasscodePage()
            },
            Register {
                navigationOptions
                resetAction
                constructor()
                state
                backAction
                userLogin()
            },
            Passcode {
                navigationOptions
                resetAction
                logoutAction
                constructor()
                state
                checkForPasscode()
                changePass(value)
                deleteUserData()
                logout()
            },
            TabView {
                OverviewStack {
                    Overview {
constructor()
state
checkForPasscode()
savePasscode()
getUser()
componentWillMount()
componentDidMount()
navigationOptions
options
selectImage()
setPasscodeModalVisible()
saveCode()
                    }
                },
                TransactionsStack {
                    Transactions {
constructor()
state
navigationOptions
getInitialState()
_onRefresh()
update()
cashify()
                    },
                    TransactionDetail {

                    },
                    AddTransaction {
constructor()
state
navigationOptions
backAction
searchLocation(query)
searchPayment(query)
searchCategory(query)
setLocationModalVisible(bool)
setPaymentModalVisible(bool)
setCategoryModalVisible(bool)
cashify()
changeCategory(obj)
changePayment(obj)
changeLocation(obj)
changeAmount(number)
pushTransaction()
                    },
                    EditTransaction {
                        constructor(),
                        state,
                        navigationOptions,
                        backAction,
                        searchLocation(query),
                        searchPayment(query),
                        searchCategory(query),
                        setLocationModalVisible(bool),
                        setPaymentModalVisible(bool),
                        setCategoryModalVisible(bool),
                        cashify(),
                        changeCategory(obj),
                        changePayment(obj),
                        changeLocation(obj)
                        changeAmount(number),
                        pushTransaction()
                    }
                },
                ReportsStack {

                },
                GroupsStack {

                },
                OptionsStack {

                }

            },
            Welcome {
                navigationOptions
            }
        }
    }
}