import React from 'react'

function solveHighestStat (pokemon) {
  const {HP, Attack, Defense, SpAtk, SpDef, Speed} = pokemon
  const stats = {HP, Attack, Defense, SpAtk, SpDef, Speed}
  let highestStat = HP
  for (let key in stats) {
    console.log(key, stats[key], highestStat);
    if (Number(stats[key]) > highestStat) highestStat = stats[key]
    console.log({highestStat});
  }
  return highestStat
}

function TableRow ({statName, value, highestStat}) {
  const perc = value / highestStat * 100
  const color = perc > 33 ? perc > 66 ? perc == 100 ? "is-primary" : "is-success": "is-warning" : 'is-danger'
  return <tr className="tr">
    <td className="td">{statName}:</td>
    <td className="td">{value}</td>
    <td className="td">
      <progress className={`progress ${color}`} style={{width: '30vw'}} max="100" value={perc} >%{perc}</progress>
    </td>
  </tr>
}

export default function StatsTable ({pokemon}) {
  const {HP, Attack, Defense, SpAtk, SpDef, Speed} = pokemon
  let highestStat = solveHighestStat(pokemon)
  console.log(highestStat);
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
