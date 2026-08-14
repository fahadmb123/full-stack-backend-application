import { IUserPartialed } from "../interfaces/IUser";
import { IUserMongoRepository, IUserSqlRepository } from "../interfaces/IUserRepository";
import { IServiceReturn, IUserService } from "../interfaces/IUserService";
import bcrypt from "bcrypt"
const salt = 10


export class UserService implements IUserService<IUserPartialed>{

    constructor(private mongoRepository:IUserMongoRepository,private sqlRepository:IUserSqlRepository){}

    async register(user:IUserPartialed):Promise<IServiceReturn<IUserPartialed>>{
        try {
            const isExist = await this.sqlRepository.findByEmail(user.email!)
            if (isExist) {
                throw new Error("User with email already exist")
            }
            const hasPass = await bcrypt.hash(user.password!,salt)
            user.password = hasPass
            await this.sqlRepository.create(user)
            const data = await this.sqlRepository.findByEmail(user.email!)
            await this.mongoRepository.create(data)
            return {
                success : true,
                message:"Acount registered Successfully",
                data
            }
        } catch (err) {
            throw(err)
        }
    }

    async login(user:IUserPartialed):Promise<IServiceReturn<IUserPartialed>>{
        try {
            const isExist = await this.sqlRepository.findByEmail(user.email!)

            if (!isExist) throw new Error("User doesn't exist")

            const isMatch = await bcrypt.compare(user.password!,isExist.password)

            if (!isMatch) throw new Error("Password not matching")

            return {
                success : true,
                message : "Logged In Successfully",
                data:{}
            }
        } catch (err) {
            throw(err)
        }
    }
}