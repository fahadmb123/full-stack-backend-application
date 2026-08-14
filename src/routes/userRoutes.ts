import express from "express"
import { userController } from "../container"
import { authMiddleware } from "../middleware/authMiddleware"
const router = express.Router()




router.post("/register",userController.register)
router.post("/login",userController.login)


router.get("/products",authMiddleware,userController.products)


export default router