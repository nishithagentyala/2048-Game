import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {});

    console.log(`mongo database is connected!!! `);
  } catch (error) {
    console.error(`Error in mongoose database connection: ${error} `);
    process.exit(1);
  }
};

export default connectDB;
