import jump from 'jump.js'

export default function searchReducer (state = '', action) {
  switch(action.type) {
    case 'UPDATE_SEARCH':
      return action.search
    case 'HARD_SEARCH':
      jump('.search-container')
      return action.search
    case 'RESET_SEARCH':
      jump('.search-container')
      return ''
    case 'SEARCH_TYPE':
      jump('.search-container')
      return state
    default:
      return state
  }
}
