import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class TripTile extends Component {

  constructor(props) {
    super(props)

    const { trip_id, name, user_id } = this.props.trip

    this.state = {
      trip_id: trip_id,
      name: name,
      user_id: user_id
    }
  }

  render() {

    const { name, user_id, trip_id } = this.state

    return (
      <div>
        <Link to = {`/trip/${user_id}/${trip_id})`}>
          <h1>{name}</h1>
        </Link>
        <img
          src='http://s3.amazonaws.com/ht-images.couchsurfing.com/u/4318879/871d1646-2e2b-4907-87cb-7b57a248ef5d'
          alt='Dope Waterfall'
          style={{ width: '200px' }} />
        <button
          onClick={() => this.props.handleDelete(this.props.deleteId)}>Delete</button>
      </div>
    )
  }
}

export default TripTile