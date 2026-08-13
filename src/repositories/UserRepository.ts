import { IUser } from "../interfaces/IUser";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<IUser>{
    async create(data:IUser):Promise<boolean>{
        return true
    }
}