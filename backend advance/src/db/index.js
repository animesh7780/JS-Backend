import mongoose from "mongoose";
import { dbName } from "../constants.js";


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI} /${dbName}`,);
        console.log("Connected to MongoDB");
        console.log(`mongoDB connected !! DB Host : ${connectionInstance}`);

    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB