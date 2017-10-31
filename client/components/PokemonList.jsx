import React from 'react'
import {connect} from 'react-redux'

import PokemonPreview from './PokemonPreview'
import {getPokemonRequest, toggleScrollModeAction} from '../actions/pokemon'

class PokemonList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.filterPokemon = this.filterPokemon.bind(this)
    this.resetSearch = this.resetSearch.bind(this)
    this.scrollModeToggle = this.scrollModeToggle.bind(this)
  }
  updateSearch(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  resetSearch() {
    this.setState({search: ''})
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
  render() {
    const {pokemon, scrollMode} = this.props
    const {search} = this.state
    return <div className="container">
      <div className="level">
        <button onClick={this.scrollModeToggle} className={`button is-outline ${scrollMode ? 'is-primary' : 'is-info'}`}>{scrollMode ? "Leave Scroll Mode" : "Enter Scroll Mode"}</button>
        <input className="input" type="text" value={search} name="search" onChange={this.updateSearch} />
        <button onClick={this.resetSearch} className="button is-warning">Reset</button>
      </div>
      {search.length > 0 && <p>{this.filterPokemon(pokemon).length} Pokemon Caught!</p>}
      <div className="section columns is-desktop-only is-multiline has-text-centered">
        {this.filterPokemon(pokemon).map(pokemon => <PokemonPreview key={pokemon.dex_number} pokemon={pokemon} />)}
      </div>
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
