import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PinTile extends Component {


  render() {
    const { title, media, description, url, price, address, city, state, country } = this.props.pin

    return (
      <div
        style={{ border: '1px solid black' }}>
        <a
          href={`${url}`}
          target='_blank'
          rel="noopener noreferrer"><h2>{title}</h2></a>
        <h4>${price}</h4>
        <h4>{city}, {state}, {country}</h4>
        <img src={media}
          alt={title}
          style={{ width: '200px' }} />
        <h4>{address}</h4>
        <p>{description}</p>
        <div>
          <Link to='/pin/edit'>
            <button>Edit</button>
          </Link>
          <button
            onClick={() => { this.props.handleDelete(this.props.deleteId) }}
          >Delete</button>
        </div>

      </div>
    )
  }
}



export default PinTile