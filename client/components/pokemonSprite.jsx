import React, {Component} from 'react'

export default class PokemonSprite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gen: 'xy',
      showOptions: false
    }
    this.changeGen = this.changeGen.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
  }
  mouseOver() {
    this.setState({showOptions: true})
  }
  mouseOut() {
    this.setState({showOptions: false})
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
      case 'dp':
        return <img className="level-item box image 128x128" src={`http://www.smogon.com/dex/media/sprites/dp/${pokemon.name.toLowerCase()}.png`} />
      case 'bw':
        return <img className="level-item box image 128x128" src={`http://www.smogon.com/dex/media/sprites/bw/${pokemon.name.toLowerCase()}.gif`} />
      default:
        return <img className="level-item box image 128x128" src={`http://www.smogon.com/dex/media/sprites/xy/${pokemon.name.toLowerCase()}.gif`} />
    }
  }
  render() {
    console.log(this.state);
    return <div onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
      {this.solveImage(this.state.gen)}
      {this.state.showOptions &&
        <div className="level">
          <button className="button is-small is-outline" onClick={this.changeGen} value="rb">RBG</button>
          <button className="button is-small is-outline" onClick={this.changeGen} value="gs">GS</button>
          <button className="button is-small is-outline" onClick={this.changeGen} value="rs">RSE</button>
          <button className="button is-small is-outline" onClick={this.changeGen} value="dp">DPP</button>
          <button className="button is-small is-outline" onClick={this.changeGen} value="bw">BW</button>
          <button className="button is-small is-outline" onClick={this.changeGen} value="xy">XY</button>
        </div>
      }
    </div>
  }
}
