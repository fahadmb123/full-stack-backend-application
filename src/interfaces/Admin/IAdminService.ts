import { IUser, IUserPartialed } from "../User/IUser"
import { IServiceReturn } from "../User/IUserService"

export interface IAdminService {
    getAllUsers():Promise<IServiceReturn<IUser[]>>
    update(userId:number,data:IUserPartialed):Promise<IServiceReturn<IUser>>
    createUser (user:IUserPartialed):Promise<IServiceReturn<IUserPartialed>>
}