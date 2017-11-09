export default function genReducer(state = null, action) {
  switch(action.type) {
    case 'SEARCH_GEN':
      return action.gen
    case 'HARD_SEARCH':
      return null
    case 'RESET_SEARCH':
      return null
    default:
      return state
  }
}
