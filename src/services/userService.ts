import { AppError } from "../errors/AppError";
import { IUserPartialed } from "../interfaces/User/IUser";
import { IUserMongoRepository, IUserSqlRepository } from "../interfaces/User/IUserRepository";
import { IServiceReturn, IUserService } from "../interfaces/User/IUserService";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcrypt"
const salt = 10


export class UserService implements IUserService{

    constructor(private mongoRepository:IUserMongoRepository,private sqlRepository:IUserSqlRepository){}

    async register(user:IUserPartialed):Promise<IServiceReturn<IUserPartialed>>{
        try {
            const isExist = await this.sqlRepository.findByEmail(user.email!)
            if (isExist) throw new AppError(409,"User with email already exist")
  
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

    async login(user:IUserPartialed):Promise<IServiceReturn<string>>{
        try {
            const isExist = await this.sqlRepository.findByEmail(user.email!)

            if (!isExist) throw new AppError(404,"User doesn't exist")

            const isMatch = await bcrypt.compare(user.password!,isExist.password)

            if (!isMatch) throw new AppError(401,"Password not matching")
            
            const token = generateToken(
                Number(isExist.id),
                isExist.role
            )
            return {
                success : true,
                message : "Logged In Successfully",
                data:token
            }
        } catch (err) {
            throw(err)
        }
    }
}