import { IRegisterUser, IUser } from "./IUser";

export interface IUserMongoRepository {
    create(user:IUser):Promise<boolean>
}
export interface IUserSqlRepository {
    create(user:IRegisterUser):Promise<boolean>
        findByEmail(email:string):Promise<IUser>
}