export default function tierReducer (state = null, action) {
  switch(action.type) {
    case 'SEARCH_TIER':
      return action.tier
    case 'HARD_SEARCH':
      return null
    case 'RESET_SEARCH':
      return null
    default:
      return state
  }
}
