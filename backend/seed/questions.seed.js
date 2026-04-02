import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/question.model.js";

dotenv.config();

const questions = [
    // 🔹 ROOT
    {
        questionId: 1,
        text: "What service are you looking for?",
        type: "select",
        options: ["web_dev", "app_dev", "mobile_app", "ui_ux", "seo", "branding", "training"],
        next: {
            web_dev: 10,
            app_dev: 20,
            mobile_app: 30,
            ui_ux: 40,
            seo: 50,
            branding: 60,
            training: 70
        }
    },

    // 🔹 COMMON
    {
        questionId: 2,
        text: "What is the main goal of your project?",
        type: "select",
        options: ["business", "startup", "personal", "educational"],
        defaultNext: 3
    },
    {
        questionId: 3,
        text: "What is your expected timeline?",
        type: "select",
        options: ["urgent", "1_3_months", "3_6_months", "flexible"],
        defaultNext: 4
    },
    {
        questionId: 4,
        text: "What is your budget range?",
        type: "select",
        options: ["<50k", "50k_1L", "1L_5L", "5L+"],
        defaultNext: null
    },

    // 🔹 WEB DEV
    {
        questionId: 10,
        text: "What type of website do you need?",
        type: "select",
        options: ["static", "dynamic", "ecommerce"],
        defaultNext: 2
    },
    {
        questionId: 11,
        text: "What features do you need?",
        type: "multi-select",
        options: ["login", "payment", "admin_panel", "blog", "api_integration"],
        defaultNext: 12
    },
    {
        questionId: 12,
        text: "How many pages/screens do you expect?",
        type: "select",
        options: ["1_5", "5_10", "10_plus"],
        defaultNext: 13
    },
    {
        questionId: 13,
        text: "Do you need backend development?",
        type: "select",
        options: ["yes", "no"],
        defaultNext: 14
    },
    {
        questionId: 14,
        text: "Do you need deployment and hosting setup?",
        type: "select",
        options: ["yes", "no"],
        defaultNext: null
    }

    // 👉 For now insert only these (test first)
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Question.deleteMany(); // clear old data
        await Question.insertMany(questions);

        console.log("Questions inserted successfully");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();