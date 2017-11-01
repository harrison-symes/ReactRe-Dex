import React from 'react'
import {connect} from 'react-redux'
import jump from 'jump.js'


import PokemonSprite from './pokemonSprite'
import StatsTable from './StatsTable'

import {solveColor} from '../utils/solveTypeColor'

class PokemonPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      queueJump: false
    }
    this.click = this.click.bind(this)
    this.unClick = this.unClick.bind(this)
  }
  componentDidUpdate() {
    if (this.state.queueJump) {
      jump(`#${this.props.pokemon.name}`)
      this.setState({queueJump: false})
    }
  }
  click() {
    this.setState({isClicked: true, queueJump: true})
  }
  unClick() {
    this.setState({isClicked: false})
  }
  render() {
    const {pokemon, scrollMode} = this.props
    const {isClicked} = this.state
    const size = isClicked ? 'is-12' : 'is-4'
    return isClicked || scrollMode
      ? <div className='hero box' id={pokemon.name}>
        <div className="hero-head container level has-text-centered">
          <div className="level-item">
            <PokemonSprite pokemon={pokemon} />
          </div>
          <div className="level-item">
            <p className="level-item title is-1">#{pokemon.dex_number} {" - "} {pokemon.name}</p>
          </div>
          <div className="level-item">
            <p style={{backgroundColor: solveColor(pokemon.type_one) }} className={`tag level-item is-large ${pokemon.type_one}`} disabled>{pokemon.type_one}</p>
            {pokemon.type_two && <p style={{backgroundColor: solveColor(pokemon.type_two) }} className={`tag level-item is-large ${pokemon.type_one}`} disabled>{pokemon.type_two}</p>}
          </div>
        </div>
        <hr />
        <div className="hero-body has-text-centered">
          <div className="columns">
            <img className="image" src={pokemon.image_url} />
            <div className="column is-6">
              <p className="subtitle is-6 is-right">{pokemon.description}</p>
              <hr />
              <StatsTable pokemon={pokemon} />
            </div>
          </div>
        </div>
        <div className="hero-foot level">
          <div className="level-left">
            <a className="button is-info is-inverted level-item" href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pok%C3%A9mon)`}>View on Bulbapedia</a>
            <a className="button is-info is-inverted level-item" href={`http://www.smogon.com/dex/sm/pokemon/${pokemon.name.toLowerCase()}/`}>View on Smogon</a>
          </div>
          {!scrollMode && <button className="button is-outline" onClick={this.unClick}>Show Less</button>}
        </div>
      </div>
      : <div onClick={this.click} className={`box column is-4`}>
        <img  className="media image" src={pokemon.image_url} />
        <p className="subtitle is-3">#{pokemon.dex_number} - {pokemon.name}</p>
      </div>
  }
}

const mapStateToProps = ({scrollMode}) => {
  return {
    scrollMode
  }
}

export default connect(mapStateToProps)(PokemonPreview)
