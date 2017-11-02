import React from 'react'
import {connect} from 'react-redux'
import PokemonSprite from './pokemonSprite'

function Evolutions ({pokemon, pokemonList}) {
  const {evolvesFrom, evolvesInto} = pokemon
  return <div className="columns has-text-centered">
    {pokemon.stage == 3 && <div>
      <p className="subtitle is-6">Stage 1</p>
      <PokemonSprite name={pokemonList.find(p => p.name==pokemon.evolvesFrom).evolvesFrom} />
      <p className="subtitle is-4">{pokemonList.find(p => p.name==pokemon.evolvesFrom).evolvesFrom}</p>
    </div>}
    {pokemon.evolvesFrom && <div className="">
      <p className="subtitle is-6">Stage {pokemon.stage -1}</p>
      <PokemonSprite name={evolvesFrom} />
      <p className="subtitle is-4">{evolvesFrom}</p>
    </div>}
    <div className="">
      <p className="subtitle is-6">Current Stage ({pokemon.stage})</p>
      <PokemonSprite name={pokemon.name} />
      <p className="subtitle is-4">{pokemon.name}</p>
    </div>
    {pokemon.evolvesInto && <div className="">
      <p className="subtitle is-6">Stage {pokemon.stage + 1}</p>
      <PokemonSprite name={evolvesInto} />
      <p className="subtitle is-4">{evolvesInto}</p>
    </div>}
    {pokemon.stage == 1 && pokemon.stages == 3 && <div>
      <p className="subtitle is-6">Stage 3</p>
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
