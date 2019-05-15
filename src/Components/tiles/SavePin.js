import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import PickATrip from '../tiles/PickATrip'

class SavePin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      myTrips: []
    }
  }

  componentDidMount(){
    axios.get(`/trip/mytrips/${this.props.user_id}`)
    .then(res => {
      this.setState({
        myTrips: res.data
      })
    })
    .catch(() => console.log('You have an error in your CDM for MyTrips.js'))
  }

  render(){
    console.log('this.props.Pin_id at savePin.js', this.props.pin_id)
    const Trips = this.state.myTrips.map((trip) => (
      <PickATrip
      trip = {trip}
      key = {trip.trip_id}
      pin_id = {this.props.pin_id}
      handleSave = {this.props.handleSave}
      />
    ))


    return(
      <div>
        <h2>Choose a Trip</h2>
        {Trips}
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const { user_id } = reduxState.account
  return { user_id }
}

export default connect(mapStateToProps)(SavePin)