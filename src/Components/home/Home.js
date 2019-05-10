import React, { Component } from 'react'
import PublicPins from './PublicPins'
import TopTrips from './TopTripsBoard'
import { connect } from 'react-redux'
import axios from 'axios'

import { updateUserDetails } from '../../redux/reducers/accountReducer'

class Home extends Component {
  componentDidMount(){
    axios.get('/auth/details')
    .then(res => {
      console.log('res.data from cdm in home: ',res.data)
      this.props.updateUserDetails(res.data)
      
    })
    .catch(()=> console.log('error in home componentdidmount'))
  }
  render() {
    return (
      <div>
        <h1>Home</h1>

        <TopTrips />
        <PublicPins />
      </div>
    )
  }

}

// const mapStateToProps = (reduxState) => {
//   const { user_id } = reduxState.account
//   return { user_id }
// }

const MapDispatchToProps = {
  updateUserDetails
}

export default connect(null, MapDispatchToProps)(Home)