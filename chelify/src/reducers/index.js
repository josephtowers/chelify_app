import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer'
import navReducer from './navReducer'

export const Reducers = combineReducers({
    transactions: transactionsReducer,
    nav: navReducer
})

export default Reducers