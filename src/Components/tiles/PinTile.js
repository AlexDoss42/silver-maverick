import React, { Component } from 'react'

class PinTile extends Component {


  render() {
    const { title, media, description, url, price, address, city, state, country } = this.props.pin

    return (
      <div
        style={{ border: '1px solid black' }}>
        <h3>{title}</h3>
        <h4>${price}</h4>
        <h6>{city}, {state}, {country}</h6>
        <img src={media}
          alt={title}
          style={{ width: '200px' }} />
        <h6>{address}</h6>
        <p>{description}</p>
      </div>
    )
  }
}



export default PinTile