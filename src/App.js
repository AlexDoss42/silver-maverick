import React from 'react';
import './App.scss';
import { Provider } from 'react-redux'
import store from './redux/store'
import { HashRouter } from 'react-router-dom'
import router from './router'


import Navbar from './Components/Navbar'


function App() {
 return (
    <Provider store={store}>
      <HashRouter>
       <Navbar />
        {router}
      </HashRouter>
    </Provider>
 );
}

export default App;