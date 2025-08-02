"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = __importDefault(require("./ProductController"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const productRouter = express_1.default.Router();
productRouter.post('/add', upload_1.default.single("image"), ProductController_1.default);
exports.default = productRouter;
