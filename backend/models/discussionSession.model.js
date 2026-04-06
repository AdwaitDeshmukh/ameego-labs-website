import mongoose from "mongoose";

const discussionSessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true
    },

    messages: [
        {
            role: {
                type: String,
                enum: ["user", "assistant"]
            },
            content: String
        }
    ],

    summary: {
        type: String,
        default: ""
    },

    // optional but recommended
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 7 // auto delete after 7 days
    }
});

export default mongoose.model("DiscussionSession", discussionSessionSchema);