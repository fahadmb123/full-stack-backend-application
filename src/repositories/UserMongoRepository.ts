import { IUserPartialed, IUser } from "../interfaces/IUser";
import { BaseRepository } from "./BaseRepository";
import { IUserMongoRepository } from "../interfaces/IUserRepository";
import { MySQLDatabase } from "../config/mysql";
import { UserModel } from "../models/userModel";



export class UserMongoRepository extends BaseRepository<IUserPartialed> implements IUserMongoRepository{
    async create(data:IUser):Promise<boolean>{
        try {         
            const newMongoUser = new UserModel ({
                userId:data?.id,
                name:data?.name,
                email:data?.email,
                password:data?.password,
                role:data?.role
            })
            await newMongoUser.save()
            return true
        } catch (err) {
            throw(err)
        }
    }
}