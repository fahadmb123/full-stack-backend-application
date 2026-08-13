import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        required: true
    }
});

export const UserModel = mongoose.model("User", userSchema);