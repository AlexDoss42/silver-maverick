import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoginForm from './LoginForm'

class Login extends Component {
    componentDidMount() {
        if (this.props.email) {
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <div>
                <LoginForm />
               {this.props.children}
                
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { email } = reduxState
  return { email }
}

export default connect(mapStateToProps)(withRouter(Login))