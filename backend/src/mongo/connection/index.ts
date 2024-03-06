import mongoose from 'mongoose';

let dbUrl = process.env.MONGO_URL;

let mongodb;

export const connectDB = async () => {
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(dbUrl);

    const mongo = mongoose.connection;
    mongo.on('error', (error) => console.error(error));
  } catch (e) {
    console.log(e);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongodb) {
      await mongodb.stop();
    }
  } catch (err) {
    console.log(err);
  }
};
