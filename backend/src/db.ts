import mongoose from "mongoose";
import dotenv from "dotenv";
import { dotenvConfig } from "./config/dotenv";
dotenvConfig();
export const mongoConnected = () => {
// mongodb://mongo:27017/menue
  mongoose
    .connect(process.env.MONGO_URI! || 'mongodb://127.0.0.1:27017/menue')
    .then(() => {
      console.log("✅ mongoo is connected ");
    })
    .catch((err) => {
      if (err) {
        console.log(`error ${err}`);
      }
    });
};
