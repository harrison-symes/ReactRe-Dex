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
