import { IUserPartialed, IUser } from "../interfaces/User/IUser";
import { BaseRepository } from "./BaseRepository";
import { IUserSqlRepository } from "../interfaces/User/IUserRepository";
import { MySQLDatabase } from "../config/mysql";
import { Pool } from "mysql2/promise";
import { AppError } from "../errors/AppError";

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

    async update(userId:number,data:IUserPartialed):Promise<void> {
        try {
            const fields: string[] = []
            const values: string[] = []

            if (data.name !== undefined) {
                fields.push("name = ?");
                values.push(data.name);
            }
            if (data.email !== undefined) {
                fields.push("email = ?");
                values.push(data.email);
            }
            if (fields.length === 0) throw new AppError(400,"No fields provided for update")

            values.push(String(userId));

            const query = `
                UPDATE users
                SET ${fields.join(", ")}
                WHERE id = ?
            `;

            await this.db.getPool().execute(query, values)
        } catch (err) {
            throw (err)
        }
    }

}