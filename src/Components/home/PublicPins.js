import React, { Component } from 'react'
import PinTile from '../tiles/PinTile'
import { Link } from 'react-router-dom'
import axios from 'axios'

class PublicPins extends Component {
  constructor() {
    super()

    this.state = {
      pinboard: [],
      search_input: ''
    }
  }

  componentDidMount() {
    axios.get('/pin')
      .then(res => {
        this.setState({
          pinboard: res.data
        })
      })
      .catch(() => console.log('You have an error in your CDM for PublicPins.js'))
  }

  handleDelete = async (deleteId) => {
    await axios.delete(`/pin/${deleteId}`)
    axios.get('/pin')
      .then(res => {
        this.setState({
          pinboard: res.data
        })
      })
  }

  handleEditPinSubmit = async (pin_id, title, media_url, description, url, price, address, city, state, country) => {

    axios.put(`/pin/${pin_id}`, { title, media_url, description, url, price, address, city, state, country })
      .then(res => {
        this.componentDidMount()
      })
  }

  handleSearchInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {

    const { search_input } = this.state

    const Pins = this.state.pinboard.map((pin) => (
      <PinTile
        pin={pin}
        key={pin.pin_id}
        deleteId={pin.pin_id}
        handleDelete={this.handleDelete}
        handleEdit={this.handleEditPinSubmit} />
    ))

    const filteredPins = Pins.filter(pin => {
      const lowerCaseTitle = pin.props.pin.title.toLocaleLowerCase()
      const lowerCaseDescription = pin.props.pin.description.toLocaleLowerCase()
      const lowerCaseCity = pin.props.pin.city.toLocaleLowerCase()
      const lowerCaseState = pin.props.pin.state.toLocaleLowerCase()
      const lowerCaseCountry = pin.props.pin.country.toLocaleLowerCase()
      const lowerCaseSearch_input = search_input.toLocaleLowerCase()
      if (search_input !== '') {
        return (
          lowerCaseTitle.includes(lowerCaseSearch_input) || lowerCaseDescription.includes(lowerCaseSearch_input) || lowerCaseCity.includes(lowerCaseSearch_input) || lowerCaseState.includes(lowerCaseSearch_input) || lowerCaseCountry.includes(lowerCaseSearch_input)
        )
      } else {
        return Pins
      }
    })

    return (
      <div className='publicPins'>
        <h1>Need Inspiration?</h1>
        <div className='pinboardPseudoNav'>
          <Link to='/pin/create'>
            <button>Create a Pin</button>
          </Link>
          <input
            name='search_input'
            value={this.state.search_input}
            placeholder='Search for your next adventure'
            onChange={this.handleSearchInput}></input>
        </div>
        <div className='publicPinBoard'>
          {filteredPins}
        </div>

      </div>
    )
  }

}

export default PublicPins