import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer'

export const Reducers = combineReducers({
    transactions: transactionsReducer
})

export default Reducers