import {combineReducers} from 'redux'

import auth from './auth'
import pokemon from './pokemon'

export default combineReducers({
  auth,
  pokemon
})
