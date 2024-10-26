import { asyncHandler } from "../utils/asyncHandler.js";

// Register User Controller
const registerUser = asyncHandler(async (req, res) => {
    console.log("Register User Controller Hit!"); // Debugging log
    res.status(200).json({ message: "User registered successfully!" });
});

export { registerUser };
