import express from "express";
import { login, signUp } from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/signUp", signUp).post("/login", login);

export const authRoutes = authRoute;
