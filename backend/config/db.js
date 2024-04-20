import mongoose from 'mongoose'

const connectDB = () => {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/2048-Game', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`mongo database is connected!!! `)
  } catch (error) {
    console.error(`Error in mongoose database connection: ${error} `)
    process.exit(1)
  }
}

export default connectDB
