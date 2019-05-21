import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

// import TopTrips from './TopTripsBoard'
import PublicPins from './PublicPins'
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