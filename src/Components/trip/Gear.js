import React, { Component } from 'react'
import Item from '../tiles/Item'
import axios from 'axios'

class Gear extends Component {
  constructor(props) {
    super(props)

    const { trip_id } = this.props

    this.state = {
      gearlist: [],
      name: '',
      quantity: '',
      trip_id,
      addGear: false
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

  handleAddClick() {
    this.setState({
      addGear: !this.state.addGear
    })
  }

  handleCreateGearSubmit = async (e) => {
    e.preventDefault()

    let { name, quantity, trip_id } = this.state

    if (name === '') {
      alert('Gear name is required')
    } else if (quantity === '') {
      alert('You need to put a quantity on that item')
    } else {

      axios.post('/gear/item', { name, quantity, trip_id })
        .then(res => {
          this.componentDidMount()
        })

      this.setState({
        name: '',
        quantity: '',
        addGear: !this.state.addGear
      })
    }
  }

  handleFormInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleDelete = async (deleteId) => {
    const { trip_id } = this.props

    await axios.delete(`/gear/delete/${deleteId}`)
    axios.get(`/gear/tripGear/${trip_id}`)
      .then(res => {
        this.setState({
          gearlist: res.data
        })
      })
  }

  handleEditSubmit = async (name, quantity, gear_id) => {
    console.log(gear_id)
    axios.put(`/gear/update/${gear_id}`, { name, quantity })
      .then(res => {
        this.componentDidMount()
      })
  }

  handleOnClickEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  render() {

    const Items = this.state.gearlist.map((item) => (
      <Item
        item={item}
        key={item.gear_id}
        deleteId={item.gear_id}
        handleDelete={this.handleDelete}
        handleEdit={this.handleEditSubmit}
        handleOnClickEdit={this.handleOnClickEdit}
      />
    ))

    if (this.state.addGear === false) {
      return (
        <div className='gearList'>
          <h4>Gear for the trip</h4>
          <div className="items">
            {Items}
          </div>
          <button
          className='addBtn'
            onClick={() => {
              this.handleAddClick()
            }}>Add Gear</button>
        </div>
      )
    } else {
      return (
        <>
          <h4>Gear for the trip</h4>
          <form onSubmit={this.handleCreateGearSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Gear name'
              value={this.state.name}
              onChange={this.handleFormInputUpdate}
            />
            <input
              type='number'
              name='quantity'
              placeholder='Quantity'
              value={this.state.quantity}
              onChange={this.handleFormInputUpdate}
            />
            <button>Submit</button>
          </form>
          <button
            onClick={() => {
              this.handleAddClick()
            }}>Cancel</button>
        </>
      )
    }

  }
}
export default Gear