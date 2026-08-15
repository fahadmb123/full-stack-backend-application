import { MySQLDatabase } from "./config/mysql"
import { AdminController } from "./controllers/adminController"
import { UserController } from "./controllers/userController"
import { UserMongoRepository } from "./repositories/UserMongoRepository"
import { UserSqlRepository } from "./repositories/UserSqlRepository"
import { AdminService } from "./services/adminService"
import { UserService } from "./services/userService"


const mysql = new MySQLDatabase()

const sqlRepository = new UserSqlRepository(mysql)
const mongoRepository = new UserMongoRepository()

const userService = new UserService(mongoRepository,sqlRepository)
const adminService = new AdminService(mongoRepository,sqlRepository)


export const userController = new UserController(userService)
export const adminController = new AdminController(adminService)