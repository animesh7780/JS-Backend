import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String, //clouniarary
        required: true
    },
    coverImage: {
        type: String, //clouniarary
    },
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
            avatar: this.avatar,
            coverImage: this.coverImage,
            watchHistory: this.watchHistory
        },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.getRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFERESH_TOKEN_STRING, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model('User', userSchema)