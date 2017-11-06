import React from 'react'
import {connect} from 'react-redux'
import PokemonSprite from './pokemonSprite'

function Evolutions ({pokemon, pokemonList, search}) {
  const {evolvesFrom, evolvesInto} = pokemon
  const DisplayName = ({name}) =>  <a className="subtitle is-6">{name}</a>
  const DisplayStage = ({stage, isCurrent}) => <p className="subtitle is-6">{isCurrent ? "Current " : ""} Stage {stage}</p>

  const DisplayChainItem = ({pokemon}) => <div className="column box" style={{cursor: 'pointer'}} onClick={() => search(pokemon.name)}>
    <PokemonSprite name={pokemon.name} oriGen={pokemon.oriGen} />
    <DisplayName name={pokemon.name} />
  </div>

  const DisplayChain = ({array, stage}) =>
    array.length > 0 ? <div className="column">
      <DisplayStage stage={stage} />
      {array.map(pokemon => <DisplayChainItem key={pokemon.dex_number} pokemon={pokemon} />)}
    </div> : null

  const nextStages = JSON.parse(pokemon.evolvesInto).map(evolvesInto => pokemonList.find(listMon => listMon.name == evolvesInto))
  const nextNextStages = []
  nextStages.forEach(evolvesInto => JSON.parse(evolvesInto.evolvesInto).forEach(evolvesInto => nextNextStages.push(pokemonList.find(listMon => listMon.name == evolvesInto)) ))

  const prevStages = JSON.parse(pokemon.evolvesFrom).map(evolvesFrom => pokemonList.find(listMon => listMon.name == evolvesFrom))
  const prevPrevStages = []
  prevStages.forEach(evolvesFrom => JSON.parse(evolvesFrom.evolvesFrom).forEach(evolvesFrom => prevPrevStages.push(pokemonList.find(listMon => listMon.name == evolvesFrom)) ))

  console.log({nextStages, nextNextStages});
  return <div className="columns has-text-centered">
    <DisplayChain array={prevPrevStages} stage={pokemon.stage-2} />
    <DisplayChain array={prevStages} stage={pokemon.stage-1} />
    <div className="column">
      <DisplayStage stage={pokemon.stage} isCurrent={true} />
      <DisplayChainItem pokemon={pokemon} />
    </div>
    <DisplayChain array={nextStages} stage={pokemon.stage+1} />
    <DisplayChain array={nextNextStages} stage={pokemon.stage+2} />
  </div>
}

const mapStateToProps = ({pokemon}) => {
  return {
    pokemonList: pokemon
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (search) => dispatch({type: 'HARD_SEARCH', search})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Evolutions)
