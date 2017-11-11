import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/logout'

function Nav (props) {
  return (
    <div className={`Nav hero is-small is-bold ${props.search == "krang" ? "is-danger" : "is-info"} level has-text-centered`}>
      <div className="hero-head section">
        <div className="level-right level-item">
          <Link className="button is-info is-inverted" to="/">Home</Link>
        </div>
      </div>
      <div className="hero-body">
        <h1 className="title is-1 level-item">React Re-Dex</h1>
        <p className="subtitle is-3">The Fully Stacked Poke-Dex</p>
      </div>
      <div className="hero-foot">
        {props.auth.isAuthenticated
          ? <div className="level">
            <div className="level-left">
              <h1 className="subtitle is-3">{props.auth.user.user_name}</h1>
            </div>
            <div className="level-item">
              <h1 className="subtitle is-3">{props.caughtPokemon.length} Pokemon</h1>
            </div>
            <div className="level-item">
              <h1 className="subtitle is-3">0 Teams</h1>
            </div>
            <div className="level-right">
              <button className="level-right button is-warning" button onClick={() => props.dispatch(logoutUser())}>Logout</button>
            </div>
          </div>
          : <div className="level-right">
            <Link className="button is-info is-inverted is-outline" to="/login">Login</Link>
            <Link className="button is-info is-inverted is-outline" to="/register">Register</Link>
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = ({auth, search, caughtPokemon}) => {
  return {auth, search, caughtPokemon}
}

export default connect(mapStateToProps)(Nav)
