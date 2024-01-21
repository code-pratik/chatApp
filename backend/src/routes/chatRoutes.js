import express from "express";
import {
  addMessagesGroup,
  createGrouporUpdate,
  createOrUpdateChat,
} from "../controllers/chatController.js";
import { auth } from "../middleware/jwtMiddleware.js";

const chatRoute = express.Router();

chatRoute.patch("/createChat/:chatId", auth, createOrUpdateChat);
chatRoute.post("/group", auth, createGrouporUpdate);
chatRoute.patch("/addMessagesGroup/:id", auth, addMessagesGroup);

export const chatRoutes = chatRoute;
