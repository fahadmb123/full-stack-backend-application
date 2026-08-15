import { IUserPartialed, IUser } from "../interfaces/User/IUser";
import { BaseRepository } from "./BaseRepository";
import { IUserMongoRepository } from "../interfaces/User/IUserRepository";
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

    async getAllUsers():Promise<IUser[]>{
        try {
            const data = await UserModel.find()
            return data
        } catch (err) {
            throw(err)
        }
    }

    async update(userId:number,data:IUserPartialed):Promise<IUser> {
        try {
            const updatedUser = await UserModel.findOneAndUpdate(
                { userId },
                { $set: data },
                { new: true }
            )
            return updatedUser as IUser
        } catch (err) {
            throw (err)
        }
    }
}