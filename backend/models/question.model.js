import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        required: true,
        unique: true
    },

    text: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["select", "text", "multi-select"],
        required: true
    },

    options: {
        type: [String],
        default: []
    },

    // branching logic
    next: {
        type: Map,
        of: Number
    },

    defaultNext: {
        type: Number,
        default: null
    }
});

export default mongoose.model("Question", questionSchema);