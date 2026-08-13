import express from "express"
import { userController } from "../container"
const router = express.Router()




router.post("/register",userController.register)


export default router