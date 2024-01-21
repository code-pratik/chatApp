import express from "express"
import { addMessagesGroup, createGrouporUpdate, createOrUpdateChat } from "../controllers/chatController.js"


const chatRoute = express()

chatRoute.patch("/createChat/:chatId",createOrUpdateChat)
chatRoute.post("/group",createGrouporUpdate)
chatRoute.patch("/addMessagesGroup/:id",addMessagesGroup)


export const chatRoutes =  chatRoute