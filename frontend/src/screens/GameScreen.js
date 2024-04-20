import React, { useEffect, useState } from 'react'
import Screen from './Screen'
import { Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
//import { useNavigate } from 'react-router-dom'
import { addScores, listMyGames } from '../actions/scoreActions'

const GameScreen = () => {
  const dispatch = useDispatch()
  const [best, setBest] = useState(0)
  const scoreList = useSelector((state) => state.scoreList)
  const { scores } = scoreList

  const divArray = document.querySelectorAll('.box')

  let gameArray = []

  let s = 0

  const initGame = () => {
    for (let i = 0; i < 16; i++) gameArray.push(0)
  }

  const generateRandom = () => {
    try {
      const randomNumber = Math.floor(Math.random() * divArray.length)
      if (gameArray[randomNumber] === 0) {
        gameArray[randomNumber] = 2
        updateUI()
      } else generateRandom()
    } catch (error) {
      //document.getElementById('status').innerHTML = ''
    }
  }

  const handleRow = (type, isFirst = true) => {
    for (let i = 0; i < 16; i += 4) {
      let one = gameArray[i]
      let two = gameArray[i + 1]
      let three = gameArray[i + 2]
      let four = gameArray[i + 3]
      const row = [one, two, three, four]
      let filteredRow = row.filter((num) => num)
      let missing = Array(4 - filteredRow.length).fill(0)

      let newRow = []

      switch (type) {
        case 'Right':
          newRow = missing.concat(filteredRow)
          break
        case 'Left':
          newRow = filteredRow.concat(missing)
          break

        default:
          break
      }

      gameArray[i] = newRow[0]
      gameArray[i + 1] = newRow[1]
      gameArray[i + 2] = newRow[2]
      gameArray[i + 3] = newRow[3]

      if (isFirst) combineNumbers([i, i + 1, i + 2, i + 3], type)
    }
  }

  const handleColumn = (type, isFirst) => {
    for (let i = 0; i < 4; i++) {
      let one = gameArray[i]
      let two = gameArray[i + 4 * 1]
      let three = gameArray[i + 4 * 2]
      let four = gameArray[i + 4 * 3]
      const column = [one, two, three, four]
      let filteredRow = column.filter((num) => num)
      let missing = Array(4 - filteredRow.length).fill(0)

      let newRow = []

      switch (type) {
        case 'Down':
          newRow = missing.concat(filteredRow)
          break
        case 'Up':
          newRow = filteredRow.concat(missing)
          break

        default:
          break
      }

      gameArray[i] = newRow[0]
      gameArray[i + 4 * 1] = newRow[1]
      gameArray[i + 4 * 2] = newRow[2]
      gameArray[i + 4 * 3] = newRow[3]

      if (isFirst) combineNumbers([i, i + 4 * 1, i + 4 * 2, i + 4 * 3], type)
    }
  }

  function combineNumbers(arr, type) {
    let x, y
    switch (type) {
      case 'Right':
      case 'Down':
        x = 0
        y = 1

        for (let i = 3; i >= 0; i--) {
          if (
            gameArray[arr[i + x]] === gameArray[arr[i + y]] &&
            gameArray[arr[i + x]] !== 0
          ) {
            gameArray[arr[i + y]] =
              gameArray[arr[i + x]] + gameArray[arr[i + y]]

            s = s + 2
            updateUI(s)

            gameArray[arr[i + x]] = 0
            if (type === 'Right') handleRow(type, false)
            else handleColumn(type, false)
          }
        }
        break

      case 'Left':
      case 'Up':
        x = 1
        y = 0
        for (let i = 0; i < 3; i++) {
          if (
            gameArray[arr[i + x]] === gameArray[arr[i + y]] &&
            gameArray[arr[i + x]] !== 0
          ) {
            gameArray[arr[i + y]] =
              gameArray[arr[i + x]] + gameArray[arr[i + y]]

            s = s + 2

            updateUI(s)
            gameArray[arr[i + x]] = 0

            if (type === 'Left') handleRow(type, false)
            else handleColumn(type, false)
          }
        }
        break

      default:
        break
    }
  }

  const updateUI = (s) => {
    for (let i = 0; i < 16; i++) {
      const element = document.getElementById(i)
      if (gameArray[i]) {
        element.innerHTML = gameArray[i]
        element.style.backgroundColor = pickColor(gameArray[i])
      } else {
        element.style.removeProperty('background-color')
        element.innerHTML = ''
      }
      if (gameArray.includes(2048)) {
        document.getElementById('status').innerHTML = 'You Win'
        document.getElementById('status').classList.add('win')
        newGame()
        document.removeEventListener('keyup', handleKeyBoradEvent)
      }
    }

    if (s) {
      document.getElementById('score').innerHTML = s
      //document.getElementById('best').innerHTML = s
    }
  }

  const pickColor = (num) => {
    switch (num) {
      case 2:
        return 'white'
      case 4:
        return 'coral'
      case 8:
        return 'cyan'
      case 16:
        return 'royalblue'
      case 32:
        return 'slateblue'
      case 64:
        return 'chocolate'
      case 128:
        return 'maroon'
      case 256:
        return 'mediumseagreen'
      case 512:
        return 'springgreen'
      case 1024:
        return 'darkorange'
      case 2048:
        return 'hotpink'
      default:
        break
    }
  }

  const handleKeyBoradEvent = (event) => {
    switch (event.key) {
      case 'ArrowRight':
        handleRow('Right', true)
        generateRandom()
        break
      case 'ArrowLeft':
        handleRow('Left', true)
        generateRandom()
        break
      case 'ArrowDown':
        handleColumn('Down', true)
        generateRandom()
        break
      case 'ArrowUp':
        handleColumn('Up', true)
        generateRandom()
        break
      default:
        break
    }
  }

  document.addEventListener('keyup', handleKeyBoradEvent)

  //for touch

  var gesture = {
      x: [],
      y: [],
      match: '',
    },
    tolerance = 100

  var surface = document.getElementById('board')

  if (surface) {
    surface.addEventListener('touchstart', function (e) {
      e.preventDefault()
      for (var i = 0; i < e.touches.length; i++) {
        gesture.x.push(e.touches[i].clientX)
        gesture.y.push(e.touches[i].clientY)
      }
    })
  }
  if (surface) {
    surface.addEventListener('touchmove', function (e) {
      e.preventDefault()
      for (var i = 0; i < e.touches.length; i++) {
        gesture.x.push(e.touches[i].clientX)
        gesture.y.push(e.touches[i].clientY)
      }
    })
  }
  if (surface) {
    surface.addEventListener('touchend', function (e) {
      var xTravel = gesture.x[gesture.x.length - 1] - gesture.x[0],
        yTravel = gesture.y[gesture.y.length - 1] - gesture.y[0]

      if (xTravel < tolerance && xTravel > -tolerance && yTravel < -tolerance) {
        handleColumn('Up', true)
        generateRandom()
      }
      if (xTravel < tolerance && xTravel > -tolerance && yTravel > tolerance) {
        handleColumn('Down', true)
        generateRandom()
      }
      if (yTravel < tolerance && yTravel > -tolerance && xTravel < -tolerance) {
        handleRow('Left', true)
        generateRandom()
      }
      if (yTravel < tolerance && yTravel > -tolerance && xTravel > tolerance) {
        handleRow('Right', true)
        generateRandom()
      }

      gesture.x = []
      gesture.y = []
      gesture.match = xTravel = yTravel = ''
    })
  }

  initGame()
  generateRandom()
  generateRandom()

  useEffect(() => {
    dispatch(listMyGames())
  }, [dispatch])

  function newGame() {
    document.getElementById('score').innerHTML = 0
    if (best === 0) {
      setBest(s)
      console.log('best' + s)
      document.getElementById('best').innerHTML = s
    } else {
      if (s >= best) {
        setBest(s)
        document.getElementById('best').innerHTML = best
      } else document.getElementById('best').innerHTML = best

      dispatch(addScores(s, best))
    }

    s = 0
    gameArray = []
    for (let i = 0; i < 16; i++) {
      const element = document.getElementById(i)
      element.style.removeProperty('background-color')
      element.innerHTML = ''
    }
    document.getElementById('status').classList.remove('win')
    document.getElementById('status').innerHTML = ' '
    document.addEventListener('keyup', handleKeyBoradEvent)

    initGame()
    generateRandom()
    generateRandom()
  }

  return (
    <Container fluid>
      <Row className='text-center'>
        <Col className='bg-primary text-white mt-2 mx-5 mb-2 p-2'>
          SCORE
          <p id='score'>0</p>
        </Col>
        <Col className='bg-primary text-white mt-2 mx-5 mb-2 p-2'>
          BEST
          <p id='best'>0</p>
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <button
            type='submit'
            className='btn btn-dark'
            onClick={() => {
              newGame()
            }}
          >
            New Game
          </button>
        </Col>
      </Row>
      <Row>
        <Col id='status'></Col>
      </Row>
      <Screen />
    </Container>
  )
}

export default GameScreen
