import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // Load environment variables from .env file

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URL; // Access the MongoDB URI from environment variables

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err; // Re-throw the error to be handled elsewhere if needed
  }
};

export default connectToDatabase;
