import { IUserPartialed, IUser } from "../interfaces/IUser";
import { BaseRepository } from "./BaseRepository";
import { IUserSqlRepository } from "../interfaces/IUserRepository";
import { MySQLDatabase } from "../config/mysql";
import { Pool } from "mysql2/promise";

export class UserSqlRepository extends BaseRepository<IUserPartialed> implements IUserSqlRepository{

    private mysqlPool : Pool

    constructor (private db:MySQLDatabase) {
        super()
        this.mysqlPool = db.getPool()
    }
    async create(user:IUserPartialed):Promise<boolean>{
        try {
            const query = `
                INSERT INTO users (name, email, password)
                VALUES (?, ?, ?)`;

            await this.mysqlPool.execute(query, [
                user.name,
                user.email,
                user.password
            ] as string[])
            
            
            return true
        } catch (err) {
            throw(err)
        }
    }

    async findByEmail(email:string):Promise<IUser> {
        try {
            const query = `
                SELECT * FROM users
                WHERE email = ?`;

            const [rows]  = await this.mysqlPool.execute(query,[email])
            const users = rows as IUser[]
            const data = users.find((val)=>{
                return val.email === email
            })
            return data as IUser
        } catch (err) {
            throw (err)
        }
    }
}