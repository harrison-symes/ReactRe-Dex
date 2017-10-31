import React, {Component} from 'react'

export default class PokemonSprite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gen: 'xy'
    }
    this.changeGen = this.changeGen.bind(this)
  }
  changeGen(e) {
    this.setState({gen: e.target.value})
  }
  solveImage(gen) {
    const {pokemon} = this.props
    switch (gen) {
      case 'rb':
        return <img className="level-item box image 128x128" src={`http://www.smogon.com/dex/media/sprites/rb/${pokemon.name.toLowerCase()}.png`} />
      case 'gs':
        return <img className="level-item box image 128x128" src={`http://www.smogon.com/dex/media/sprites/c/${pokemon.name.toLowerCase()}.gif`} />
      case 'rs':
        return <img className="level-item box image 128x128" src={`http://www.smogon.com/dex/media/sprites/rs/${pokemon.name.toLowerCase()}.png`} />
      case 'bw':
        return <img className="level-item box image 128x128" src={`http://www.smogon.com/dex/media/sprites/bw/${pokemon.name.toLowerCase()}.gif`} />
      default:
        return <img className="level-item box image 128x128" src={`http://www.smogon.com/dex/media/sprites/xy/${pokemon.name.toLowerCase()}.gif`} />
    }
  }
  render() {
    console.log(this.state);
    return <div>
      <div className="level">
        <button className="button is-small is-outline" onClick={this.changeGen} value="rb">RBG</button>
        <button className="button is-small is-outline" onClick={this.changeGen} value="gs">GS</button>
        <button className="button is-small is-outline" onClick={this.changeGen} value="rs">RSE</button>
        <button className="button is-small is-outline" onClick={this.changeGen} value="bw">BW</button>
        <button className="button is-small is-outline" onClick={this.changeGen} value="xy">xy</button>
      </div>
      {this.solveImage(this.state.gen)}
    </div>
  }
}
