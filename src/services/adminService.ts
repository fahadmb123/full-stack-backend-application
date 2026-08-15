import { AppError } from "../errors/AppError";
import { IAdminService } from "../interfaces/Admin/IAdminService";
import { IUser, IUserPartialed } from "../interfaces/User/IUser";
import { IUserMongoRepository, IUserSqlRepository } from "../interfaces/User/IUserRepository";
import { IServiceReturn } from "../interfaces/User/IUserService";
import bcrypt from "bcrypt";
const salt = 10

export class AdminService implements IAdminService{
    constructor (private mongoRepository:IUserMongoRepository,private sqlRepository:IUserSqlRepository){}

    async getAllUsers(): Promise<IServiceReturn<IUser[]>>{
        try {
            const data = await this.mongoRepository.getAllUsers()
            return {
                success : true,
                message : "Got all users",
                data
            }
        } catch (err) {
            throw(err)
        }
    }

    async update(userId:number,data:IUserPartialed): Promise<IServiceReturn<IUser>>{
        try {
            const isExist = await this.sqlRepository.findByEmail(data.email!)
            if (isExist) throw new AppError(409,"User with email already exist")

            const hasPass = await bcrypt.hash(data.password!,salt)
            data.password = hasPass
            await this.sqlRepository.update(userId,data)
            const result = await this.mongoRepository.update(userId,data)
            return {
                success : true,
                message : "Updated",
                data:result
            }
        } catch (err) {
            throw(err)
        }
    }
}