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
      quantity: null,
      trip_id,
      edit: false,
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

  CreateGear = () => {
    const { name, quantity } = this.state
    axios.post('/gear/item', { name, quantity })
    this.componentDidMount()
  }

  handleOnClickCreate = () => {
    this.setState({
      addGear: !this.state.addGear
    })
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

  handleEditPinSubmit = async (name, quantity, gear_id) => {

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
    if(this.state.addGear === false) {
      return (
        <>
          <h4>Gear for the trip</h4>
          <button
          onClick={()=> {
            this.handleOnClickCreate()
          }}>Add Gear</button>
          {Items}
        </>
      )
    } else {
      return (
        <>
          <h4>Gear for the trip</h4>
          <div>
            <input/>
            <input/>
            <button
            onClick={()=> {
            this.handleOnClickCreate()
          }}>Submit</button>
            <button
            onClick={()=> {
              this.handleOnClickCreate()
            }}>Cancel</button>
          </div>
          {Items}
        </>
      )
    }
    
  }
}
export default Gear