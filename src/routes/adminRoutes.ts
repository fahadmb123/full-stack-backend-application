import express from "express"
import { adminController } from "../container"
const router = express.Router()


router.get("/users",adminController.getAllUsers)


export default router