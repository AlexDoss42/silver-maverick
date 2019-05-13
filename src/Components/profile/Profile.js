import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


import MyTrips from './MyTrips'

class Profile extends Component {

  render() {
    return (
      <div>
        <h1>PROFILE PAGE</h1>
        <h2>Where to next {this.props.username}?</h2>
        <Link to='/trip/plan'>
          <button>Plan a Trip</button>
        </Link>
        <Link to='/pin/create'>
          <button>Create a Pin</button>
        </Link>

        <MyTrips />
        
      </div>
    )
  }

}

const mapStateToProps = (reduxState) => {
  const { username } = reduxState.account
  return { username }
}


export default connect(mapStateToProps)(Profile)