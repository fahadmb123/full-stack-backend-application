import { IRegisterUser } from "../interfaces/IUser";
import { IUserMongoRepository, IUserSqlRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";

export class UserService implements IUserService{

    constructor(private mongoRepository:IUserMongoRepository,private sqlRepository:IUserSqlRepository){}

    async register(user:IRegisterUser):Promise<boolean>{
        try {
            const isExist = await this.sqlRepository.findByEmail(user.email)
            if (isExist) {
                throw new Error("The user with email already exist")
            }
            await this.sqlRepository.create(user)
            const data = await this.sqlRepository.findByEmail(user.email)
            await this.mongoRepository.create(data)
            return true
        } catch (err) {
            throw(err)
        }
    }
}