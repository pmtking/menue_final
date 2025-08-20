import mongoose from "mongoose";
import dotenv from "dotenv";
import { dotenvConfig } from "./config/dotenv";
dotenvConfig();
export const mongoConnected = () => {
// mongodb://mongo:27017/menue
  mongoose
    .connect('mongodb://app-mongo-1:27017/')
    .then(() => {
      console.log("✅ mongoo is connected ");
    })
    .catch((err) => {
      if (err) {
        console.log(`error ${err}`);
      }
    });
};
