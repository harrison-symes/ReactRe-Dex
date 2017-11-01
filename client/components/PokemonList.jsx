import React from 'react'
import {connect} from 'react-redux'

import PokemonPreview from './PokemonPreview'
import Pagination from './Pagination'
import {getPokemonRequest, toggleScrollModeAction} from '../actions/pokemon'

class PokemonList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      page: 1
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.filterPokemon = this.filterPokemon.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.scrollModeToggle = this.scrollModeToggle.bind(this)
    this.changePage = this.changePage.bind(this)
  }
  updateSearch(e) {
    this.setState({[e.target.name]: e.target.value, page: 1})
  }
  resetSearch() {
    this.setState({search: '', page: 1})
  }
  scrollModeToggle() {
    this.props.dispatch(toggleScrollModeAction())
  }
  componentDidMount() {
    this.props.dispatch(getPokemonRequest())
  }
  filterPokemon(pokemon) {
    const search = this.state.search.toLowerCase()
    return pokemon.filter(mon =>
      mon.name.toLowerCase().includes(search)
      || mon.dex_number.toString().includes( search)
      || (mon.type_one && mon.type_one.toLowerCase() == search)
      || (mon.type_two && mon.type_two.toLowerCase() == search)
    )
  }
  changePage(increment) {
    this.setState({page: this.state.page + increment})
  }
  render() {
    let {pokemon, scrollMode} = this.props
    const {search, page} = this.state
    pokemon = this.filterPokemon(pokemon).splice((page - 1) * 30, ((page - 1) * 30) + 30)
    console.log(pokemon)
    return <div className="container">
      <div className="level">
        <button onClick={this.scrollModeToggle} className={`button is-outline ${scrollMode ? 'is-primary' : 'is-info'}`}>{scrollMode ? "Leave Scroll Mode" : "Enter Scroll Mode"}</button>
        <input className="input" type="text" value={search} name="search" onChange={this.updateSearch} />
        <button onClick={this.resetSearch} className="button is-warning">Reset</button>
      </div>
      {search.length > 0 && <p>{this.filterPokemon(pokemon).length} Pokemon Caught!</p>}
      <Pagination page={page} entries={pokemon.length} changePage={this.changePage} />
      <hr />
      {pokemon.length > 0 && <div className="has-text-centered">
        <p className="subtitle is-3">{pokemon[0].name} (#{pokemon[0].dex_number}) -  {pokemon[pokemon.length - 1].name} (#{pokemon[pokemon.length - 1].dex_number})</p>
      </div>}
      <div className="section columns is-desktop-only is-multiline has-text-centered">
        {pokemon.map((singlePokemon, i) => <PokemonPreview key={singlePokemon.dex_number} pokemon={singlePokemon} />)}
      </div>
      <Pagination page={page} entries={pokemon.length} changePage={this.changePage} />
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
