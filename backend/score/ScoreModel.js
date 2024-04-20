import mongoose from 'mongoose'

const scoreSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    s: { type: Number },
    best: { type: Number },
    createdAt: { type: Date },
  },
  { timeStamps: true }
)
const Score = new mongoose.model('Scores', scoreSchema)
export default Score
