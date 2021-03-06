import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import store from '../../redux/store'
import MyTrips from './MyTrips'

class Profile extends Component {

  componentDidMount() {
    axios.get('/auth/session').then(res => {
      if (!res.data.email) {
        this.props.history.push('/')
      }

      store.dispatch(
        {
          type: 'REFRESH_SESSION',
          payload: res.data.user
        }
      )
    })
  }

  render() {
    return (
      <div className='profilePage'>
        <h1>Where to next {this.props.username}?</h1>
        <div className='profilePageBtnContainer'>
          <Link to='/trip/plan'>
            <button>Plan a Trip</button>
          </Link>
          <Link to='/pin/create'>
            <button>Create a Pin</button>
          </Link>
        </div>

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