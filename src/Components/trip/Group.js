import React, { Component } from 'react'
import GroupMember from '../tiles/GroupMember';
import axios from 'axios'

class Group extends Component {
  constructor(props) {
    super(props)

    const { trip_id } = this.props

    this.state = {
      trip_id,
      group: []
    }
  }

  componentDidMount() {

    const { trip_id } = this.state
    axios.get(`/group/members/${trip_id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          group: res.data
        })
      })
      .catch(() => console.log('You have an error in your CDM for Group.js'))
  }

  //FIX THIS SO IT DOESN'T DELETE USER JUST REMOVES IT FROM THE TRIP!!!!!

  handleRemove = async (user_id, trip_id) => {
    await axios.delete(`/pin/trip/${user_id}/${trip_id}`)
    axios.get(`/group/members/${trip_id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          group: res.data
        })
      })
  }

  render() {

    const members = this.state.group.map((member, i) => (
      <GroupMember
        member={member}
        key={i}
        trip_id={this.state.trip_id}
        handleRemove={this.handleRemove}
      />
    ))
    return (

      <div>
        <h1>ALL YOUR FRIENDS FOR THE ADVENTURE</h1>
        {members}
      </div>
    )
  }
}


export default Group