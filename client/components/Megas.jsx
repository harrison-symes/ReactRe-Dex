import React from 'react'

import PokemonSprite from './pokemonSprite'
import StatsTable from './StatsTable'

export default function Megas ({megas}) {
  return <div className="columns is-multiline">
    <div className="column is-6">
      {megas.map(mega => <div className="has-text-centered">
        <h1 className="subtitle is-4">{mega.name}</h1>
        <PokemonSprite name={mega.name} oriGen={'XY'} />
        <StatsTable pokemon={mega} />
      </div>)}
    </div>
  </div>
}
