import { IRegisterUser } from "../interfaces/IUser";
import { IUserService } from "../interfaces/IUserService";

export class UserService implements IUserService{
    async register(user:IRegisterUser):Promise<boolean>{
        return true
    }
}