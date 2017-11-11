export default function showCaughtReducer (state = true, action) {
  switch(action.type) {
    case 'TOGGLE_SHOW_CAUGHT':
      return !state
    default:
      return state
  }
}
