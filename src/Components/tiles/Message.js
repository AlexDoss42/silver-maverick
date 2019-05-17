import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props)

    const { username, message } = this.props.message
    const { deleteId } = this.props

    this.state = {
      message,
      username,
      deleteId
    }

  }

  render() {

    let { message, username, deleteId } = this.state

    return (
      <div>
        <p><em>{username}</em>: {message}</p>
        <p
        onClick={() => {
          this.props.handleDelete(deleteId)
        }}>x</p>
      </div>
    )
  }
}

export default Message