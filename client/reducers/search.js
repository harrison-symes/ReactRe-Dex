export default function searchReducer (state = '', action) {
  switch(action.type) {
    case 'UPDATE_SEARCH':
      return action.search
    case 'HARD_SEARCH':
      return action.search
    case 'RESET_SEARCH':
      return ''
    default:
      return state
  }
}
