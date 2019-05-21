import React, { Component } from 'react';

class Item extends Component {
  constructor(props) {
    super(props)

    const { name , quantity, gear_id } = this.props.item
    const { deleteId } = this.props

    this.state = {
      gear_id,
      name,
      quantity,
      deleteId,
      edit: false
    }
  }

  handleEditItemSubmit = async (e) => {
    e.preventDefault()

    const { name, quantity, gear_id } = this.state

    this.props.handleEdit(name, quantity, gear_id)

    this.setState({
      edit: false
    })
  }

  handleFormInputUpdate = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCancel = () => {
    this.setState({
      edit: false
    })
  }

  render() {

    let { name, quantity, deleteId } = this.state

    if(this.state.edit === false) {
      return (
        <div>
          <p><em>{name}</em>: {quantity}</p>
          <button
          onClick={() => {
            this.setState({
              edit: true
            })
          }}>edit </button>
          <button
          onClick={() => {
            this.props.handleDelete(deleteId)
          }}> delete</button>
        </div>
      )
    } else {
      return(
        <div>
          <form onSubmit={this.handleEditItemSubmit}>
            <input
            type='text'
            name='name'
            placeholder='Gear name'
            value={this.state.name}
            onChange={this.handleFormInputUpdate}
            />
            <input
            type='number'
            name='quantity'
            placeholder='Quantity'
            value={this.state.quantity}
            onChange={this.handleFormInputUpdate}
            />
            <button>Submit</button>
          </form>
            <button
            onClick={()=> {
              this.handleCancel()
            }}>Cancel</button>
        </div>
      )
      
    }
    
  }
}

export default Item