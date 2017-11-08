export default function tierReducer (state = null, action) {
  switch(action.type) {
    case 'SEARCH_TIER':
      return action.tier
    default:
      return state
  }
}
