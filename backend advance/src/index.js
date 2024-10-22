import mongoose from "mongoose";
import { dbName } from "./constants.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();


(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI} /${dbName}`,);
        console.log("Connected to MongoDB");
        app.on("error", (err) => {
            console.log(err);
            throw err;
        })
        app.listen(process.env.PORT, () => {
            console.log("Listening on port", process.env.PORT);

        })
    }
    catch (err) {
        console.log(err);
    }
})();