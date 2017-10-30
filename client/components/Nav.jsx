import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/logout'

function Nav (props) {
  return (
    <div className="Nav hero is-medium is-bold is-info level has-text-centered level">
      <h1 className="title is-1 level-item">React Re-Dex</h1>
      <div className="level-left level-item">
        <Link className="button is-info is-inverted" to="/">Home</Link>
      </div>
      {props.auth.isAuthenticated
        ? <button onClick={() => props.dispatch(logoutUser())}>Logout</button>
        : <div className="level-right">
          <Link className="button is-info is-inverted is-outline" to="/login">Login</Link>
          <Link className="button is-info is-inverted is-outline" to="/register">Register</Link>
        </div>
      }

    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return {auth}
}

export default connect(mapStateToProps)(Nav)
