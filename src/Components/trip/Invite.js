import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import PickAUser from '../account/PickAUser'

class Invite extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      invited: []
    }
  }

  componentDidMount() {
    axios.get(`/auth/allUsers`)
      .then(res => {
        this.setState({
          users: res.data
        })
      })
      .catch(() => console.log('You have an error in your CDM for Invite.js'))
  }

  addToInvitedList = (user) => {
    const invitedCopy = [...this.state.invited]

    const CheckIfAlreadyInvited = invitedCopy.filter(invitedUser => (
      user.user_id === invitedUser.user_id
    ))

    if (CheckIfAlreadyInvited.length === 1) {
      const duplicateUser = invitedCopy.indexOf(user)

      invitedCopy.splice(duplicateUser, 1)

      this.setState({
        invited: [...invitedCopy]
      })
    } else {
      this.setState({
        invited: [...invitedCopy, user]
      })
    }
  }

  render() {

    const { trip_id, name, user_id, handleClick, handleInvite } = this.props

    const Users = this.state.users.map((user, i) => (
      <PickAUser
        user={user}
        key={i}
        trip_id={trip_id}
        user_id={user_id}
        handleInvite={handleInvite}
        handleClick={handleClick}
        addToInvitedList = {this.addToInvitedList}
      />
    ))


    return (
      <div>
        <h2>Whose coming with you on {name}?</h2>
        {Users}
        <button
          onClick={handleClick}>Done</button>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const { user_id } = reduxState.account
  return { user_id }
}

export default connect(mapStateToProps)(Invite)