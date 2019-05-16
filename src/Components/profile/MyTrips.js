import React, { Component } from 'react'
import TripTile from '../tiles/TripTile'
import axios from 'axios'
import { connect } from 'react-redux'

class MyTrips extends Component {
  constructor() {
    super()

    this.state = {
      tripboard: []
    }
  }

  componentDidMount(){
    axios.get(`/trip/mytrips/${this.props.user_id}`)
    .then(res => {
      this.setState({
        tripboard: res.data
      })
    })
    .catch(() => console.log('You have an error in your CDM for MyTrips.js'))
  }

  handleDelete = async (deleteId) => {
    await axios.delete(`/trip/${deleteId}`)
    this.componentDidMount()
  }

  render() {

    const Trips = this.state.tripboard.map((trip) => (
      <TripTile
      trip = {trip}
      key = {trip.trip_id}
      deleteId = {trip.trip_id}
      handleDelete = {this.handleDelete}
      />
    ))


    return (
      <div
      style={{border: '1px solid black'}}>
        <h1>Where you have been, where you are, and where you are going</h1>

        {Trips}
        
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const { username, user_id } = reduxState.account
  return { username, user_id}
}


export default connect(mapStateToProps)(MyTrips)