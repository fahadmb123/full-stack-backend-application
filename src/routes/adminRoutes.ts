import express from "express"
import { adminController } from "../container"
import { authMiddleware } from "../middleware/authMiddleware"
const router = express.Router()


router.get("/users",authMiddleware,adminController.getAllUsers)


export default router