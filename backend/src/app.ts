import express from "express";
import { mongoConnected } from "./db";
import corse from "cors";
import { dotenvConfig } from "./config/dotenv";
import { router } from "./router";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
export const app = express();
app.use(corse());
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
dotenvConfig();
app.use("/api", router);

export const startServer = async () => {
  try {
    mongoConnected();
    app.listen(process.env.PORT);
    console.log("🚀 server is runnig");
  } catch (error) {
    console.log("err");
  }
};
