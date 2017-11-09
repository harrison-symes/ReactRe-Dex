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
    let {name, oriGen} = this.props
    if (name == "Krang") name = 'Ditto'

    name = name.split('').map(char => char == '.' ? "_" : char).join('')
    if (name.includes('Tapu')) {
      name = name.split('Tapu')
      name[0] = "Tapu"
      name = name.join('_')
    }
    if (name.includes('Mega')) {
      name = name.split(' ')
      name = `${name[1]}-mega${name[2] ? "-" + name[2] : ""}`
    }
    if (name.includes('Primal')) {
      name = name.split(' ')
      name = `${name[1]}-primal`
    }
    const imageClass = ""
    switch (oriGen) {
      case 'RB':
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/rb/${name.toLowerCase()}.png`} />
      case 'GS':
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/c/${name.toLowerCase()}.gif`} />
      case 'RS':
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/rs/${name.toLowerCase()}.png`} />
      case 'DP':
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/dp/${name.toLowerCase()}.png`} />
      case 'BW':
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/bw/${name.toLowerCase()}.gif`} />
      default:
        return <img className={imageClass} src={`http://www.smogon.com/dex/media/sprites/xy/${name.toLowerCase()}.gif`} />
    }
  }
  render() {
    console.log(this.state);
    return <div>
      {this.solveImage(this.state.gen)}
    </div>
  }
}
