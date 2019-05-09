import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';

import { updateUserId, updateEmail } from '../redux/reducers/accountReducer'


class Navbar extends Component {

    componentDidMount() {
        axios.get('/auth/session')
            .then(res => {
                this.props.updateEmail(res.data.email)
            })
    }

    handleLogoutSubmit = (e) => {
        e.preventDefault()
        axios.get('/auth/logout')
            .then(res => {
                this.props.updateEmail(res.data.email)
                this.props.updateUserId(res.data.user_id)
                this.props.history.push('/')
            })


    }

    render() {
        const { email, username } = this.props
        return (
            <nav>
                <span>TripDaddy</span>

                {/* Render the login/register upon landing on the site */}

                {!email && 
                <div>
                    <ul>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </ul>
                </div>}


                {/* Render these once you have logged in */}

                {email && 
                <div>
                    <h3>
                        Welcome, {username}
                    </h3>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <button
                                onClick={this.handleLogoutSubmit}
                            >Logout</button>
                        </li>
                    </ul>
                </div>
                }
            </nav>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { email, username } = reduxState.account
    console.log("navbar username: ", username)
    console.log("navbar email: ", email)
    console.log("navbar redux State: ", reduxState.account)
    return { email, username }
}

const mapDispatchToProps = {
    updateUserId,
    updateEmail
}

// export default Navbar

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))