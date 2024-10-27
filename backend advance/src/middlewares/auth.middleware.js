import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or authorization header
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "You are not authenticated");
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user by decoded ID, excluding sensitive fields
        const user = await User.findById(decoded?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        // Attach user to request object and proceed
        req.user = user;
        next();
    } catch (error) {
        next(new ApiError(401, error.message));
    }
});
