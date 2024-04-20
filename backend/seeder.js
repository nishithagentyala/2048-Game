import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import User from './user/UserModel.js'
import users from './data/users.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()
const importData = async () => {
  try {
    const createdUser = await User.insertMany(users)
    console.log(createdUser + 'createuser')
    console.log('data imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.log('data error', error)
    process.exit(1)
  }
}
const destroyData = async () => {
  try {
    await User.deleteMany()

    console.log('data destroyed'.red.inverse)
    process.exit()
  } catch (error) {
    console.log('error', error.red.inverse)
    process.exit(1)
  }
}
if (process.argv[2] === '-d') destroyData()
else importData()
