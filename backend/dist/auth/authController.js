"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = RegisterController;
exports.LoginController = LoginController;
const user_1 = __importDefault(require("../models/user"));
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function RegisterController(req, res) {
    const body = req.body;
    const { number, role, password } = body;
    try {
        if (!number || !role) {
            return res.status(400).json({ error: "شماره و نقش الزامی هستند." });
        }
        // کاربر با نقش USER
        if (role === "USER") {
            const user = new user_1.default({ number, role });
            await user.save();
            return res.status(200).json({ data: user });
        }
        // کاربر با نقش ADMIN
        if (role === "ADMIN") {
            if (!password || typeof password !== "string" || password.trim() === "") {
                return res.status(400).json({ error: "رمز عبور الزامی است." });
            }
            const hashpass = await (0, hash_1.hashPassword)(password);
            const user = new user_1.default({ number, role, password: hashpass });
            await user.save();
            const token = (0, jwt_1.signJWT)({ id: user._id, role: user.role });
            return res.status(200).json({
                message: "ثبت ‌نام با موفقیت انجام شد.",
                data: {
                    user,
                    token: token,
                },
            });
        }
        // نقش نامعتبر
        return res.status(400).json({ error: "نقش نامعتبر است." });
    }
    catch (error) {
        if (error.code === 11000 && error.keyPattern?.number) {
            return res.status(409).json({ error: "این شماره قبلاً ثبت شده است." });
        }
        console.error("Register error:", error);
        return res.status(500).json({ error: "خطای داخلی سرور" });
    }
}
async function LoginController(req, res) {
    const body = req.body;
    const { number, password, role } = body;
    if (role === "ADMIN") {
        const user = await user_1.default.findOne({ number });
        if (!user) {
            return res.status(401).json({
                message: "شما ثبت نام نکرده اید",
                location: "/adminregister",
            });
        }
        if (user?.role !== "ADMIN") {
            return res.status(403).json({
                message: "شما ادمین نیستید",
                location: "/",
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "رمز عبور اشتباه است",
            });
        }
        const token = (0, jwt_1.signJWT)({ id: user._id, role: user.role });
        return res.status(200).json({
            message: "ورود با موفقیت انجام شد",
            token,
            user: { user },
        });
    }
    if (role === "USER") {
        const user = await user_1.default.findOne({ number });
        if (!user) {
            return res.status(401).json({
                message: "شما ثبت نام نکرده اید",
            });
        }
        const isPassword = await bcrypt_1.default.compare(password, user?.password);
        if (!isPassword) {
            return res.status(401).json({
                message: "رمز عبور  اشتباه است ",
            });
        }
        const token = (0, jwt_1.signJWT)({ id: user._id, role: user.role });
        return res.status(200).json({
            message: "ورود با موفقیت انجام شد",
            token,
            user: { user },
        });
    }
}
