
import mongoose, {Mongoose} from "mongoose";


const DB_URL = process.env.MONGODB_URL;

interface MongoConnection {
    connection: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cache : MongoConnection = ( global as any ).mongoose

if(!cache) {
    cache = (global as any).mongoose = {
        connection: null,
        promise: null
    }
}

export async function dbConnect() {

    if(cache.connection) {
        return cache.connection;
    }

    if(!DB_URL) throw new Error("Database Connection Failed, URL Not Found")

    cache.promise = cache.promise || mongoose.connect(DB_URL,{dbName: "imageAI", bufferCommands: false})

    cache.connection = await cache.promise;

    return cache.connection;

}
 
