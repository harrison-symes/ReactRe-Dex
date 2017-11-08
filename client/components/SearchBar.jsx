import React, {Component} from 'react'
import {connect} from 'react-redux'

import {toggleScrollModeAction} from '../actions/pokemon'
import {types, solveColor} from '../utils/solveTypeColor'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.updateSearch = this.updateSearch.bind(this)
    this.scrollModeToggle = this.scrollModeToggle.bind(this)
    this.reset = this.reset.bind(this)
  }
  scrollModeToggle() {
    this.props.toggleScrollMode()
  }
  updateSearch(e) {
    this.props.update(e.target.value)
  }
  reset() {
    this.props.reset()
  }
  render() {
    const {search, scrollMode, searchTier, searchedTypes, searchType} = this.props
    return <div className='container'>
      <div className="level columns">
        <button onClick={this.scrollModeToggle} className={`button is-outline ${scrollMode ? 'is-primary' : 'is-info'}`}>{scrollMode ? "Leave Scroll Mode" : "Enter Scroll Mode"}</button>
        <input className="input" type="text" value={search} name="search" onChange={this.updateSearch} />
        <div className="container">
          <select onChange={(e) => searchTier(e.target.value)} className="input has-text-centered">
            <option value={null} selected={searchTier == null}>All tiers</option>
            <option value={"LC"} selected={searchTier == "LC"}>LC: Little Cup</option>
            <option value={"PU"} selected={searchTier == "PU"}>PU: Stink Tier</option>
            <option value={"NU"} selected={searchTier == "NU"}>NU: Never Used</option>
            <option value={"RU"} selected={searchTier == "RU"}>RU: Rarely Used</option>
            <option value={"UU"} selected={searchTier == "UU"}>UU: Under Used</option>
            <option value={"OU"} selected={searchTier == "OU"}>OU: Over Used</option>
            <option value={"Uber"} selected={searchTier == "Uber"}>Uber: The Nuts</option>
          </select>
        </div>
        {searchedTypes.map(type => <button onClick={() => this.props.searchType(type)} style={{backgroundColor: solveColor(type)}} className={`button column is-2 has-text-centered`}>{type}</button>)}
        <button onClick={this.reset} className="button is-warning">Reset</button>
      </div>
      <div className="section">
        <div className="container columns is-multiline">
          {types.map(type => <p onClick={() => searchType(type)} style={{backgroundColor: solveColor(type) }} className={`button column is-2 has-text-centered`}>{type}</p>)}
        </div>
      </div>

    </div>
  }
}

const mapStateToProps = ({search, scrollMode, searchType}) => {
  return {
    search,
    scrollMode,
    searchedTypes: searchType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch({type: 'RESET_SEARCH'}),
    update: (search) => dispatch({type: 'UPDATE_SEARCH', search}),
    toggleScrollMode: () => dispatch(toggleScrollModeAction()),
    searchTier: (tier) => dispatch({type: 'SEARCH_TIER', tier}),
    searchType: (type) => dispatch({type: 'SEARCH_TYPE', typeName: type})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
