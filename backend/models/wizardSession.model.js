import mongoose from "mongoose";

const wizardSessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },

    answers: [
        {
            questionId: Number,
            answer: mongoose.Schema.Types.Mixed
        }
    ],

    status: {
        type: String,
        enum: ["in_progress", "completed"],
        default: "in_progress"
    },
    userEmail:{
        type:String,
        default:null   
    },
    acknowledged:{
        type:Boolean,
        default:false
    },
    crd:{
        type:Object,
        default:null
    }
}, 

{ timestamps: true }
);

export default mongoose.model("WizardSession", wizardSessionSchema);