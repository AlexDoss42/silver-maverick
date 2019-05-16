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

    this.state = {
      trip_id: null,
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
          trip_id: res.data[0].trip_id,
          // group_leader: res.data[0].group_leader,
          name: res.data[0].name,
          user_id: res.data[0].user_id
        })
      })
  }

  handleInvite(email, user_id, trip_id) {
    
  }

  handleClick = () => {
    this.setState({
      invite: !this.state.invite
    })
  }

  render() {

    const { name, invite, trip_id, user_id } = this.state

    if (invite === false) {
      return (
        <div>

          {/* YOU NEED TO CONDITIONALLY RENDER THE INVITE COMPONENT THEN LINK NOT LINK TO IT RIGHT OFF THE BAT. THIS IS HOW YOU PASS ALL THE STATE TO PROPS THEN MAP ALL THE USERS TO PICKAUSER.JS SO YOU CAN PASS PROPS */}
          <h1> TRIP Name: {name}</h1>

          <button
            onClick={() => this.handleClick()}>Invite</button>
          <Calendar />
          <Weather />
          <Group />
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