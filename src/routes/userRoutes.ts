import express from "express"
import { userController } from "../container"
const router = express.Router()




router.post("/register",userController.register)
router.post("/login",userController.login)


router.get("/products",userController.products)


export default router