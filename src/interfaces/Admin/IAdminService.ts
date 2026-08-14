import { IUser } from "../User/IUser"
import { IServiceReturn } from "../User/IUserService"

export interface IAdminService {
    getAllUsers():Promise<IServiceReturn<IUser[]>>
}