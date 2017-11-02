import React from 'react'
import {connect} from 'react-redux'
import PokemonSprite from './pokemonSprite'


function Evolutions ({pokemon, pokemonList, search}) {
  const {evolvesFrom, evolvesInto} = pokemon
  const DisplayName = ({name}) =>  <a className="subtitle is-4">{name}</a>
  const DisplayStage = ({stage, isCurrent}) => <p className="subtitle is-6">{isCurrent ? "Current " : ""} Stage {stage}</p>

  const DisplayChainItem = ({pokemon, isCurrent}) => <div onClick={() => search(pokemon.name)}>
    <DisplayStage stage={pokemon.stage} isCurrent={isCurrent} />
    <PokemonSprite name={pokemon.name} />
    <DisplayName name={pokemon.name} />
  </div>

  const nextStage = pokemonList.find(p => p.name==pokemon.evolvesInto)
  const prevStage = pokemonList.find(p => p.name==pokemon.evolvesFrom)

  console.log({nextStage, prevStage});
  return <div className="columns has-text-centered">
    {pokemon.stage == 3 && <DisplayChainItem pokemon={pokemonList.find(p => p.name==prevStage.evolvesFrom)} />}
    {pokemon.evolvesFrom && <DisplayChainItem pokemon={prevStage} />}
    <DisplayChainItem pokemon={pokemon} isCurrent={true} />
    {pokemon.evolvesInto && <DisplayChainItem pokemon={nextStage} />}
    {pokemon.stage == 1 && pokemon.stages == 3 && <DisplayChainItem pokemon={pokemonList.find(p => p.name==nextStage.evolvesInto)} />}
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
