import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
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
        type: Number,
        default: 1,
    },

},
    { timestamps: true }
);

export default mongoose.model("users", userSchema)