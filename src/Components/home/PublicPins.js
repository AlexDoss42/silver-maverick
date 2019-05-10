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
      console.log('your Pin res.data: ', res.data)
      this.setState({
        pinboard: res.data
      })
    })
    .catch(() => console.log('You have an error in your CDM for PublicPins.js'))
  }

  render() {

    const Pins = this.state.pinboard.map((pin, i) => (
        <PinTile 
        pin={pin}
        key={i}/>
    ))


    return (
      <div>
        <h1>PINBOARD!!!!</h1>
        <Link to='/pin/create'>
          <button>Create a Pin</button>
        </Link>
        {Pins}

      </div>
    )
  }

}

export default PublicPins