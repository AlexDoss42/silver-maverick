import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class TripTile extends Component {

  constructor(props) {
    super(props)

    const { trip_id, 
      // group_leader, 
      name, user_id } = this.props.trip

    this.state = {
      trip_id,
      // group_leader,
      name,
      user_id,
      tripPic: 'https://cidco-smartcity.niua.org/wp-content/uploads/2017/08/No-image-found.jpg'
    }
  }

  componentDidMount(){
    const { trip_id } = this.state

    axios.get(`/pin/tripPins/${trip_id}`)
    .then(res => {
      let { media_url } = res.data[0]
        this.setState({
          tripPic: media_url
        })
    })
    .catch(err => console.log(err))
  }

  render() {
    const { name, user_id, trip_id, tripPic } = this.state
    
    return (
      <div>
        <Link to = {`/trip/${user_id}/${trip_id}`}>
          <h1>{name}</h1>
        </Link>
        <img
          src={`${tripPic}`}
          alt='Dope Waterfall'
          style={{ width: '200px' }} />
        <button
          onClick={() => this.props.handleDelete(this.props.deleteId)}>Delete</button>
      </div>
    )
  }
}

export default TripTile