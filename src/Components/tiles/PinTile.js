import React, { Component } from 'react'
import axios from 'axios'

import SavePin from './SavePin'

class PinTile extends Component {
  constructor(props) {
    super(props)

    const { pin_id, title, media_url, description, url, price, address, city, state, country } = this.props.pin

    this.state = {
      pin_id,
      title,
      media_url,
      description,
      url,
      price,
      address,
      city,
      state,
      country,
      edit: false,
      save: false
    }
  }

  handleFormInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleEditPinSubmit = async (e) => {
    e.preventDefault()

    const {
      pin_id, title, media_url, description, url, price, address, city, state, country
    } = this.state

    this.props.handleEdit(pin_id, title, media_url, description, url, price, address, city, state, country)

    this.setState({
      edit: false
    })
  }

  handleCancel = (e) => {
    e.preventDefault()
    this.setState({
      edit: false
    })
  }

  clickSave = (e) => {
    e.preventDefault()
    this.setState({
      save: true
    })
  }

  handleCancelSave = () => {
    this.setState({
      save: false
    })
  }

  handleSave = (pin_id, trip_id) => {

    axios.put('/pinToTrip', { pin_id, trip_id })
    this.setState({
      save: false
    })
  }

  render() {
    const { title, media_url, description,
      // url, price, address,
      city, state, country } = this.props.pin

    if (this.state.save === false) {

      if (this.state.edit === false) {

        return (
          <div className='pinTile'
            style={{ borderRadius: '10px' }}>
            {/* <a
              href={`${url}`}
              target='_blank'
              rel="noopener noreferrer"> */}
            <h2>{title}</h2>
            {/* </a> */}
            {/* <h4>${price}</h4> */}
            <h4>{city}, {state}, {country}</h4>
            <img src={media_url}
              alt={title}
              style={{ width: 'inherit' }} />
            {/* <h4>{address}</h4> */}
            <p>{description}</p>
            <div className='pinTileButtons'>

              {/* <button
                onClick={() => {
                  this.setState({
                    edit: true
                  })
                }}>Edit</button> */}

              <button
                onClick={() => {
                  this.setState({
                    save: true
                  })
                }}>Save to Trip</button>

            </div>
          </div>
        )
      } else {
        return (
          <div
            className='editPinTile'
            >
            <h1>Create a Pin</h1>

            <form onSubmit={this.handleEditPinSubmit}>

              <input
                type='text'
                name='title'
                placeholder={this.state.title}
                value={this.state.title}
                onChange={this.handleFormInputUpdate}
              />
              <input
                type='text'
                name='media_url'
                placeholder={this.state.media_url}
                value={this.state.media_url}
                onChange={this.handleFormInputUpdate}
              />
              <input
                type='text'
                name='description'
                placeholder={this.state.description}
                value={this.state.description}
                onChange={this.handleFormInputUpdate}
              />
              <input
                type='text'
                name='url'
                placeholder={this.state.url}
                value={this.state.url}
                onChange={this.handleFormInputUpdate}
              />
              <input
                type='text'
                name='price'
                placeholder={this.state.price}
                value={this.state.price}
                onChange={this.handleFormInputUpdate}
              />
              <input
                type='text'
                name='address'
                placeholder={this.state.address}
                value={this.state.address}
                onChange={this.handleFormInputUpdate}
              />
              <input
                type='text'
                name='city'
                placeholder={this.state.city}
                value={this.state.city}
                onChange={this.handleFormInputUpdate}
              />
              <input
                type='text'
                name='state'
                placeholder={this.state.state}
                value={this.state.state}
                onChange={this.handleFormInputUpdate}
              />
              <input
                type='text'
                name='country'
                placeholder={this.state.country}
                value={this.state.country}
                onChange={this.handleFormInputUpdate}
              />

              <button>Submit</button>
            </form>
            <button
              onClick={this.handleCancel}>Cancel</button>

            <button
              onClick={() => { this.props.handleDelete(this.props.deleteId) }}
            >Delete</button>
          </div>
        )
      }
    } else {
      return (
        <div>
          <SavePin
            title={this.state.title}
            media_url={this.state.media_url}
            description={this.state.description}
            pin_id={this.state.pin_id}
            handleSave={this.handleSave}
            handleCancelSave={this.handleCancelSave}
          />
        </div>
      )
    }
  }
}

export default PinTile