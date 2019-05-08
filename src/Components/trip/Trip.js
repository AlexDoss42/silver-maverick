import React from 'react'
import Calendar from './Calendar'
import Weather from './Weather'
import Group from './Group'
import TodoList from './TodoList'
import Gear from './Gear'
import TripBoard from './TripBoard'
import Chat from './Chat'

const Trip = () => (
  <div>
    <h1>MY TRIP</h1>
    <Calendar />
    <Weather />
    <Group />
    <TodoList />
    <Gear />
    <TripBoard />
    <Chat />
  </div>
)

export default Trip