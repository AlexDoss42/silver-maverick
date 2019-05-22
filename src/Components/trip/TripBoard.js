import React, { Component } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'

import PinnedPin from '../tiles/PinnedPins'

class TripBoard extends Component {
  constructor(props) {
    super(props)

    const { trip_id } = this.props

    this.state = {
      trip_id,
      pinboard: []
    }
  }

  componentDidMount() {

    const { trip_id } = this.state
    axios.get(`/pin/tripPins/${trip_id}`)
      .then(res => {
        this.setState({
          pinboard: res.data
        })
      })
      .catch(() => console.log('You have an error in your CDM for TripBoard.js'))
  }

  handleRemove = async (pin_id, trip_id) => {
    await axios.delete(`/pin/trip/${pin_id}/${trip_id}`)
    axios.get(`/pin/tripPins/${trip_id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          pinboard: res.data
        })
      })
  }

  render() {

    const Pins = this.state.pinboard.map((pin) => (
      <PinnedPin
        pin={pin}
        key={pin.pin_id}
        trip_id={this.state.trip_id}
        handleRemove={this.handleRemove}
      />
    ))


    return (
      <div className='tripBoard'>
        <div className='tripBoardPseudoNav'>
          <h1>Ideas for your Adventure</h1>
          {/* <Link to='/pin/create'>
            <button>Create a Pin</button>
          </Link> */}
        </div>

        <div className='tripPinBoard'>
          {Pins}
        </div>

      </div>
    )
  }
}

export default TripBoard