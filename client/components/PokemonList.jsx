import React from 'react'
import {connect} from 'react-redux'

import jump from 'jump.js'

import PokemonPreview from './PokemonPreview'
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import {getPokemonRequest, toggleScrollModeAction} from '../actions/pokemon'

class PokemonList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      jumping: false
    }
    this.filterPokemon = this.filterPokemon.bind(this)
    this.changePage = this.changePage.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(getPokemonRequest())
  }
  filterPokemon(pokemon) {
    const search = this.props.search.toLowerCase()
    // if (search.length == 0) return pokemon
    return pokemon.filter(mon =>
      mon.name.toLowerCase().includes(search)
      || mon.dex_number.toString().includes( search)
      || (mon.type_one && mon.type_one.toLowerCase() == search)
      || (mon.type_two && mon.type_two.toLowerCase() == search)
    )
  }
  changePage(page) {
    if (typeof page == 'number') {
      this.setState({page, jumping: true})
    }
  }
  render() {
    const {pokemon, scrollMode, search} = this.props
    const {page} = this.state
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

const mapStateToProps = ({pokemon, scrollMode, search}) => {
  console.log(scrollMode);
  return {
    pokemon,
    scrollMode,
    search
  }
}

export default connect(mapStateToProps)(PokemonList)
