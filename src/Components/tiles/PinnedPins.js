import React, { Component } from 'react'

class PinnedPin extends Component {
  constructor(props) {
    super(props)

    const { pin_id, title, media_url, description, url, price, address, city, state, country } = this.props.pin
    const { trip_id } = this.props

    this.state = {
      trip_id,
      pin_id,
      title,
      media_url,
      description,
      url,
      price,
      address,
      city,
      state,
      country
    }
  }

  render() {
    const { trip_id, pin_id, title, media_url, description, 
      // url, price, address, 
      city, state, country } = this.state

    return (
      <div
        className='pinnedPins'>
        {/* <a
          href={`${url}`}
          target='_blank'
          rel="noopener noreferrer"> */}
          <h2>{title}</h2>
          {/* </a> */}
        {/* <h4>${price}</h4> */}
        <h4>{city}, {state}, {country}</h4>
        <img src={media_url}
          alt={title}
           />
        {/* <h4>{address}</h4> */}
        <p>{description}</p>
        <div>

          <button
            onClick={() => {
              this.props.handleRemove(pin_id, trip_id)
            }}>Remove</button>

        </div>
      </div>
    )
  }
}

export default PinnedPin