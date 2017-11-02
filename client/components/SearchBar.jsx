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
    const {search, scrollMode} = this.props
    return <div className='container'>
      <div className="level">
        <button onClick={this.scrollModeToggle} className={`button is-outline ${scrollMode ? 'is-primary' : 'is-info'}`}>{scrollMode ? "Leave Scroll Mode" : "Enter Scroll Mode"}</button>
        <input className="input" type="text" value={search} name="search" onChange={this.updateSearch} />
        <button onClick={this.reset} className="button is-warning">Reset</button>
      </div>
      <div className="section columns is-multiline">
        {types.map(type => <p onClick={() => this.props.update(type)} style={{backgroundColor: solveColor(type) }} className={`button column is-2 has-text-centered`}>{type}</p>)}
      </div>
    </div>
  }
}

const mapStateToProps = ({search, scrollMode}) => {
  return {
    search,
    scrollMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch({type: 'RESET_SEARCH'}),
    update: (search) => dispatch({type: 'UPDATE_SEARCH', search}),
    toggleScrollMode: () => dispatch(toggleScrollModeAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
