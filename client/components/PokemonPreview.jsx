import React from 'react'

export default function PokemonPreview ({pokemon}) {
  return <div className="box column is-4">
    <img className="media image" src={pokemon.image_url} />
    <p className="subtitle is-3">#{pokemon.dex_number} - {pokemon.name}</p>
  </div>
}
