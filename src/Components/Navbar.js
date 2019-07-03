import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';

import { updateUserId, updateEmail } from '../redux/reducers/accountReducer'


class Navbar extends Component {

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
                <span className='logo'>TripDaddy</span>

                {/* Render the login/register upon landing on the site */}

                {!email &&
                    <div className='notLoggedIn'>
                        <ul>
                            <li>
                                <Link to='/login'><button>Login</button></Link>
                            </li>
                            <li>
                                <Link to='/signup'><button>Sign up</button></Link>
                            </li>
                        </ul>
                    </div>}

                {/* Render these once you have logged in */}

                {email &&

                    <div className='loggedIn'>
                        <h3>
                            Welcome, {username}
                        </h3>
                        <div>
                            {/* <img
                    src={``}
                    alt='profile pic'
                    style={{height: '150px'}}/> */}
                            <ul>
                                <li>
                                    <Link to='/'><button>Home</button></Link>
                                </li>
                                <li>
                                    <Link to='/profile'><button>Profile</button></Link>
                                </li>
                                <li>

                                    <button
                                        onClick={this.handleLogoutSubmit}
                                    >Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            </nav>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { email, username, profilePic } = reduxState.account
    return { email, username, profilePic }
}

const mapDispatchToProps = {
    updateUserId,
    updateEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))