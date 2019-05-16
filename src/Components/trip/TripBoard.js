import React, { Component } from 'react'
import PinnedPin from '../tiles/PinnedPins'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import { connect } from 'react-redux'

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

  //FIX THIS SO IT DOESN'T DELETE PIN JUST REMOVES IT FROM THE TRIP!!!!!

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

    const Pins = this.state.pinboard.map((pin, i) => (
      <PinnedPin
        pin={pin}
        key={i}
        trip_id={this.state.trip_id}
        handleRemove={this.handleRemove}
      />
    ))


    return (
      <div>
        <h1>Ideas for your Adventure</h1>
        <Link to='/pin/create'>
          <button>Create a Pin</button>
        </Link>
        {Pins}

      </div>
    )
  }
}

export default TripBoard