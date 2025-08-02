"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("./config/dotenv");
const router_1 = require("./router");
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
const cors = require("cors");
exports.app.use(cors({ origin: "http://localhost:3000", credentials: true }));
exports.app.use(express_1.default.json());
exports.app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "public/uploads")));
(0, dotenv_1.dotenvConfig)();
exports.app.use("/api", router_1.router);
const startServer = async () => {
    try {
        (0, db_1.mongoConnected)();
        exports.app.listen(process.env.PORT);
        console.log("🚀 server is runnig");
    }
    catch (error) {
        console.log("err");
    }
};
exports.startServer = startServer;
