export default function caughtPokemonReducer (state = [], action) {
  switch(action.type) {
    case 'RECEIVE_CAUGHT_POKEMON':
    console.log({action});
      return action.pokemon
    case 'CATCH_POKEMON':
      return [...state, action.pokemon]
    default:
      return state
  }
}
