// Importing dependencies
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.route.js";

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/user", userRouter);

export { app };
