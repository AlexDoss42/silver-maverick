import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class PlanATrip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      group_leader: true,
      user_id: this.props.user_id,
      name: ''
    }
  }

  handleFormInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCreateTripSubmit = async (e) => {
    e.preventDefault()

    const {
      group_leader, name, user_id
    } = this.state

    axios.post('/trip', { group_leader, name, user_id })
    .catch(() => console.log('you did NOT create a trip'))


    // PUSH THIS TO THE TRIP PAGE YOU CAN DO THIS. YOU DID THIS WITH OWNPROPS ONCE. YOU CAN DO IT AGAIN THIS TECHNOLOGY IS LOCATED IN MYTRIPS.JS and TRIP.JS 
    
    this.props.history.push('/profile')

  }

  handleCancel = (e) => {
    e.preventDefault()
    this.props.history.push('/profile')
  }

  render() {
    return (
      <div>
        <h1>Plan A Trip</h1>

        <form onSubmit={this.handleCreateTripSubmit}>

          <input
            type='text'
            name='name'
            placeholder='Pick a Name for your Adventure'
            value={this.state.name}
            onChange={this.handleFormInputUpdate}
          />
          
          <button>Submit</button>
        </form>
          <button
          onClick={this.handleCancel}>Cancel</button>

      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const { user_id } = reduxState.account
  return { user_id }
}

export default connect(mapStateToProps)(withRouter(PlanATrip))