import React, {Component} from 'react'

export default class PokemonSprite extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gen: 'xy',
      showOptions: true
    }
    this.changeGen = this.changeGen.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
  }
  mouseOver() {
    // this.setState({showOptions: true})
  }
  mouseOut() {
    // this.setState({showOptions: false})
  }
  changeGen(e) {
    this.setState({gen: e.target.value})
  }
  solveImage(gen) {
    const {name} = this.props
    const imageClass = ""
    switch (gen) {
      case 'rb':
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/rb/${name.toLowerCase()}.png`} />
      case 'gs':
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/c/${name.toLowerCase()}.gif`} />
      case 'rs':
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/rs/${name.toLowerCase()}.png`} />
      case 'dp':
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/dp/${name.toLowerCase()}.png`} />
      case 'bw':
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/bw/${name.toLowerCase()}.gif`} />
      default:
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/xy/${name.toLowerCase()}.gif`} />
    }
  }
  render() {
    console.log(this.state);
    return <div onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
      {this.state.showOptions &&
        <ul className="column">
          <li className="button is-small is-outline" onClick={this.changeGen} value="rb">RBG</li>
          <li className="button is-small is-outline" onClick={this.changeGen} value="gs">GS</li>
          <li className="button is-small is-outline" onClick={this.changeGen} value="rs">RSE</li>
          <li className="button is-small is-outline" onClick={this.changeGen} value="dp">DPP</li>
          <li className="button is-small is-outline" onClick={this.changeGen} value="bw">BW</li>
          <li className="button is-small is-outline" onClick={this.changeGen} value="xy">XY</li>
        </ul>
      }
      {this.solveImage(this.state.gen)}
    </div>
  }
}
