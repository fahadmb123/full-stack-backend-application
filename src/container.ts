import { MySQLDatabase } from "./config/mysql"
import { UserController } from "./controllers/userController"
import { UserMongoRepository } from "./repositories/UserMongoRepository"
import { UserSqlRepository } from "./repositories/UserSqlRepository"
import { UserService } from "./services/userService"


const mysql = new MySQLDatabase()
const sqlRepository = new UserSqlRepository(mysql)
const mongoRepository = new UserMongoRepository()
const userService = new UserService(mongoRepository,sqlRepository)
export const userController = new UserController(userService)