import React, { Component } from 'react'

class PickAUser extends Component {

  constructor(props) {
    super(props)

    const { username, firstname, lastname } = this.props.user

    this.state = {
      username,
      firstname,
      lastname,
      personClicked: false
    }
  }

  render() {

    const { username, firstname, lastname } = this.state

    if (this.state.personClicked === false) {
      return (
        <div>
          <h4>{username}</h4>
          <h6>{`${firstname} ${lastname}`}</h6>

          <button onClick={() => {
            this.props.addToInvitedList(this.props.user);
            this.setState({
              personClicked: !this.state.personClicked
            })
          }}>Invite</button>
        </div>
      )
    } else {
      return (
        <div>
          <h4>{username}</h4>
          <h6>{`${firstname} ${lastname}`}</h6>

          <button onClick={() => {
            this.props.addToInvitedList(this.props.user);
            this.setState({
              personClicked: !this.state.personClicked
            })
          }}>Remove</button>
        </div>
      )
    }


  }
}

export default PickAUser