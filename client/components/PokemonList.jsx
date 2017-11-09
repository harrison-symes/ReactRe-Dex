import React from 'react'
import {connect} from 'react-redux'

import jump from 'jump.js'
import data from '../secret/data'
import PokemonPreview from './PokemonPreview'
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import {getPokemonRequest, toggleScrollModeAction, getMegasRequest} from '../actions/pokemon'
import {solveTier} from '../utils/tiers'

class PokemonList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jumping: false
    }
    this.filterPokemon = this.filterPokemon.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(getPokemonRequest())
    this.props.dispatch(getMegasRequest())
  }
  filterPokemon(pokemon) {
    const {searchGen, searchType} = this.props
    const search = this.props.search.toLowerCase()
    const tier = this.props.searchTier
    if (search == 'krang') {
      pokemon =  Array(12600 + 1).fill(0).map(() => Object.assign({}, data))
      pokemon[pokemon.length -1].dex_number = 420
      pokemon[pokemon.length - 1].name = "Krang It"
      pokemon[pokemon.length - 1].description = "A simple brain"
      return pokemon
    }
    if (searchType[0] == "Krang") return Array(420).fill(0).map(() => Object.assign({}, data))
    if (tier) pokemon = pokemon.filter(pokemon => pokemon.tier == tier
      || tier == solveTier(pokemon.tier
      || this.props.megas.filter(mega => mega.dex_number == pokemon.dex_number).find(mega => mega.tier == tier)
      ))

    if (this.props.searchType.length > 0) pokemon = pokemon.filter(pokemon => {
      for (let idx in this.props.searchType) {
        if (pokemon.type_one != this.props.searchType[idx] && pokemon.type_two != this.props.searchType[idx]) return false
      }
      return true
    })

    if (searchGen) pokemon = pokemon.filter(pokemon => pokemon.oriGen == searchGen)

    if (search == 'mega') return pokemon.filter(pokemon => this.props.megas.find(mega => mega.dex_number == pokemon.dex_number))

    return pokemon.filter(mon =>
      mon.name.toLowerCase().includes(search)
      || mon.dex_number.toString().includes(search)
      || (mon.type_one && mon.type_one.toLowerCase() == search)
      || (mon.type_two && mon.type_two.toLowerCase() == search)
      || (mon.ability_one && mon.ability_one.toLowerCase() == search)
      || (mon.ability_two && mon.ability_two.toLowerCase() == search)
      || (mon.ability_three && mon.ability_three.toLowerCase() == search)
    )
  }
  render() {
    const {pokemon, scrollMode, search, page} = this.props
    const filtered = this.filterPokemon(pokemon)
    const pagePokemon = filtered.splice((page) * 30, 30)
    const pagination = <Pagination page={page} pages={Math.ceil(filtered.length / 30)} changePage={this.changePage} />

    return <div className="container pokemon-page">
      <SearchBar />
      {pagination}
      <hr />
      {pagePokemon.length > 0 && <div className="has-text-centered">
        <p className="subtitle is-3">{pagePokemon[0].name} (#{pagePokemon[0].dex_number}) -  {pagePokemon[pagePokemon.length - 1].name} (#{pagePokemon[pagePokemon.length - 1].dex_number})</p>
      </div>}
      <div className="pokemon-list section columns is-desktop-only is-multiline has-text-centered">
        {pagePokemon.map((singlePokemon, i) => <PokemonPreview key={i} pokemon={singlePokemon} />)}
      </div>
      {pagination}
    </div>
  }
}

const mapStateToProps = ({pokemon, scrollMode, search, page, megas, searchTier, searchType, searchGen}) => {
  console.log(scrollMode);
  return {
    pokemon,
    scrollMode,
    search,
    page,
    megas,
    searchTier,
    searchType,
    searchGen
  }
}

export default connect(mapStateToProps)(PokemonList)
