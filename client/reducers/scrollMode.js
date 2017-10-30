export default function isScrollMode (state = false, action) {
  switch(action.type) {
    case 'TOGGLE_SCROLL_MODE':
      return !state
    default:
      return state
  }
}
