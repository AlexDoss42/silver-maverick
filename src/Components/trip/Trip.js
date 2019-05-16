import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
      user_id: null
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

  render() {

    const { name } = this.state
    return (
      <div>
        <h1> TRIP Name: {name}</h1>
        <Link to = '/trip/invite'>
          <button>Invite</button>
        </Link>
        <Calendar />
        <Weather />
        <Group />
        <TodoList />
        <Gear />
        <Chat />
        <TripBoard
          trip_id={this.props.trip_id} />
      </div>
    )
  }

}

const mapStateToProps = (reduxState, ownProps) => {
  return {
    trip_id: ownProps.match.params.trip_id
  }
}

export default connect(mapStateToProps)(Trip)