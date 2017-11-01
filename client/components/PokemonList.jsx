import React from 'react'
import {connect} from 'react-redux'

import jump from 'jump.js'

import PokemonPreview from './PokemonPreview'
import Pagination from './Pagination'
import {getPokemonRequest, toggleScrollModeAction} from '../actions/pokemon'

class PokemonList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      page: 0,
      jumping: false
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.filterPokemon = this.filterPokemon.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.scrollModeToggle = this.scrollModeToggle.bind(this)
    this.changePage = this.changePage.bind(this)
  }
  updateSearch(e) {
    this.setState({[e.target.name]: e.target.value, page: 0})
  }
  resetSearch() {
    this.setState({search: '', page: 0})
  }
  scrollModeToggle() {
    this.props.dispatch(toggleScrollModeAction())
  }
  componentDidMount() {
    this.props.dispatch(getPokemonRequest())
  }
  filterPokemon(pokemon) {
    const search = this.state.search.toLowerCase()
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
    const {pokemon, scrollMode} = this.props
    const {search, page} = this.state
    const filtered = this.filterPokemon(pokemon)
    const pagePokemon = filtered.splice((page) * 30, 30)
    return <div className="container pokemon-page">
      <div className="level">
        <button onClick={this.scrollModeToggle} className={`button is-outline ${scrollMode ? 'is-primary' : 'is-info'}`}>{scrollMode ? "Leave Scroll Mode" : "Enter Scroll Mode"}</button>
        <input className="input" type="text" value={search} name="search" onChange={this.updateSearch} />
        <button onClick={this.resetSearch} className="button is-warning">Reset</button>
      </div>
      {search.length > 0 && <p>{filtered.length} Pokemon Caught!</p>}
      <Pagination page={page} pages={Math.floor(this.props.pokemon.length / 30)} changePage={this.changePage} />
      <hr />
      {pagePokemon.length > 0 && <div className="has-text-centered">
        <p className="subtitle is-3">{pagePokemon[0].name} (#{pagePokemon[0].dex_number}) -  {pagePokemon[pagePokemon.length - 1].name} (#{pagePokemon[pagePokemon.length - 1].dex_number})</p>
      </div>}
      <div className="pokemon-list section columns is-desktop-only is-multiline has-text-centered">
        {pagePokemon.map((singlePokemon, i) => <PokemonPreview key={singlePokemon.dex_number} pokemon={singlePokemon} />)}
      </div>
      <Pagination page={page} pages={Math.floor(filtered.length / 30)} changePage={this.changePage} />
    </div>
  }
}

const mapStateToProps = ({pokemon, scrollMode}) => {
  console.log(scrollMode);
  return {
    pokemon,
    scrollMode
  }
}

export default connect(mapStateToProps)(PokemonList)
