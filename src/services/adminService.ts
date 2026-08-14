import { IAdminService } from "../interfaces/Admin/IAdminService";
import { IUser } from "../interfaces/User/IUser";
import { IUserMongoRepository } from "../interfaces/User/IUserRepository";
import { IServiceReturn } from "../interfaces/User/IUserService";

export class AdminService implements IAdminService{
    constructor (private repository:IUserMongoRepository){}

    async getAllUsers(): Promise<IServiceReturn<IUser[]>>{
        try {
            const data = await this.repository.getAllUsers()
            return {
                success : true,
                message : "Got all users",
                data
            }
        } catch (err) {
            throw(err)
        }
    }
}