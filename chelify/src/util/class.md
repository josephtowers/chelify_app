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

@mapbox/react-native-mapbox-gl
@monterosa/react-native-parallax-scroll
art
bugsnag-react-native
chart.js
chartist
d3
d3-shape
native-base
prop-types
react
react-chartist
react-chartjs
react-dom
react-native
react-native-action-button
react-native-animatable
react-native-chart
react-native-circular-progress
react-native-collapsible
react-native-elements
react-native-gesture-handler
react-native-image-crop-picker
react-native-image-picker
react-native-maps
react-native-material-dropdown
react-native-parallax-scroll-view
react-native-picker
react-native-prompt
react-native-router-flux
react-native-svg
react-native-swiper
react-native-tab-view
react-native-vector-icons
react-navigation
react-redux
react-router
react-router-native
react-router-navigation
redux
redux-logger
redux-thunk
rn-prompt
victory-native