import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (process.env.RAZZLE_MONGODB) {
      const conn = await mongoose.connect(process.env.RAZZLE_MONGODB, {dbName: 'object_office'});
    }
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit();
  }
};

export default connectDB;