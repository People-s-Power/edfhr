/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mongoose from "mongoose";
import config from "./config";

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
let cachedDB = null;
export const connectDB = async () => {
  if (cachedDB) return cachedDB;
  try {
    const db = await mongoose.connect(config.MONGO_URI, options);
    cachedDB = db;
    console.log(`db connected: ${db.connection.host}`);
    return db;
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

export const disconnectdb = async () => {
  await mongoose.disconnect().then(() => console.log(`db disconnected`));
};
