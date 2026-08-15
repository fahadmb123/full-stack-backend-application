import express from "express"
import { userController } from "../container"
import { authMiddleware,guestMiddleware } from "../middleware/authMiddleware"
import { roleMiddleware } from "../middleware/roleMiddleware"
import { loginSchema,registerSchema } from "../schemas/auth.schema"
import validate from "../middleware/validate"
const router = express.Router()




router.post("/register",validate(registerSchema),guestMiddleware,userController.register)
router.post("/login",validate(loginSchema),guestMiddleware,userController.login)


router.get("/products",authMiddleware,roleMiddleware(["user"]),userController.products)


export default router