export default function megasReducer (state = [], action) {
  switch(action.type) {
    case 'RECEIVE_MEGAS':
      return action.megas
    default:
      return state
  }
}
