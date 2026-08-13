import { IRegisterUser } from "../interfaces/IUser";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";

export class UserService implements IUserService{

    constructor(private userRepository:IUserRepository){}

    async register(user:IRegisterUser):Promise<boolean>{
        try {
            await this.userRepository.create(user)
            return true
        } catch (err) {
            throw(err)
        }
    }
}