import React from 'react'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'

const Navbar = ({username}) => (
 
    <nav>
        <span>TripDaddy</span>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/createATrip'>Create A Trip</Link>
            </li>
            <li>
                <Link to='/myTrips'>My Trips</Link>
            </li>
        </ul>
    {username && <div>Welcome, {username}</div>}
    </nav>
)

// const mapStateToProps = (reduxState) => {
//     const { username } = reduxState
//     return { username }
// }

export default Navbar

// export default connect(mapStateToProps)(Navbar)