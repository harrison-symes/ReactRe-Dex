import React from 'react'
import {connect} from 'react-redux'
import PokemonSprite from './pokemonSprite'

function Evolutions ({pokemon, pokemonList}) {
  const {evolvesFrom, evolvesInto} = pokemon
  return <div className="columns has-text-centered">
    {pokemon.evolvesFrom && <div className="">
      <p className="subtitle is-6">Evolves From</p>
      <PokemonSprite name={evolvesFrom} />
      <p className="subtitle is-4">{evolvesFrom}</p>
    </div>}
    {pokemon.evolvesInto && <div className="">
      <p className="subtitle is-6">Evolves Into</p>
      <PokemonSprite name={evolvesInto} />
      <p className="subtitle is-4">{evolvesInto}</p>
    </div>}
    {pokemon.stage == 1 && pokemon.stages == 3 && <div>
      <p className="subtitle is-6">And then</p>
      <PokemonSprite name={pokemonList.find(p => p.name==pokemon.evolvesInto).evolvesInto} />
      <p className="subtitle is-4">{pokemonList.find(p => p.name==pokemon.evolvesInto).evolvesInto}</p>
    </div>}
  </div>
}

const mapStateToProps = ({pokemon}) => {
  return {
    pokemonList: pokemon
  }
}

export default connect(mapStateToProps)(Evolutions)
