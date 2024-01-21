import express from "express";
import {
  getUsers,
  searchUsers,
  updateProfile,
} from "../controllers/userController.js";
import {
  createUserProfile,
  upload,
} from "../controllers/profileController..js";
import { auth } from "../middleware/jwtMiddleware.js";

const userRoute = express();

userRoute
  .get("/users", auth, getUsers)
  .get("/searchUser", auth, searchUsers)
  .patch("/updateProfile/:id", auth, upload.single("file"), createUserProfile);

export const userRoutes = userRoute;
