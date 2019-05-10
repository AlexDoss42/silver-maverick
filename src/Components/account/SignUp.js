import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SignUpForm from './SignUpForm'

class Login extends Component {
    componentDidMount() {
        if (this.props.email) {
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <div>
                <SignUpForm />
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