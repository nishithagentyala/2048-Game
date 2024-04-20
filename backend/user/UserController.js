import User from './UserModel.js'
import generateToken from '../data/token.js'
import asyncHandler from 'express-async-handler'

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  console.log({ email } + 'email')
  const userexists = await User.find({ email })
  console.log(userexists + 'userexists')
  if (userexists) res.status(400).send('user already exists')

  const user = await User.create({ name, email, password })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(404).send('invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password)))
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  else {
    res.status(401).send('invalid email or password')
  }
})

//all users
const userDetails = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

//get profile /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

//put api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) user.password = req.body.password

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

export {
  registerUser,
  loginUser,
  userDetails,
  getUserProfile,
  updateUserProfile,
}
