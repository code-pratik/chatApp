import express  from "express"
import {login, signUp} from "../controllers/authController.js";
import { createOrUpdateChat } from "../controllers/chatController.js";
// import {  createMessages } from "../controllers/chatController.js";


const authRoute = express.Router()

authRoute.post('/signUp',signUp)
         .post('/login',login)
         

export const authRoutes = authRoute