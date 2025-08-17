import express from "express";

import upload from "../middlewares/upload";
import AddProductController, {
  DeleteProductsController,
  GetProducController,
  ShowProductsController,
  UpdateProductsController,
} from "./ProductController";

const productRouter = express.Router();

productRouter.post("/add", upload.single("image"), AddProductController);
productRouter.get("/show", ShowProductsController);
productRouter.delete("/delete/:id", DeleteProductsController);
productRouter.put("/update/:id", upload.single("image"), UpdateProductsController);
productRouter.get('/get/:id' , GetProducController )

export default productRouter;
