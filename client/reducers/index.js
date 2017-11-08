import {combineReducers} from 'redux'

import auth from './auth'
import pokemon from './pokemon'
import scrollMode from './scrollMode'
import search from './search'
import page from './page'
import megas from './megas'
import searchTier from './searchTier'

export default combineReducers({
  auth,
  pokemon,
  scrollMode,
  search,
  page,
  megas,
  searchTier
})
