export default function pageReducer (state = 0, action) {
  switch(action.type) {
    case 'CHANGE_PAGE':
      return action.page
    case 'UPDATE_SEARCH':
      return 0
    case 'HARD_SEARCH':
      return 0
    case 'SEARCH_GEN':
      return 0
    case 'SEARCH_TIER':
      return 0
    default:
      return state
  }
}
