import mongoose from "mongoose";
import dotenv from 'dotenv'


const connectDb = async () => {
    dotenv.config()
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
        console.log(
            `\n MongoDB Connected to ${connection.connection.host}`
          );
    } catch (error) {
        console.log('database connection failed')
    }
}

export default connectDb;