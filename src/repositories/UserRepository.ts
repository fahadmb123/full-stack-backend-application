import { IRegisterUser } from "../interfaces/IUser";
import { BaseRepository } from "./BaseRepository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { MySQLDatabase } from "../config/mysql";


export class UserRepository extends BaseRepository<IRegisterUser> implements IUserRepository{
    constructor (private db:MySQLDatabase) {
        super()
    }
    async create(user:IRegisterUser):Promise<boolean>{
        try {
            const mysqlPool = this.db.getPool()
            const query = `
                INSERT INTO users (name, email, password)
                VALUES (?, ?, ?)
            `;
            await mysqlPool.execute(query, [
                user.name,
                user.email,
                user.password
            ])
            return true
        } catch (err) {
            throw(err)
        }
    }
}