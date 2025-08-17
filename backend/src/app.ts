import express from "express";
import { mongoConnected } from "./db";
import cors from 'cors';
import { dotenvConfig } from "./config/dotenv";
import { router } from "./router";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
export const app = express();
// const allowedOrigins = ['http://localhost:3000', 'http://171.22.26.36:8080/'];

app.use(cors())


app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/public/uploads/")));
dotenvConfig();
app.use("/api", router);
app.get('/t' , (req , res) => {
  return res.send("welcom to backend")
})

export const startServer = async () => {
  try {
    mongoConnected();
    app.listen(process.env.PORT || 8080);
    console.log("🚀 server is runnig" , process.env.PORT);
  } catch (error) {
    console.log("err");
  }
};
