import express from "express"
import { userController } from "../container"
import { authMiddleware,guestMiddleware } from "../middleware/authMiddleware"
const router = express.Router()




router.post("/register",guestMiddleware,userController.register)
router.post("/login",guestMiddleware,userController.login)


router.get("/products",authMiddleware,userController.products)


export default router