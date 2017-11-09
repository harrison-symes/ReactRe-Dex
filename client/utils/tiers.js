export function solveTier(tier) {
  switch(tier) {
    case 'LC': return 'LC'
    case 'PU': return 'PU'
    case 'BL4': return 'NU'
    case 'NU': return 'NU'
    case 'BL3': return 'RU'
    case 'RU': return 'RU'
    case 'BL2': return 'UU'
    case 'UU': return 'UU'
    case 'BL': return 'OU'
    case 'OU': return 'OU'
    case 'UBER': return 'Uber'
    default: return null
  }
}
