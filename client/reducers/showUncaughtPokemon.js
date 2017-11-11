export default function showUncaughtReducer (state = true, action) {
  switch(action.type) {
    case 'TOGGLE_SHOW_UNCAUGHT':
      return !state
    default:
      return state
  }
}
