import React from 'react'

function solveHighestStat (pokemon) {
  const {HP, Attack, Defense, SpAtk, SpDef, Speed} = pokemon
  const stats = {HP, Attack, Defense, SpAtk, SpDef, Speed}
  let highestStat = HP
  for (let key in stats) if (Number(stats[key]) > highestStat) highestStat = stats[key]
  return highestStat
}

class Progress extends React.Component {
  constructor(props) {
    super(props)
    const {perc} = props
    this.state = {
      maxPerc: perc,
      currentPerc: 0,
      color: perc > 33 ? perc > 66 ? perc == 100 ? "is-primary" : "is-success": "is-warning" : 'is-danger',
      interval: null
    }
    this.tickPercentage = this.tickPercentage.bind(this)
  }
  componentDidMount() {
    const interval = setInterval(this.tickPercentage, 10)
    this.setState({interval})
  }
  tickPercentage() {
    let {currentPerc, maxPerc, interval} = this.state
      currentPerc++
      if (currentPerc >= maxPerc) {
        currentPerc = maxPerc
        clearInterval(interval)
        interval = null
      }
      this.setState({currentPerc, interval})
  }
  render() {
    const {maxPerc, currentPerc, color} = this.state
    return <progress className={`progress ${color}`} style={{width: '30vw'}} max="100" value={currentPerc} >%{currentPerc}</progress>
  }
}

function TableRow ({statName, value, highestStat}) {
  const perc = value / highestStat * 100
  return <tr className="tr">
    <td className="td">{statName}:</td>
    <td className="td">{value}</td>
    <td className="td">
      <Progress perc={perc} />
    </td>
  </tr>
}

export default function StatsTable ({pokemon}) {
  const {HP, Attack, Defense, SpAtk, SpDef, Speed} = pokemon
  let highestStat = solveHighestStat(pokemon)
  return <table className="table is-fullwidth is-bordered is-narrow is-striped is-hoverable">
    <tbody className="tbody">
      <TableRow highestStat={highestStat} value={HP} statName={"HP"} />
      <TableRow highestStat={highestStat} value={Attack} statName={"Attack"} />
      <TableRow highestStat={highestStat} value={Defense} statName={"Defense"} />
      <TableRow highestStat={highestStat} value={SpAtk} statName={"SpAtk"} />
      <TableRow highestStat={highestStat} value={SpDef} statName={"SpDef"} />
      <TableRow highestStat={highestStat} value={Speed} statName={"Speed"} />
    </tbody>
  </table>
}
