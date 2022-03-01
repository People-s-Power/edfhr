/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { connect, ConnectOptions, disconnect } from "mongoose";
import config from "./config";

const options: ConnectOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
let cachedDB: typeof import("mongoose") | null = null;
export const connectDB = async () => {
  if (cachedDB) return cachedDB;
  try {
    const db = await connect(config.MONGO_URI, options);
    cachedDB = db;
    console.log(`db connected: ${db.connection.host}`);
    return db;
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

export const disconnectdb = async () => {
  await disconnect().then(() => console.log(`db disconnected`));
};
