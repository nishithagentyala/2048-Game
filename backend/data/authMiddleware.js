import jwt from 'jsonwebtoken'
import User from '../user/UserModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_TOKEN)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401).send('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401).send('Not authorized, no token')
  }
})

export { protect }
