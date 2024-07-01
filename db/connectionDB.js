import mongoose from "mongoose";
import dotenv from "dotenv"
import AppError from "../utils/AppError.js";
dotenv.config()

export const connectionDB = async () => {

    const connection = await mongoose.connect(process.env.MONGO_CLOUD_URL)
    console.log(`Database is successfully Connected! ...`)
    if (!connection) return next(new AppError(`No Connection is istablished! .. `, 400))
}    
export default connectionDB