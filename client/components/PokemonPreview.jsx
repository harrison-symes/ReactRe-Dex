import React from 'react'
import {connect} from 'react-redux'
import jump from 'jump.js'

import PokemonSprite from './pokemonSprite'
import StatsTable from './StatsTable'
import Evolutions from './Evolutions'
import RenderMegas from './Megas'

import {catchPokemonRequest} from '../actions/pokemon'

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
    const {pokemon, scrollMode, searchType, megas, selectPokemon, selectedMons, caughtPokemon, catchPokemon, auth, unselectPokemon} = this.props
    const {isClicked} = this.state
    const size = isClicked ? 'is-12' : 'is-4'
    const isCaught = !!caughtPokemon.find(dex_number => dex_number == pokemon.dex_number)
    return scrollMode || selectedMons.find(mon => mon == pokemon)
      ? <div className='hero box' id={pokemon.name}  onDoubleClick={() => unselectPokemon(pokemon)}>
        <div className="hero-head container level has-text-centered">
          <div className="level-item">
            <PokemonSprite name={pokemon.name} oriGen={pokemon.oriGen} />
          </div>
          <p className="level-item title is-1">#{pokemon.dex_number}</p>
          <p className="level-item title is-1">{pokemon.name}</p>
          {auth.isAuthenticated && (isCaught
            ? <p className="level-item tag is-large is-success">Caught!</p>
            : <button onClick={() => catchPokemon(pokemon)} className="level-item button is-danger">Not Caught</button>)
          }
          <div className="level-item columns is-mobile">
            <p onClick={() => searchType(pokemon.type_one)} style={{backgroundColor: solveColor(pokemon.type_one) }} className={`button is-large ${pokemon.type_one}`}>{pokemon.type_one}</p>
            {pokemon.type_two && <p onClick={() => searchType(pokemon.type_two)} style={{backgroundColor: solveColor(pokemon.type_two) }} className={`button is-large ${pokemon.type_one}`}>{pokemon.type_two}</p>}
          </div>
        </div>
        <hr />
        <div className="hero-body has-text-centered">
          <div className="columns">
            <div className="column">
              {pokemon.tier && <div>
                <p style={{marginTop: 0}} className="subtitle is-1">{" "} Tier: {pokemon.tier}</p>
                <hr/>
              </div>}
              <img className="image" src={pokemon.image_url} />
              <p className="subtitle is-6 is-right">{pokemon.description}</p>
              <div>
                <h1 className="subtitle is-1">Forms:</h1>
                <RenderMegas megas={megas} />
              </div>
            </div>
            <div className="column is-6">
              <h1 className="subtitle is-1">Abilties:</h1>
              <hr />
              <div className="columns">
                {pokemon.ability_one && <p className="subtitle is-4">{pokemon.ability_one}</p>}
                {pokemon.ability_two && <p className="subtitle is-4">{pokemon.ability_two}</p>}
                {pokemon.ability_three && <p className="subtitle is-4">{pokemon.ability_three}</p>}
              </div>
              <hr />
              <StatsTable pokemon={pokemon} />
              <Evolutions pokemon={pokemon} />
            </div>
          </div>
        </div>
        <div className="hero-foot level">
          <div className="level-left">
            <a className="button is-info is-inverted level-item" href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pok%C3%A9mon)`}>View on Bulbapedia</a>
            <a className="button is-info is-inverted level-item" href={`http://www.smogon.com/dex/sm/pokemon/${pokemon.name.toLowerCase()}/`}>View on Smogon</a>
          </div>
          {!scrollMode && <button className="button is-outline" onClick={() => unselectPokemon(pokemon)}>Show Less</button>}
        </div>
      </div>
      : <div  onDoubleClick={() => catchPokemon(pokemon)} className={`box column is-2`}>
        <span className="level">
          <p className="subtitle is-3">#{pokemon.dex_number}</p>
          {auth.isAuthenticated && (isCaught && <p className="tag is-success">Caught</p>)}
        </span>
        <img onClick={() => selectPokemon(pokemon)} className="media image" src={pokemon.image_url} />
        <p className="subtitle is-4">{pokemon.name}</p>
      </div>
  }
}

const mapStateToProps = ({scrollMode, megas, selectedMons, caughtPokemon, auth}, props) => {
  return {
    auth,
    selectedMons,
    caughtPokemon,
    scrollMode,
    megas: megas.filter(mega => mega.dex_number ==props.pokemon.dex_number)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    catchPokemon: (pokemon) => dispatch(catchPokemonRequest(pokemon)),
    searchType: (typeName) => dispatch({type: 'SEARCH_TYPE', typeName}),
    selectPokemon: (pokemon) => dispatch({type: "SELECT_POKEMON", pokemon}),
    unselectPokemon: (pokemon) => dispatch({type: 'UNSELECT_POKEMON', pokemon})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonPreview)
