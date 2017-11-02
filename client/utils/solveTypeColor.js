

export function solveColor (type) {
  switch(type) {
    case 'Grass':
      return '#A7DB8D'
    case 'Fire':
      return '#F5AC78'
    case 'Water':
      return '#9DB7F5'
    case 'Fighting':
      return "#D67873"
    case 'Electric':
      return '#FAE078'
    case 'Dragon':
      return '#A27DFA'
    case 'Bug':
      return '#C6D16E'
    case 'Normal':
      return '#C6C6A7'
    case 'Flying':
      return '#C6B7F5'
    case 'Fairy':
      return '#F4BDC9'
    case 'Ghost':
      return '#A292BC'
    case 'Ground':
      return '#EBD69D'
    case 'Ice':
      return '#BCE6E6'
    case 'Steel':
      return '#D1D1E0'
    case 'Poison':
      return '#C183C1'
    case 'Psychic':
      return '#FA92B2'
    case 'Rock':
      return '#D1C17D'
    case 'Dark':
      return '#A29288'
    default:
      return 'light-grey'
  }
}
