import React, { Component } from 'react'

class GroupMember extends Component {
  constructor(props) {
    super(props)

    const { user_id, firstname, lastname, email, phone, venmo, username, profilePic } = this.props.member
    const { trip_id } = this.props

    this.state = {
      trip_id,
      user_id, 
      firstname, 
      lastname, 
      email, 
      phone, 
      venmo, 
      username, 
      profilePic
    }
  }

  render() {
    const { trip_id, user_id, firstname, lastname, email, phone, venmo, username
      // , profilePic 
    } = this.state

    return (
      <div
      className='groupMember'
        >
        {/* <img src={profilePic}
        alt={username}
        /> */}
        <h5>Username: {username}</h5>
        <h6>First Name: {firstname} </h6>
        <h6>Last Name: {lastname}</h6>
        <h6>Phone: {phone}</h6>
        <h6>Email: {email}</h6>
        <h6>Venmo Handle: {venmo}</h6>
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