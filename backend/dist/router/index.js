"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("../auth/auth.router");
const products_router_1 = __importDefault(require("../products/products.router"));
exports.router = express_1.default.Router();
// test router
exports.router.get("/test", (req, res) => {
    res.send("test");
});
exports.router.use("/auth", auth_router_1.authRouter);
exports.router.use("/product", products_router_1.default);
