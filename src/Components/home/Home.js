import React, { Component } from 'react'
import PublicPins from './PublicPins'
// import TopTrips from './TopTripsBoard'
import { connect } from 'react-redux'
import axios from 'axios'

import { updateUserDetails } from '../../redux/reducers/accountReducer'

class Home extends Component {
  componentDidMount(){
    axios.get('/auth/details')
    .then(res => {
      this.props.updateUserDetails(res.data)      
    })
    .catch(()=> console.log('error in home componentDidMount'))
  }
  render() {
    return (
      <div>
        <h1>Home</h1>

        {/* <TopTrips /> */}
        <PublicPins />
      </div>
    )
  }

}

const MapDispatchToProps = {
  updateUserDetails
}

export default connect(null, MapDispatchToProps)(Home)