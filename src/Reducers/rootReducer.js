import { combineReducers } from 'redux'
import restaurantReducer from './restaurantReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({ 
    restaurants: restaurantReducer,
    userInfo: userReducer
})

export default rootReducer;