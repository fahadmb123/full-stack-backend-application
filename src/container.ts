import { MySQLDatabase } from "./config/mysql"
import { UserController } from "./controllers/userController"
import { UserRepository } from "./repositories/UserRepository"
import { UserService } from "./services/userService"


const mysql = new MySQLDatabase()
const userRepository = new UserRepository(mysql)
const userService = new UserService(userRepository)
export const userController = new UserController(userService)