import React, { Component } from 'react';

class Item extends Component {
  constructor(props) {
    super(props)

    const { name , quantity } = this.props.item
    const { deleteId } = this.props

    this.state = {
      name,
      quantity,
      deleteId
    }

  }

  render() {

    let { name, quantity, deleteId } = this.state

    return (
      <div>
        <p><em>{name}</em>: {quantity}</p>
        <span
        onClick={() => {
          this.props.handleDelete(deleteId)
        }}>x</span>
      </div>
    )
  }
}

export default Item