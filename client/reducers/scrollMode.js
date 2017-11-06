export default function isScrollMode (state = false, action) {
  switch(action.type) {
    case 'TOGGLE_SCROLL_MODE':
      return !state
    case 'UPDATE_SEARCH':
      return false
    case 'HARD_SEARCH':
      return true
    case 'RESET_SEARCH':
      return false
    default:
      return state
  }
}
