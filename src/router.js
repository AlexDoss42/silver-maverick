import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Components/home/Home'
import Login from './Components/account/Login'
import SignUp from './Components/account/SignUp'
import Profile from './Components/profile/Profile'
import Trip from './Components/trip/Trip'
import Invite from './Components/trip/Invite'
import CreatePin from './Components/tiles/CreatePin'
import PlanATrip from './Components/trip/PlanATrip';

export default (
  <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />   
      <Route path='/signup' component={SignUp} />
      <Route path='/profile' component={Profile} />
      <Route path='/pin/create' component = {CreatePin} />
      <Route path='/trip/plan' component = {PlanATrip} />
      <Route path='/trip/:user_id/:trip_id' component = {Trip} />
      <Route path='/trip/invite' component = {Invite} />
  </Switch>
)