import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';

import { updateUserId, updateUsername } from '../redux/reducers/accountReducer'


class Navbar extends Component {

    componentDidMount() {
        axios.get('/auth/session')
            .then(res => {
                this.props.updateUsername(res.data.username)
            })
    }

    handleLogoutSubmit = (e) => {
        e.preventDefault()
        axios.get('/auth/logout')
            .then(res => {
                console.log('YOU HAVE LOGGED OUT... Dueces')
                this.props.updateUsername(res.data.username)
                this.props.updateUserId(res.data.user_id)
            })


    }

    render() {
        const { username } = this.props
        return (
            <nav>
                <span>TripDaddy</span>
                {/* Render the login/register upon landing on the site */}

                {!username && 
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

                {username && 
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
    const { username } = reduxState.account
    console.log(username)
    console.log(reduxState.account)
    return { username }
}

const mapDispatchToProps = {
    updateUserId,
    updateUsername
}

// export default Navbar

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)