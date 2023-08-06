import React from 'react'
import {Route , Routes, BrowserRouter} from 'react-router-dom'
import './App.css';
import Home from './Routes/home';
import Chats from './Routes/chats';
import { SocketProvider } from './Routes/socketcontext';
function App(){

  return (
    <div className="App">
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<Home/>} />
            <Route path = "/abouts" element = {<h2>This is About Page</h2>} />
            <Route path = "/chats" element = {<Chats/>} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}

export default App;
