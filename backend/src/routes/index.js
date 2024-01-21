import express from "express"

import { userRoutes } from "./userRoutes.js"
import {authRoutes} from "./authRoutes.js"
import { chatRoutes } from "./chatRoutes.js"

const router = express.Router()

router.use("/auth",authRoutes)
router.use("/data",userRoutes)
router.use("/chat",chatRoutes)

export const routes = router

  
