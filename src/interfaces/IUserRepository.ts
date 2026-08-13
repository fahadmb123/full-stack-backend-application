import { IRegisterUser } from "./IUser";

export interface IUserRepository {
    create(user:IRegisterUser):Promise<boolean>
}