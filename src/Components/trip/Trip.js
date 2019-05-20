import React, { Component } from 'react'

import Invite from './Invite'
// import Calendar from './Calendar'
// import Weather from './Weather'
import Group from './Group'
import TodoList from './TodoList'
import Gear from './Gear'
import TripBoard from './TripBoard'
import Chat from './Chat'
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../../redux/store'

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

    axios.get('/auth/session').then(res => {

      if (!res.data.email) {
        this.props.history.push('/')
      }

      store.dispatch(
        {
          type: 'REFRESH_SESSION',
          payload: res.data.user
        }
      )
    })

    axios.get(`/trip/${this.props.trip_id}`)
      .then(res => {
        this.setState({
          // group_leader: res.data[0].group_leader,
          name: res.data[0].name,
          user_id: res.data[0].user_id
        })
      })
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

          <h1>{name}</h1>


          {/* <Calendar /> */}
          {/* <Weather /> */}
          <Group
            trip_id={trip_id} />
          <button
            onClick={() => this.handleClick()}>Invite</button>
          <TodoList 
          trip_id = {trip_id}/>
          <Gear 
          trip_id = {trip_id}/>
          <Chat
            trip_id={trip_id} />
          <TripBoard
            trip_id={trip_id} />
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