import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Components/Home'
import Login from './Components/account/Login'



export default (
  <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />    
  </Switch>
)