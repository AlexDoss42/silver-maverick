import React, { Component } from 'react'

class PickATrip extends Component {

  constructor(props) {
    super(props)

    const { trip_id, name, user_id } = this.props.trip

    const { pin_id } = this.props

    console.log('Pin_id destructured of of this.props.trip PickATrip.js', pin_id)

    this.state = {
      trip_id,
      name,
      user_id,
      pin_id
    }
  }

  render() {

    const { name, pin_id, trip_id } = this.state

    return (
      <div>
          <h4>{name}</h4>
        <img
          src='http://s3.amazonaws.com/ht-images.couchsurfing.com/u/4318879/871d1646-2e2b-4907-87cb-7b57a248ef5d'
          alt='Dope Waterfall'
          style={{ width: '40px' }} />
          <button onClick = {() => this.props.handleSave(pin_id, trip_id)}>Save</button>
      </div>
    )
  }
}

export default PickATrip