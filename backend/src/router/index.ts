import express from "express";
import { authRouter } from "../auth/auth.router";
import productRouter from "../products/products.router";
export const router = express.Router();
// test router
router.get("/test", (req, res) => {
  res.send("test");
});

router.use("/auth" , authRouter);

router.use("/product" , productRouter)
