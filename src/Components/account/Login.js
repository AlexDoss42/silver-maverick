import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoginForm from './LoginForm'

class Login extends Component {
    componentDidMount() {
        if (this.props.username) {
            this.props.history.push('/info')
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
    const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps)(withRouter(Login))