import React from 'react'
import {connect} from 'react-redux'
import jump from 'jump.js'

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
          <div className=" level-item">
            <p className="title is-1">#{pokemon.dex_number} </p>
            <img className="image 128x128" src={`http://www.smogon.com/dex/media/sprites/xy/${pokemon.name.toLowerCase()}.gif`} />
            <p className="title is-2"> {pokemon.name}</p>
          </div>
        </div>
        <hr />
        <div className="hero-body has-text-centered">
          <div className="columns">
            <img className="image" src={pokemon.image_url} />
            <div className="column">
              <p className="button" disabled>{pokemon.type_one}</p>
              {pokemon.type_two && <p className="button" disabled>{pokemon.type_two}</p>}
              <p className="subtitle is-2 is-right">{pokemon.description}</p>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          {!scrollMode && <button className="button is-outline" onClick={this.unClick}>Show Less</button>}
        </div>
      </div>
      : <div className={`box column is-4`}>
        <img onClick={this.click} className="media image" src={pokemon.image_url} />
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
