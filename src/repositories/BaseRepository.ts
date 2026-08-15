import { IUser, IUserPartialed } from "../interfaces/User/IUser";

export abstract class BaseRepository <T>{
    abstract create(data:T):Promise<boolean>
    abstract delete(userId:number):Promise<void>
}