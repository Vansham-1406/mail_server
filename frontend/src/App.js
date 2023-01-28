import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './home'
import Signup from './Signup'
import Login from './login'
import Main from './Main'
import Saved from './saved'
import Deleted from './Deleted'
import Profile from './Profile'
import Sent from './Sent'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/home' element={<Main/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/saved' element={<Saved/>}></Route>
            <Route path='/deleted' element={<Deleted/>}></Route>
            <Route path="/sent" element={<Sent/>}></Route>
        </Routes>
    </div>
  )
}

export default App