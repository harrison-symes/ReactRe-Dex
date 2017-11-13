import React from 'react'

import PokemonSprite from './pokemonSprite'
import StatsTable from './StatsTable'

export default function Megas ({megas}) {
  return <div className="columns is-multiline">
    {megas.map(mega => <div className="has-text-centered">
      <h1 className="title is-1">{mega.name}</h1>
      <div className="level">
        <PokemonSprite name={mega.name} oriGen={'XY'} />
        <h1 className="subtitle is-4">Ability: {mega.ability}</h1>
      </div>
      <hr />
      <StatsTable pokemon={mega} />
    </div>)}
  </div>
}
