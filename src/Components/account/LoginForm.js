import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateUserId, updateEmail } from '../../redux/reducers/accountReducer'
import axios from 'axios'

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            loginEmail: '',
            loginPassword: '',
            loginError: false,
            loginErrorMessage: 'Email or Password is incorrect. Please try again'
        }
    }

    handleFormInputUpdate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            loginError: false
        })
    }

    handleLoginFormSubmit = async (e) => {
        e.preventDefault()
        const { loginEmail, loginPassword } = this.state
        try {
            const res = await axios.post('/auth/login', { loginEmail, loginPassword })
            this.props.updateEmail(res.data.loginEmail)
            this.props.updateUserId(res.data.user_id)
            this.props.history.push('/')
        } catch (err) {
            this.setState({ loginEmail: '', loginPassword: '', loginError: true })
        }
    }

    render() {
        return (
            <>
                <h1>Login</h1>
                <form onSubmit= {this.handleLoginFormSubmit}>
                    <input
                        type='text'
                        name='loginEmail'
                        placeholder='Email'
                        value={this.state.loginEmail}
                        onChange={this.handleFormInputUpdate}
                    />
                    <input
                        type='text'
                        name='loginPassword'
                        placeholder='Password'
                        value={this.state.loginPassword}
                        onChange={this.handleFormInputUpdate}
                    />

                        <button>Login</button>

                </form>
        {this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}
            </>
        )
    }
}

const mapDispatchToProps = {
  updateUserId,
  updateEmail
}

export default connect(null, mapDispatchToProps)(withRouter(LoginForm))