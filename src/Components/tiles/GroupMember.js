import React, { Component } from 'react'

class GroupMember extends Component {
  constructor(props) {
    super(props)

    const { user_id, firstName, lastName, email, phone, venmo, username, profilePic } = this.props.member
    const { trip_id } = this.props

    this.state = {
      trip_id,
      user_id, 
      firstName, 
      lastName, 
      email, 
      phone, 
      venmo, 
      username, 
      profilePic
    }
  }

  render() {
    const { trip_id, user_id, firstName, lastName, email, phone, venmo, username, profilePic } = this.state

    return (
      <div
        style={{ border: '1px solid black' }}>
        <img src={profilePic}
        alt={username}
        style={{ width: '200px' }} />
        <h4>Username: {username}</h4>
        <h5>Full Name: {firstName} {lastName}</h5>
        <h5>Phone: {phone}</h5>
        <h5>Email: {email}</h5>
        <h5>Venmo Handle: {venmo}</h5>
        <div>

          <button
            onClick={() => {
              this.props.handleRemove(user_id, trip_id)
            }}>Remove</button>

        </div>
      </div>
    )
  }
}

export default GroupMember