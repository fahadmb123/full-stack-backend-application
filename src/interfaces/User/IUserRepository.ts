import { IUserPartialed, IUser } from "./IUser";

export interface IUserMongoRepository {
    create(user:IUser):Promise<boolean>
    getAllUsers():Promise<IUser[]>
}
export interface IUserSqlRepository {
    create(user:IUserPartialed):Promise<boolean>
        findByEmail(email:string):Promise<IUser>
}