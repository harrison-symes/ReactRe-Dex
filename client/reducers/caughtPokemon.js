export default function caughtPokemonReducer (state = [], action) {
  switch(action.type) {
    case 'RECEIVE_CAUGHT_POKEMON':
      return action.pokemon
    case 'CATCH_POKEMON':
      return [...state, action.pokemon]
    default:
      return state
  }
}
