import React from 'react'
import {connect} from 'react-redux'

import PokemonPreview from './PokemonPreview'
import {getPokemonRequest} from '../actions/pokemon'

class PokemonList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.filterPokemon = this.filterPokemon.bind(this)
  }
  updateSearch(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  componentDidMount() {
    this.props.dispatch(getPokemonRequest())
  }
  filterPokemon(pokemon) {
    const search = this.state.search.toLowerCase()
    return pokemon.filter(mon => mon.name.toLowerCase().includes(search))
  }
  render() {
    const {pokemon} = this.props
    return <div className="container">
      <input className="input" type="text" name="search" onChange={this.updateSearch} />
      <div className="section columns is-desktop-only is-multiline has-text-centered">
        {this.filterPokemon(pokemon).map(pokemon => <PokemonPreview key={pokemon.dex_number} pokemon={pokemon} />)}
      </div>
    </div>
  }
}

const mapStateToProps = ({pokemon}) => {
  return {
    pokemon
  }
}

export default connect(mapStateToProps)(PokemonList)
