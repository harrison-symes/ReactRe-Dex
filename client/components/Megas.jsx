import React from 'react'

import PokemonSprite from './pokemonSprite'
import StatsTable from './StatsTable'

export default function Megas ({megas}) {
  return <div className="columns is-multiline">
    {megas.map(mega => <div className="has-text-centered">
      <div className="level">
        <h1 className="subtitle is-4">{mega.name}</h1>
        <PokemonSprite name={mega.name} oriGen={'XY'} />
        <h1 className="subtitle is-4">Ability: {mega.ability}</h1>
      </div>
      <hr />
      <StatsTable pokemon={mega} />
    </div>)}
  </div>
}
