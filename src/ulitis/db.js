import mongoose from 'mongoose';

const connect = async () => {
  try {
     await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Connection failed:', error);
  }
};

export default connect;
// mongodb://localhost:27017/next