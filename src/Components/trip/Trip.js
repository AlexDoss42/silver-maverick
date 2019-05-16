import React, { Component } from 'react'

import Invite from './Invite'
import Calendar from './Calendar'
import Weather from './Weather'
import Group from './Group'
import TodoList from './TodoList'
import Gear from './Gear'
import TripBoard from './TripBoard'
import Chat from './Chat'
import { connect } from 'react-redux';
import axios from 'axios';

class Trip extends Component {
  constructor(props) {
    super(props)

    const { trip_id } = this.props

    this.state = {
      trip_id,
      // group_leader: true,
      name: '',
      user_id: null,
      invite: false
    }
  }

  componentDidMount() {
    axios.get(`/trip/${this.props.trip_id}`)
      .then(res => {
        this.setState({
          // group_leader: res.data[0].group_leader,
          name: res.data[0].name,
          user_id: res.data[0].user_id
        })
        console.log('this.state on trip.js: ', this.state)
      })
  }

  handleClick = () => {
    this.setState({
      invite: !this.state.invite
    })
  }

  render() {

    const { name, invite, trip_id, user_id } = this.state

    console.log('trip_id destructured off off of this.state in Trip.js: ', trip_id)

    if (invite === false) {
      return (
        <div>

          <h1>{name}</h1>

          <button
            onClick={() => this.handleClick()}>Invite</button>
          <Calendar />
          <Weather />
          <Group 
          trip_id={trip_id}/>
          <TodoList />
          <Gear />
          <Chat />
          <TripBoard
            trip_id={trip_id}
          />
        </div>
      )
    } else {
      return (
        <div>
          <Invite
            trip_id={trip_id}
            name={name}
            user_id={user_id}
            handleInvite={this.handleInvite}
            handleClick={this.handleClick}
          />
        </div >
      )
    }
  }
}

const mapStateToProps = (reduxState, ownProps) => {
  return {
    trip_id: ownProps.match.params.trip_id
  }
}

export default connect(mapStateToProps)(Trip)