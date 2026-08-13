import { IRegisterUser } from "./IUser";

export interface IUserService {
    register (user:IRegisterUser):Promise<boolean>
}