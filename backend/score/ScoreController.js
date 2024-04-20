import Score from './ScoreModel.js'
import asyncHandler from 'express-async-handler'

//post /api/game
const addScore = asyncHandler(async (req, res) => {
  const { s, best } = req.body
  const score = new Score({
    user: req.user._id,
    s,
    best,
    createdAt: Date.now(),
  })
  const createdScore = await score.save()
  res.status(201).json(createdScore)
})

//  get  /api/game/mygames

const getMyGames = asyncHandler(async (req, res) => {
  const scores = await Score.find({ user: req.user._id })

  res.json(scores)
})

//delete /api/game/mygames/id
const deleteGame = asyncHandler(async (req, res) => {
  const score = await Score.findById(req.params.id)

  if (score) {
    await score.deleteOne()
    res.json({ message: 'score removed' })
  } else {
    res.status(404).send('score not found')
  }
})

//delete /api/game/mygames
const deleteGames = asyncHandler(async (req, res) => {
  const score = await Score.find({ user: req.user._id })

  if (score) {
    await Score.deleteMany()
    res.json({ message: 'score removed' })
  } else {
    res.status(404).send('score not found')
  }
})

export { addScore, deleteGame, deleteGames, getMyGames }
