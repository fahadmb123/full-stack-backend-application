import express from "express"
import { adminController } from "../container"
import { authMiddleware } from "../middleware/authMiddleware"
import { roleMiddleware } from "../middleware/roleMiddleware"
const router = express.Router()


router.get("/users",authMiddleware,roleMiddleware(["admin"]),adminController.getAllUsers)


export default router