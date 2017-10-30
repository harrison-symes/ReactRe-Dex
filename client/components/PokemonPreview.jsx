import React from 'react'
import {connect} from 'react-redux'

class PokemonPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false
    }
    this.click = this.click.bind(this)
    this.unClick = this.unClick.bind(this)
  }
  click() {
    this.setState({isClicked: true})
  }
  unClick() {
    this.setState({isClicked: false})
  }

  render() {
    const {pokemon, scrollMode} = this.props
    const {isClicked} = this.state
    const size = isClicked ? 'is-12' : 'is-4'
    return isClicked || scrollMode
      ? <div className='box'>
        <div className="level">
          <p className="level-item title is-2">#{pokemon.dex_number} - {pokemon.name}</p>
        </div>
        <div className="columns">
          <img onClick={this.click} src={pokemon.image_url} />
          <p className="subtitle is-2 is-right">{pokemon.description}</p>
        </div>
        {!scrollMode && <button className="button is-outline" onClick={this.unClick}>Show Less</button>}
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
