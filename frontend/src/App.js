import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import Header from './components/Header'
import StartGame from './screens/StartGame'
import GameScreen from './screens/GameScreen'
import ProfileScreen from './screens/ProfileScreen'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<StartGame />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/game' element={<GameScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
