import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import PickAUser from '../account/PickAUser'

class Invite extends Component {
  constructor(props) {
    super(props)

    const { user_id } = this.props

    this.state = {
      user_id,
      users: []
    }
  }

  componentDidMount(){
    axios.get(`/auth/allUsers`)
    .then(res => {
      this.setState({
        users: res.data
      })
    })
    .catch(() => console.log('You have an error in your CDM for Invite.js'))
  }

  render(){
    
    const Users = this.state.users.map((user) => (
      <PickAUser
      user = {user}
      key = {user.user_id}
      trip_id = {this.props.trip_id}
      handleInvite = {this.props.handleInvite}
      />
    ))


    return(
      <div>
        <h2>Whose coming on this adventure?</h2>
        {Users}
        <button
        onClick = {this.props.handleCancelSave}>Cancel</button>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const { user_id } = reduxState.account
  return { user_id }
}

export default connect(mapStateToProps)(Invite)