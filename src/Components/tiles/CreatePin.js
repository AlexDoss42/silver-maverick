import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class CreatePin extends Component {
  constructor() {
    super()

    this.state = {
      title: '',
      media: '',
      description: '',
      url: '',
      price: '',
      address: '',
      city: '',
      state: '',
      country: ''
    }
  }

  handleFormInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCreatePinSubmit = async (e) => {
    e.preventDefault()

    const {
      title, media, description, url, price, address, city, state, country
    } = this.state

    axios.post('/pin', {title, media, description, url, price, address, city, state, country})

    this.props.history.push('/')

  }

  handleCancel = (e) => {
    e.preventDefault()
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h1>Create a Pin</h1>

        <form onSubmit={this.handleCreatePinSubmit}>

          <input
            type='text'
            name='title'
            placeholder='Title'
            value={this.state.title}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='media'
            placeholder='Image URL'
            value={this.state.media}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={this.state.description}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='url'
            placeholder='Website URL'
            value={this.state.url}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='price'
            placeholder='Price'
            value={this.state.price}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='address'
            placeholder='Address'
            value={this.state.address}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='city'
            placeholder='City'
            value={this.state.city}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='state'
            placeholder='State/Providence'
            value={this.state.state}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='country'
            placeholder='Country'
            value={this.state.country}
            onChange={this.handleFormInputUpdate}
          />

          <button>Submit</button>
        </form>
          <button
          onClick={this.handleCancel}>Cancel</button>

      </div>
    )
  }
}



export default withRouter(CreatePin)