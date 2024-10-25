import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware setup
app.use(cookieParser());  // Parse cookies from requests

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",  // Fallback for local dev
    credentials: true  // Allow cookies to be sent across origins
}));

app.use(express.json({
    limit: "16kb"  // Limit payload size for security
}));

app.use(express.urlencoded({
    extended: true,  // Use extended URL encoding
    limit: "16kb"  // Same payload size limit for URL-encoded data
}));

app.use(express.static("public"));  // Serve static files from the public directory

// Importing routes
import { userRouter } from "./routes/user.route.js";

// Route declarations
app.use("/api/v1/user", userRouter);

export default app;
