import {combineReducers} from 'redux'

import auth from './auth'
import pokemon from './pokemon'
import scrollMode from './scrollMode'

export default combineReducers({
  auth,
  pokemon,
  scrollMode
})
