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
    console.log('user_id from handleRemove: ', user_id, 'trip_id from handleremove: ', trip_id)
    await axios.delete(`/group/members/${user_id}/${trip_id}`)
    // this.componentDidMount()
    
    await axios.get(`/group/members/${trip_id}`)
      .then(res => {
        console.log('res.data from HandleRemove on Group.js: ', res.data)
        this.setState({
          group: res.data
        })
      })
  }

  render() {
    console.log('this needs to happen', 'This.state.group from render: ', this.state.group)

    let members = this.state.group.map((member) => (
      <GroupMember
        member={member}
        key={member.user_id}
        trip_id={this.state.trip_id}
        handleRemove={this.handleRemove}
      />
    ))

    console.log('members in render: ', members)
    return (

      <div>
        <h1>ALL YOUR FRIENDS FOR THE ADVENTURE</h1>
        {members}
      </div>
    )
  }
}


export default Group