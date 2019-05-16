import React, { Component } from 'react'

class PickAUser extends Component {

  constructor(props) {
    super(props)

    const { user_id, username, firstname, lastname, email } = this.props.user

    const { trip_id } = this.props


    this.state = {
      trip_id,
      user_id,
      username,
      firstname,
      lastname,
      email
    }
  }

  render() {

    const { trip_id, user_id, username, firstname, lastname, email } = this.state

    return (
      <div>
          <h4>{username}</h4>
          <h6>{`${firstname} ${lastname}`}</h6>
      
          <button onClick = {() => this.props.handleInvite(email, user_id, trip_id)}>Invite</button>
      </div>
    )
  }
}

export default PickAUser