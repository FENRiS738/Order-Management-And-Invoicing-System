import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.DATABASE_URI

const connectToDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db("adminclustor");
        return {
            success: true,
            message: "Database Connected.",
            database: db
        };
    } catch (error) {
        return {
          success: false,
          message: "Unable to connect to Database."
        }
    }
}

export default connectToDB;