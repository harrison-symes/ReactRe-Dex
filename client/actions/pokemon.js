import request from 'superagent'

export function receivePokemonAction (pokemon) {
  return {
    type: 'RECEIVE_POKEMON',
    pokemon
  }
}

export function getPokemonRequest () {
  return dispatch => {
    request
      .get('/api/v1/pokemon')
      .then(res => {
        dispatch(receivePokemonAction(res.body))
      })
  }
}
