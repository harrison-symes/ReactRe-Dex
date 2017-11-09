import React, {Component} from 'react'
import {connect} from 'react-redux'

import {toggleScrollModeAction} from '../actions/pokemon'
import {types, solveColor} from '../utils/solveTypeColor'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAdvanced: false
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.scrollModeToggle = this.scrollModeToggle.bind(this)
    this.toggleAdvanced = this.toggleAdvanced.bind(this)
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
  toggleAdvanced() {
    this.setState({showAdvanced: !this.state.showAdvanced})
  }
  render() {
    const {search, scrollMode, searchTier, searchedTypes, searchType, searchGen, searchForGen} = this.props
    const {showAdvanced} = this.state
    let typeList = types
    if (search.toLowerCase() == "krang") typeList = types.map(() => "Krang")
    return <div className='section search-container has-text-centered'>
      <div className="level columns">
        <button onClick={this.scrollModeToggle} className={`button is-outline ${scrollMode ? 'is-primary' : 'is-info'}`}>{scrollMode ? "Leave Scroll Mode" : "Enter Scroll Mode"}</button>
        <input className="input" type="text" value={search} name="search" onChange={this.updateSearch} />
        {searchedTypes.map(type => <button onClick={() => this.props.searchType(type)} style={{backgroundColor: solveColor(type)}} className={`button column is-2 has-text-centered`}>{type}</button>)}
        <button onClick={this.reset} className="button is-warning">Reset</button>
      </div>
      {showAdvanced && <div className="section">
        <div className="level">

          <div className="container">
            <select onChange={(e) => searchTier(e.target.value)} className="input has-text-centered">
              <option value={null} >All tiers</option>
              <option value={"LC"} >LC: Little Cup</option>
              <option value={"PU"} >PU: Stink Tier</option>
              <option value={"BL4"} >BL4: BorderLine (PU - NU)</option>
              <option value={"NU"} >NU: Never Used</option>
              <option value={"BL3"} >BL3: BorderLine (NU - RU)</option>
              <option value={"RU"} >RU: Rarely Used</option>
              <option value={"BL2"} >BL2: BorderLine (RU - UU)</option>
              <option value={"UU"} >UU: Under Used</option>
              <option value={"BL"} >BL: BorderLine (UU - OU)</option>
              <option value={"OU"} >OU: Over Used</option>
              <option value={"Uber"} >Uber: The Nuts</option>
            </select>
          </div>
          <div className="container">
            <select defautlValue={searchGen} onChange={(e) => searchForGen(e.target.value)} className="input has-text-centered">
              <option value={null} >All Generations</option>
              <option value={"RB"} >RBGY (1): Red / Blue / Green / Yellow </option>
              <option value={"GS"} >GSC (2): Gold / Silver / Crystal</option>
              <option value={"RS"} >RSE (3): Ruby / Sapphire / Emerald </option>
              <option value={"DP"} >DPP (4): Diamond / Pearl / Platinum </option>
              <option value={"BW"} >BW (5): Black / White (1/2)</option>
              <option value={"XY"} >XY (6): X / Y</option>
              <option value={"SM"} >SM (7): Sun / Moon</option>
            </select>
          </div>
        </div>
        <div className=" columns is-multiline">
          {typeList.map(type => <p onClick={() => searchType(type)} style={{backgroundColor: solveColor(type) }} className={`button column is-2 has-text-centered`}>{type}</p>)}
        </div>
      </div>}

      <button className="button is-info" onClick={this.toggleAdvanced}>{showAdvanced ? "Hide Advanced" : "Show Advanced Options"}</button>
    </div>
  }
}

const mapStateToProps = ({search, scrollMode, searchType, searchGen}) => {
  return {
    search,
    scrollMode,
    searchedTypes: searchType,
    searchGen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch({type: 'RESET_SEARCH'}),
    update: (search) => dispatch({type: 'UPDATE_SEARCH', search}),
    toggleScrollMode: () => dispatch(toggleScrollModeAction()),
    searchTier: (tier) => dispatch({type: 'SEARCH_TIER', tier}),
    searchType: (type) => dispatch({type: 'SEARCH_TYPE', typeName: type}),
    searchForGen: (gen) => dispatch({type: 'SEARCH_GEN', gen})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
