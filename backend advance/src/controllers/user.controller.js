import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import jwt from "jsonwebtoken";


const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.getAccessToken()
        const refreshToken = user.getRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, error.message);
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    console.log(req.files);


    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : { url: "" };

    if (!avatar || !avatar.url) {
        throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }
    if (coverImageLocalPath && (!coverImage || !coverImage.url)) {
        throw new ApiError(500, "Failed to upload cover image to Cloudinary");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage.url,
        username: username.toLowerCase(),
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body

    if (!(email || username)) {
        throw new ApiError(400, "Email and username fields are required")
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const validPassword = await user.isPasswordCorrect(password)

    if (!validPassword) {
        throw new ApiError(401, "Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully")
        )

});

const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }, {
        new: true
    }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "user Logged out successfully"))

})

const refreshUserToken = asyncHandler(async (req, res) => {
    try {
        req.cookies.refreshToken || req.body.refreshToken

        if (!refreshUserToken) {
            throw new ApiError(400, "Refresh token is required")
        }

        const decoded = jwt.verify(refreshUserToken, process.env.REFERESH_TOKEN_STRING)

        const user = await User.findById(decoded?._id)

        if (!user) {
            throw new ApiError(404, "User not found")
        }
        if (refreshUserToken !== user.refreshToken) {
            throw new ApiError(401, "Invalid refresh token")
        }

        const option = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, newrefreshToken } = await generateAccessTokenAndRefreshToken(user._id)
        return status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", newrefreshToken, option)
            .json(new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken: newrefreshToken
                },
                "user refreshed successfully"
            )
            )
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Old password is incorrect")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new ApiResponse
        (200,
            "Password changed successfully"
        ))

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(200, req.user, "User fetched successfully")
})

const updateUserName = asyncHandler(async (req, res) => {
    const { username, fullname, email, newUsername } = req.body

    if (!fullname || !username || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    user.username = newUsername
    const sameUsername = await User.findOne({ username: newUsername })
    if (sameUsername) {
        throw new ApiError(400, "Username already exists")
    }
    await user.save({ validateBeforeSave: false })

    return res.status(200).json(new ApiResponse
        (200,
            "Username changed successfully"
        ))

})

const updateAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.files?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(500, "Error uploading avatar")
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        avatar: avatar.url
    }, { new: true }).select("-password")
    return res.status(200).json(new ApiResponse
        (200,
            "Avatar changed successfully"
        ))
})

const updateCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.files?.path
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const coverImage = uploadOnCloudinary(avatarLocalPath)

    if (!coverImage.url) {
        throw new ApiError(500, "Error uploading coverImage")
    }

    await User.findByIdAndUpdate(req.user._id, {
        coverImage: coverImage.url
    }, { new: true }).select("-password")
    return res.status(200).json(new ApiResponse
        (200,
            "CoverImage changed successfully"
        ))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshUserToken,
    changePassword,
    getCurrentUser,
    updateUserName,
    updateAvatar,
    updateCoverImage
};
