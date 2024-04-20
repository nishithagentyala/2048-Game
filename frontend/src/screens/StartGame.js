import React from 'react'
import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
const StartGame = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const history = useNavigate()
  const StartGame = () => {
    if (userInfo) history('/game')
    else history('/login')
  }
  return (
    <div className='text-center m-5'>
      <button type='button' onClick={StartGame} className='btn btn-primary '>
        StartGame
      </button>
    </div>
  )
}
export default StartGame
