import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export const Subscription = mongoose.model("Subscription", subscriptionSchema);