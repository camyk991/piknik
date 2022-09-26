import mongoose from 'mongoose';

const connectDB = async () => {
  try {
      const conn = await mongoose.connect(process.env.MONGODB_CONNECT, {dbName: 'App'});
    
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit();
  }
};

export default connectDB;