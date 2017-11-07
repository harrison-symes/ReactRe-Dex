import React from 'react'
import {connect} from 'react-redux'

import jump from 'jump.js'

import PokemonPreview from './PokemonPreview'
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import {getPokemonRequest, toggleScrollModeAction, getMegasRequest} from '../actions/pokemon'

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
    const search = this.props.search.toLowerCase()
    // if (search.length == 0) return pokemon
    if (search == 'mega') return pokemon.filter(pokemon => this.props.megas.find(mega => mega.dex_number == pokemon.dex_number))
    return pokemon.filter(mon =>
      mon.name.toLowerCase().includes(search)
      || mon.dex_number.toString().includes( search)
      || (mon.type_one && mon.type_one.toLowerCase() == search)
      || (mon.type_two && mon.type_two.toLowerCase() == search)
    )
  }
  render() {
    const {pokemon, scrollMode, search, page} = this.props
    const filtered = this.filterPokemon(pokemon)
    const pagePokemon = filtered.splice((page) * 30, 30)
    const pagination = <Pagination page={page} pages={Math.round(filtered.length / 30)} changePage={this.changePage} />

    return <div className="container pokemon-page">
      <SearchBar />
      {pagination}
      <hr />
      {pagePokemon.length > 0 && <div className="has-text-centered">
        <p className="subtitle is-3">{pagePokemon[0].name} (#{pagePokemon[0].dex_number}) -  {pagePokemon[pagePokemon.length - 1].name} (#{pagePokemon[pagePokemon.length - 1].dex_number})</p>
      </div>}
      <div className="pokemon-list section columns is-desktop-only is-multiline has-text-centered">
        {pagePokemon.map((singlePokemon, i) => <PokemonPreview key={singlePokemon.dex_number} pokemon={singlePokemon} />)}
      </div>
      {pagination}
    </div>
  }
}

const mapStateToProps = ({pokemon, scrollMode, search, page, megas}) => {
  console.log(scrollMode);
  return {
    pokemon,
    scrollMode,
    search,
    page,
    megas
  }
}

export default connect(mapStateToProps)(PokemonList)
