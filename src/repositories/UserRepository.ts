import { IRegisterUser, IUser } from "../interfaces/IUser";
import { BaseRepository } from "./BaseRepository";
import { IUserRepository } from "../interfaces/IUserRepository";
import { MySQLDatabase } from "../config/mysql";
import { UserModel } from "../models/userModel";

export class UserRepository extends BaseRepository<IRegisterUser> implements IUserRepository{
    constructor (private db:MySQLDatabase) {
        super()
    }
    async create(user:IRegisterUser):Promise<boolean>{
        try {
            const mysqlPool = this.db.getPool()
            let query = `
                INSERT INTO users (name, email, password)
                VALUES (?, ?, ?)`;

            await mysqlPool.execute(query, [
                user.name,
                user.email,
                user.password
            ])
            query = `
                SELECT * FROM users
                WHERE email = ?`;

            const [rows]  = await mysqlPool.execute(query,[user.email])
            const users = rows as IUser[]
            const data = users.find((val)=>{
                return val.email === user.email
            })
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