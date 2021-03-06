import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import PickAUser from '../account/PickAUser'

class Invite extends Component {
  constructor(props) {
    super(props)

    const { username } = this.props

    this.state = {
      users: [],
      invited: [],
      search_input: '',
      invite_email: '',
      invite_name: '',
      username
    }
  }

  componentDidMount() {
    axios.get(`/auth/allUsers`)
      .then(res => {
        let usersCopy = [...res.data]
        let findMyUser = usersCopy.filter(user => (this.props.user_id === user.user_id))
        if (findMyUser.length === 1) {
          const myUserIndex = usersCopy.indexOf(findMyUser[0])
          usersCopy.splice(myUserIndex, 1)
        }
        this.setState({
          users: [...usersCopy]
        })
      })
      .catch(() => console.log('You have an error in your CDM for Invite.js'))
  }

  addToInvitedList = (user) => {
    const invitedCopy = [...this.state.invited]

    const CheckIfAlreadyInvited = invitedCopy.filter(invitedUser => (
      user.user_id === invitedUser.user_id
    ))

    if (CheckIfAlreadyInvited.length === 1) {
      const duplicateUser = invitedCopy.indexOf(user)

      invitedCopy.splice(duplicateUser, 1)

      this.setState({
        invited: [...invitedCopy]
      })
    } else {
      this.setState({
        invited: [...invitedCopy, user]
      })
    }
  }

  AddUsersToTrip = (invited) => {
    const { trip_id } = this.props
    axios.post('/auth/invite', { invited, trip_id })
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleInviteEmail = () => {
    const { username, invite_email, invite_name } = this.state

    if (invite_email === '') {
      alert('Email is required')
    } else if (invite_name === '') {
      alert('Name is required')
    } else {

      axios.post('/auth/newUser', { username, invite_email, invite_name })
        .then(() => {

        })
        .catch(err => console.log('err in handleInviteEmail in Invite.js: ', err))

      this.setState({
        invite_email: '',
        invite_name: ''
      })
    }
  }

  render() {

    const { search_input } = this.state

    const { name, handleClick } = this.props

    const Users = this.state.users.map((user, i) => (
      <PickAUser
        user={user}
        key={i}
        addToInvitedList={this.addToInvitedList}
      />
    ))

    const filteredUsers = Users.filter(user => {
      const lowerCaseUsername = user.props.user.username.toLocaleLowerCase()
      const lowerCaseFirstName = user.props.user.firstname.toLocaleLowerCase()
      const lowerCaseLastName = user.props.user.lastname.toLocaleLowerCase()
      const lowerCaseSearch_input = search_input.toLocaleLowerCase()
      if (search_input !== '') {
        return (
          lowerCaseUsername.includes(lowerCaseSearch_input) || lowerCaseFirstName.includes(lowerCaseSearch_input) || lowerCaseLastName.includes(lowerCaseSearch_input)
        )
      } else {
        return Users
      }
    })

    return (
      <div className='invitePage'>
        <h2>Whose coming with you on {name}?</h2>

        <input
          name='search_input'
          value={this.state.search_input}
          placeholder='Search for your adventure buddies'
          onChange={this.handleInput} />
          
       <div className='listOfInvitees'>
        {filteredUsers}
       </div>

        <button
          onClick={() => {
            handleClick();
            this.AddUsersToTrip(this.state.invited)
          }}>Done</button>


        <h4>Couldn't find your adventure buddy? Invite them to join TripDaddy</h4>

        <input
          name='invite_name'
          value={this.state.invite_name}
          placeholder="Your adventure buddy's name"
          onChange={this.handleInput}></input>

        <input
          name='invite_email'
          value={this.state.invite_email}
          placeholder="Your adventure buddy's email"
          onChange={this.handleInput}></input>

        <button
          onClick={() => {
            this.handleInviteEmail()
          }}>Send</button>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  const { user_id, username } = reduxState.account
  return { user_id, username }
}

export default connect(mapStateToProps)(Invite)