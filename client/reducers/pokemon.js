export default function pokemonReducer (state = [], action) {
  switch(action.type) {
    case 'RECEIVE_POKEMON':
      return action.pokemon
    default:
      return state
  }
}
