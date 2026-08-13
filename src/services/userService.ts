import { IRegisterUser } from "../interfaces/IUser";
import { IUserMongoRepository, IUserSqlRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";

export class UserService implements IUserService{

    constructor(private mongoRepository:IUserMongoRepository,private sqlRepository:IUserSqlRepository){}

    async register(user:IRegisterUser):Promise<boolean>{
        try {
            await this.sqlRepository.create(user)
            const data = await this.sqlRepository.findByEmail(user.email)
            await this.mongoRepository.create(data)
            console.log("Created BOTH DBS")
            return true
        } catch (err) {
            throw(err)
        }
    }
}