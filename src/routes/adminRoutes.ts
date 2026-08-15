import express from "express"
import { adminController } from "../container"
import { authMiddleware } from "../middleware/authMiddleware"
import { roleMiddleware } from "../middleware/roleMiddleware"
import validate from "../middleware/validate"
import { adminCreateUserSchema } from "../schemas/auth.schema"

const router = express.Router()


router.get("/users",authMiddleware,roleMiddleware(["admin"]),adminController.getAllUsers)
router.post("/users",authMiddleware,roleMiddleware(["admin"]),validate(adminCreateUserSchema),adminController.createUser)
router.get("/users/:id",authMiddleware,roleMiddleware(["admin"]),adminController.getUser)
router.patch("/users/:id",authMiddleware,roleMiddleware(["admin"]),adminController.updateUser)




export default router