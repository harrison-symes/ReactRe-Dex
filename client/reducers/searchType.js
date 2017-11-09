export default function typReducer (state = [], action) {
  switch (action.type) {
    case 'SEARCH_TYPE':
      if (state.find(type => type == action.typeName)) return state.filter(type => type != action.typeName)
      if (state.length < 2) return [...state, action.typeName]
      else return [action.typeName]
    case 'RESET_SEARCH':
      return []
    case 'HARD_SEARCH':
      return []
    default:
      return state
  }
}
