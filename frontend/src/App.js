import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './home'
import Signup from './Signup'
import Login from './login'
import Main from './Main'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/home' element={<Main/>}></Route>
        </Routes>
    </div>
  )
}

export default App