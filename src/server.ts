import "dotenv/config";
import { app } from "./app";
import { MongoDatabase } from "./config/mongo";
import { MySQLDatabase } from "./config/mysql";

const PORT = process.env.PORT

const mongo = new MongoDatabase()
const mysql = new MySQLDatabase()


const startServer = async (): Promise<void> => {
    try {
        await mongo.connect()
        await mysql.connect()

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
}

startServer()