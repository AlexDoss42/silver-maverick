import React, { Component } from 'react'
import axios from 'axios'

class Gear extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gearlist: [],
      itemName: '',
      quantity: null,
      username: '',
      user_id: this.props.user_id
    }

  }

  componentDidMount() {
    const { trip_id } = this.state
    axios.get(`/gear/tripGear/${trip_id}`)
    .then(res => {
      this.setState({
        gearlist: res.data
      })
    })
    .catch(() => console.log('you have an error in your CDM for Gear.js'))
  }

  CreateGear = () => {
    
  }

  handleOnClick = () => {

  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDelete = async (deleteId) => {
    const { trip_id } = this.props

    await axios.delete(`/gear/delete/${deleteId}`)
    axios.get(`/gear/triplist/${trip_id}`)
      .then(res => {
        this.setState({
          gear: res.data
        })
      })
  }

  render() {
    return (
      <h4>Gear for the trip</h4>
    )
  }
}
export default Gear