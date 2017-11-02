export default function searchReducer (state = '', action) {
  switch(action.type) {
    case 'UPDATE_SEARCH':
      return action.search
    case 'RESET':
      return ''
    default:
      return state

  }
}
