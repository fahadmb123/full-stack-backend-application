import mysql from "mysql2/promise";

export class MySQLDatabase {
    private pool;

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.SQL_HOST!,
            user: process.env.SQL_USER!,
            password: process.env.SQL_PASSWORD!,
            database: process.env.SQL_DATABASE!, 
            port: Number(process.env.SQL_PORT),
        })
    }

    async connect(): Promise<void> {
        try {
            const connection = await this.pool.getConnection();

            console.log("MySQL connected");

            connection.release();
        } catch (error) {
            console.error("MySQL connection failed", error);
            throw error;
        }
    }

    getPool() {
        return this.pool;
    }
}