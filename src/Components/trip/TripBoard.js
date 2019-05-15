import React, { Component } from 'react'
import PinTile from '../tiles/PinTile'
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
    console.log('trip_id from CDM in TripBoard.js: ', trip_id)
    axios.get(`/pin/tripPins/${trip_id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          pinboard: res.data
        })
      })
      .catch(() => console.log('You have an error in your CDM for TripBoard.js'))
  }

  //FIX THIS SO IT DOESN'T DELETE PIN JUST REMOVES IT FROM THE TRIP!!!!!

  handleRemove = async (trip_id, removeId) => {
    await axios.put(`/pin/tripPins/${removeId}`)
    axios.get(`/pin/tripPins/${trip_id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          pinboard: res.data
        })
      })
  }

  handleEditPinSubmit = async (pin_id, title, media, description, url, price, address, city, state, country) => {

    axios.put(`/pin/${pin_id}`, { title, media, description, url, price, address, city, state, country })
      .then(res => {
        this.componentDidMount()
      })
  }


  render() {

    const Pins = this.state.pinboard.map((pin) => (
      <PinTile
        pin={pin}
        key={pin.pin_id}
        removeId={pin.pin_id}
        trip_id={this.state.trip_id}
        handleRemove={this.handleRemove}
        handleEdit={this.handleEditPinSubmit} />
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
// const mapStateToProps = (reduxState, ownProps) => {
//   return {
//     trip_id: ownProps.match.params.trip_id
//   }
// }

// export default connect(mapStateToProps)(TripBoard)

export default TripBoard