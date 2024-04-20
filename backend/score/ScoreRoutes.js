import express from 'express'
const router = express.Router()

import {
  addScore,
  deleteGame,
  deleteGames,
  getMyGames,
} from './ScoreController.js'
import { protect } from '../data/authMiddleware.js'

router.route('/').post(protect, addScore)
router.route('/mygames').get(protect, getMyGames).delete(protect, deleteGames)
router.route('/mygames/:id').delete(protect, deleteGame)
export default router
