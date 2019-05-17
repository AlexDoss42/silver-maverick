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

  handleRemove = async (user_id, trip_id) => {
    await axios.delete(`/group/members/${user_id}/${trip_id}`)
    
    await axios.get(`/group/members/${trip_id}`)
      .then(res => {
        this.setState({
          group: res.data
        })
      })
  }

  render() {

    let members = this.state.group.map((member) => (
      <GroupMember
        member={member}
        key={member.user_id}
        trip_id={this.state.trip_id}
        handleRemove={this.handleRemove}
      />
    ))

    return (

      <div>
        <h4>Your Adventure Buddies</h4>
        {members}
      </div>
    )
  }
}


export default Group