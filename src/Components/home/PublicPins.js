import React, { Component } from 'react'
import PinTile from '../tiles/PinTile'
import { Link } from 'react-router-dom'
import axios from 'axios'

class PublicPins extends Component {
  constructor() {
    super()

    this.state = {
      pinboard: []
    }
  }
  
  componentDidMount(){
    axios.get('/pin')
    .then(res => {
      this.setState({
        pinboard: res.data
      })
      console.log(this.state)
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

  handleEditPinSubmit = async (pin_id, title, media, description, url, price, address, city, state, country) => {

    axios.put(`/pin/${pin_id}`, {title, media, description, url, price, address, city, state, country})
    .then(res => {
      this.componentDidMount()
    })
  }


  render() {

    const Pins = this.state.pinboard.map((pin) => (
        <PinTile 
        pin={pin}
        key={pin.pin_id}
        deleteId = {pin.pin_id}
        handleDelete = {this.handleDelete}
        handleEdit = {this.handleEditPinSubmit} />
    ))


    return (
      <div>
        <h1>Need Inspiration?</h1>
        <Link to='/pin/create'>
          <button>Create a Pin</button>
        </Link>
        {Pins}

      </div>
    )
  }

}

export default PublicPins