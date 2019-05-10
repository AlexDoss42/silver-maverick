import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Components/home/Home'
import Login from './Components/account/Login'
import SignUp from './Components/account/SignUp'
import CreatePin from './Components/tiles/CreatePin'



export default (
  <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />   
      <Route path='/signup' component={SignUp} />
      {/* <Route path='/profile' component={Profile} /> */}
      <Route path='/pin/create' component = {CreatePin} />
  </Switch>
)