import React from 'react'
import {connect} from 'react-redux'
import PokemonSprite from './pokemonSprite'

function Evolutions ({pokemon, pokemonList, search}) {
  const {evolvesFrom, evolvesInto} = pokemon
  const DisplayName = ({name}) =>  <a className="subtitle is-4">{name}</a>
  const DisplayStage = ({stage, isCurrent}) => <p className="subtitle is-6">{isCurrent ? "Current " : ""} Stage {stage}</p>

  const DisplayChainItem = ({pokemon, isCurrent}) => <div className="column" onClick={() => search(pokemon.name)}>
    <DisplayStage stage={pokemon.stage} isCurrent={isCurrent} />
    <PokemonSprite name={pokemon.name} oriGen={pokemon.oriGen} />
    <DisplayName name={pokemon.name} />
    <hr />
  </div>
  const nextStages = JSON.parse(pokemon.evolvesInto).map(evolvesInto => pokemonList.find(listMon => listMon.name == evolvesInto))
  const nextNextStages = []
  nextStages.forEach(evolvesInto => JSON.parse(evolvesInto.evolvesInto).forEach(evolvesInto => nextNextStages.push(pokemonList.find(listMon => listMon.name == evolvesInto)) ))

  const prevStages = JSON.parse(pokemon.evolvesFrom).map(evolvesFrom => pokemonList.find(listMon => listMon.name == evolvesFrom))
  const prevPrevStages = []
  prevStages.forEach(evolvesFrom => JSON.parse(evolvesFrom.evolvesFrom).forEach(evolvesFrom => prevPrevStages.push(pokemonList.find(listMon => listMon.name == evolvesFrom)) ))

  console.log({nextStages, nextNextStages});
  return <div className="columns has-text-centered">
    {prevPrevStages.length > 0 && <div className="column">
      {prevPrevStages.map(evolvesFrom =>  <DisplayChainItem key={evolvesFrom.dex_number} pokemon={evolvesFrom} />)}
    </div>}
    {prevStages.length > 0 && <div>
      {prevStages.map(evolvesFrom => <DisplayChainItem key={evolvesFrom.dex_number} pokemon={evolvesFrom} /> )}
    </div>}
    <DisplayChainItem pokemon={pokemon} isCurrent={true} />
    {nextStages.length > 0 && <div className="column">
      {nextStages.map(evolvesInto => <DisplayChainItem key={evolvesInto.dex_number} pokemon={evolvesInto} />)}
    </div>}
    {nextNextStages.length > 0 && <div className="column">
      {nextNextStages.map(evolvesInto => <DisplayChainItem key={evolvesInto.dex_number} pokemon={evolvesInto} />)}
    </div>}

  </div>
}



const mapStateToProps = ({pokemon}) => {
  return {
    pokemonList: pokemon
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (search) => dispatch({type: 'UPDATE_SEARCH', search})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Evolutions)
