import mongoose from "mongoose"

// Verification Token Schema
const VerificationTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// Verification Token Model
export default mongoose.model("VerificationToken", VerificationTokenSchema);