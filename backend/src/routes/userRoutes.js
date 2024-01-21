import express from "express"
import { getUsers, searchUsers, updateProfile } from "../controllers/userController.js"
import { createUserProfile, upload } from "../controllers/profileController..js"

const userRoute = express()

userRoute.get("/users",getUsers)
         .get("/searchUser",searchUsers)
         .patch("/updateProfile/:id",upload.single("file"),createUserProfile)


export const userRoutes =  userRoute