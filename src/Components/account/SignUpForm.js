import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateUserDetails } from '../../redux/reducers/accountReducer'
import axios from 'axios'

class SignUpForm extends Component {
  constructor() {
    super()
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      phone: '',
      venmo: '',
      profilePic: '',
      signupError: false,
      signupErrorMessage: 'That email has been taken'
    }
  }

  handleFormInputUpdate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      signupError: false
    })
  }

  handleSignUpFormSubmit = async (e) => {
    e.preventDefault()

    const { firstname, lastname, email, username, password, phone, venmo, profilePic } = this.state

    if (firstname === '') {
      alert('First Name is required')
    } else if (lastname === '') {
      alert('Last Name is required')
    } else if (email === '') {
      alert('Email is required')
    } else if (username === '') {
      alert('Username is required')
    } else if (password === '') {
      alert('Password is required')
    } else if (phone === '') {
      alert('Phone is required')
    } else {

      try {
        const res = await axios.post('/auth/register', { firstname, lastname, email, username, password, phone, venmo, profilePic })

        const { user_id } = res.data[0]

        this.props.updateUserDetails({ user_id, firstname, lastname, email, username, password, phone, venmo, profilePic })
        this.props.history.push('/')

      } catch (err) {
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          username: '',
          password: '',
          phone: '',
          venmo: '',
          profilePic: '',
          signupError: true
        })
      }
    }
  }

  render() {
    return (
      <div 
      className='signUpForm'>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSignUpFormSubmit}>
          <input
            type='text'
            name='firstname'
            placeholder='First Name'
            value={this.state.firstname}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='lastname'
            placeholder='Last Name'
            value={this.state.lastname}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={this.state.username}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='phone'
            placeholder='Phone Number'
            value={this.state.phone}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='venmo'
            placeholder='Venmo Handle'
            value={this.state.venmo}
            onChange={this.handleFormInputUpdate}
          />
          <input
            type='text'
            name='profilePic'
            placeholder='Profile Pic URL'
            value={this.state.profilePic}
            onChange={this.handleFormInputUpdate}
          />
          <button>Sign Up</button>

        </form>
        {this.state.signupError && <h3>{this.state.signupErrorMessage}</h3>}
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateUserDetails
}

export default connect(null, mapDispatchToProps)(withRouter(SignUpForm))