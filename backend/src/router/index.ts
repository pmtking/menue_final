import express from "express";
import { authRouter } from "../auth/auth.router";
import productRouter from "../products/products.router";
export const router = express.Router();
// import express from "express";
import escpos from "escpos";
import USB from "escpos-usb";
// test router
router.get("/test", (req, res) => {
  res.send("test");
});

router.use("/auth", authRouter);

router.use("/product", productRouter);
router.post("/print-receipt", async (req, res) => {
  try {
    const order = req.body; // باید شامل tableId و items باشه

    // اتصال به پرینتر USB
    const device = new USB();
    const printer = new escpos.Printer(new escpos.USB(device));

    // متن فیش
    let content = `===== فیش سفارش =====\nشماره میز: ${order.tableId}\n--------------------\n`;
    order.items.forEach((item: any) => {
      content += `${item.name} - ${
        item.count
      } × ${item.price.toLocaleString()} تومان\n`;
    });
    const total = order.items.reduce(
      (sum: number, i: any) => sum + i.price * i.count,
      0
    );
    content += `--------------------\nمجموع: ${total.toLocaleString()} تومان\n`;
    content += `زمان: ${new Date().toLocaleTimeString()}\n====================\n`;

    printer.text(content).cut().close();

    return res.json({ message: "رسید چاپ شد!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطا در چاپ رسید" });
  }
});
