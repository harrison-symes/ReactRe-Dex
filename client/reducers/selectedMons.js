export default function selectedMonsReducer (state = [], action) {
  switch(action.type) {
    case "RESET_SEARCH":
      return []
    case 'SELECT_POKEMON':
      return [...state, action.pokemon]
    case 'UNSELECT_POKEMON':
      return [...state].filter(mon => mon != action.pokemon)
    case 'CHANGE_PAGE':
      return []
    case 'TOGGLE_SCROLL_MODE':
      return []
    default:
      return state
  }
}
