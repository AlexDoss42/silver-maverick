import React from 'react';
import './App.css';
// import {Provider} from 'react-redux'
// import store from './redux/store'
import {HashRouter} from 'react-router-dom'
import router from './router'


import Navbar from './Components/Navbar'
import Chat from './Components/trip/Chat'

function App() {
 return (
    // <Provider store={store}>
      <HashRouter>
       <Navbar />
        {router}
        <Chat />
      </HashRouter>
    // </Provider>
 );
}

export default App;