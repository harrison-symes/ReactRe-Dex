import request from 'superagent'
import authRequest from '../utils/api'

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

export function receiveMegasAction (megas) {
  return {
    type: 'RECEIVE_MEGAS',
    megas
  }
}

export function getMegasRequest () {
  return dispatch => {
    request
      .get('/api/v1/pokemon/megas')
      .then(res => {
        dispatch(receiveMegasAction(res.body))
      })
  }
}
export function toggleScrollModeAction () {
  return {
    type: 'TOGGLE_SCROLL_MODE'
  }
}


export function receiveCaughtPokemonAction (pokemon) {
  return {
    type: 'RECEIVE_CAUGHT_POKEMON',
    pokemon
  }
}

export function catchPokemonAction (pokemon) {
  return {
    type: 'CATCH_POKEMON',
    pokemon
  }
}

export function getCaughtPokemonRequest() {
  return dispatch => {
    authRequest('get', 'v1/pokemon/caught')
      .then(res=>{
        dispatch(receiveCaughtPokemonAction(res.body))
      })
  }
}

export function catchPokemonRequest (pokemon) {
  return dispatch => {
    authRequest('post', 'v1/pokemon/caught/' + pokemon.dex_number)
      .then(res => {
        dispatch(catchPokemonAction(pokemon.dex_number))
      })
  }
}
