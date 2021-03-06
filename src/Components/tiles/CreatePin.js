import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import store from '../../redux/store'

class CreatePin extends Component {
  constructor() {
    super()

    this.state = {
      title: '',
      media_url: '',
      description: '',
      url: '',
      price: '',
      address: '',
      city: '',
      state: '',
      country: ''
    }
  }

  componentDidMount() {

    axios.get('/auth/session').then(res => {

      if (!res.data.email) {
        this.props.history.push('/')
      }

      store.dispatch(
        {
          type: 'REFRESH_SESSION',
          payload: res.data.user
        }
      )
    })
  }

  handleFormInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCreatePinSubmit = async (e) => {
    e.preventDefault()

    const {
      title, media_url, description, url, price, address, city, state, country
    } = this.state

    if (title === '') {
      alert('Pin title is required')
    } else if (media_url === '') {
      alert('Image url is required')
    } else if (description === '') {
      alert('A brief description is required')
    } else if (address === '') {
      alert('Address is required')
    } else if (city === '') {
      alert('City or location name is required')
    } else if (state === '') {
      alert('state/Providence is required')
    } else if (country === '') {
      alert('Country is required')
    } else {

      axios.post('/pin', { title, media_url, description, url, price, address, city, state, country })

      this.props.history.push('/')

    }
  }

  handleCancel = (e) => {
    e.preventDefault()
    this.props.history.push('/')
  }

  render() {
    return (
      <div className='createAPinForm'>
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
            name='media_url'
            placeholder='Image URL'
            value={this.state.media_url}
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