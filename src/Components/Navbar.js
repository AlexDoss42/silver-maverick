import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = ({username}) => (
 
    <nav>
        <span>TripDaddy</span>
        <ul>
{/* Render the login/register upon landing on the site */}

            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>

{/* Render these once you have logged in */}

            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/profile'>Profile</Link>
            </li>
            <li>
                <Link to='/logout'>Logout</Link>
            </li>
        </ul>
    
    {username && <div>Welcome, {username}</div>}
    </nav>
)

const mapStateToProps = (reduxState) => {
    const { username } = reduxState.account
    console.log(username)
    console.log(reduxState.account)
    return { username }
}

// export default Navbar

export default connect(mapStateToProps)(Navbar)