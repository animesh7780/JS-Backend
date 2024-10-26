import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiRespone.js";

// Register User Controller
const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body
    console.log(email);

    if (fullname === "" || username === "" || email === "" || password === "") {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = User.findone({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (existedUser) {
        throw ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatar) {
        throw new error(400, "avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar and coverImage is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        username: username.toLowerCase(),
        email,
        password
    })

    const createdUser = awaitUser.findByID(user._id).select(
        '-password -refreshToken'
    )

    if (!createdUser) {
        throw ApiError(500, "Something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )

});

export { registerUser };
