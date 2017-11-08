import React from 'react'
import {connect} from 'react-redux'
import jump from 'jump.js'


import PokemonSprite from './pokemonSprite'
import StatsTable from './StatsTable'
import Evolutions from './Evolutions'
import RenderMegas from './Megas'

import {solveColor} from '../utils/solveTypeColor'

class PokemonPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      queueJump: false,
      megas: []
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
    const {pokemon, scrollMode, searchType, megas} = this.props
    const {isClicked} = this.state
    const size = isClicked ? 'is-12' : 'is-4'
    return isClicked || scrollMode
      ? <div className='hero box' id={pokemon.name}>
        <div className="hero-head container level has-text-centered">
          <div className="level-item">
            <PokemonSprite name={pokemon.name} oriGen={pokemon.oriGen} />
          </div>
          <div className="level-item">
            <p className="level-item title is-1">#{pokemon.dex_number} {" - "} {pokemon.name}</p>
          </div>
          <div className="level-item">
            <p onClick={() => searchType(pokemon.type_one)} style={{backgroundColor: solveColor(pokemon.type_one) }} className={`button level-item is-large ${pokemon.type_one}`}>{pokemon.type_one}</p>
            {pokemon.type_two && <p onClick={() => searchType(pokemon.type_two)} style={{backgroundColor: solveColor(pokemon.type_two) }} className={`button level-item is-large ${pokemon.type_one}`}>{pokemon.type_two}</p>}
          </div>
        </div>
        <hr />
        <div className="hero-body has-text-centered">
          <div className="columns">
            <div className="column">
              <p className="subtitle is-6 is-right">{pokemon.description}</p>
              <img className="image" src={pokemon.image_url} />
            </div>
            <div className="column is-6">
              {pokemon.tier && <p style={{marginTop: 0}} className="subtitle is-1">{" "} Tier: {pokemon.tier}</p>}
              <hr/>
              <h1 className="subtitle is-1">Abilties:</h1>
              <div className="columns">
                {pokemon.ability_one && <p className=" column subtitle">{pokemon.ability_one}</p>}
                {pokemon.ability_two && <p className=" column subtitle">{pokemon.ability_two}</p>}
                {pokemon.ability_three && <p className=" column subtitle">{pokemon.ability_three}</p>}
              </div>
              <hr />
              <StatsTable pokemon={pokemon} />
              <Evolutions pokemon={pokemon} />
              <RenderMegas megas={megas} />
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

const mapStateToProps = ({scrollMode, megas}, props) => {
  return {
    scrollMode,
    megas: megas.filter(mega => mega.dex_number ==props.pokemon.dex_number)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchType: (typeName) => dispatch({type: 'SEARCH_TYPE', typeName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonPreview)
