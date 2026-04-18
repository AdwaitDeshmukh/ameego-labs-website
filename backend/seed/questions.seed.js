import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/question.model.js";

dotenv.config();

const questions = [
    // 🔹 ROOT QUESTION
    {
        questionId: 1,
        text: "Which service best describes what you are looking for?",
        type: "select",
        options: [
            "Website Development",
            "Web Application Development",
            "Mobile Application Development",
            "UI/UX Design",
            "Search Engine Optimization (SEO)",
            "Branding and Identity Design",
            "Training and Workshops"
        ],
        next: {
            "Website Development": 10,
            "Web Application Development": 20,
            "Mobile Application Development": 30,
            "UI/UX Design": 40,
            "Search Engine Optimization (SEO)": 50,
            "Branding and Identity Design": 60,
            "Training and Workshops": 70
        }
    },

    // 🔹 COMMON QUESTIONS
    {
        questionId: 2,
        text: "What is the primary objective of your project?",
        type: "select",
        options: [
            "Launch a new business or startup",
            "Improve an existing product or service",
            "Personal project or portfolio",
            "Educational or research purpose"
        ],
        defaultNext: 3
    },
    {
        questionId: 3,
        text: "What is your preferred project timeline?",
        type: "select",
        options: [
            "Less than 1 month (Urgent)",
            "1 to 3 months",
            "3 to 6 months",
            "Flexible / No strict deadline"
        ],
        defaultNext: 4
    },
    {
        questionId: 4,
        text: "What is your estimated budget range?",
        type: "select",
        options: [
            "Below ₹50,000",
            "₹50,000 to ₹1,00,000",
            "₹1,00,000 to ₹5,00,000",
            "Above ₹5,00,000"
        ],
        defaultNext: 5
    },
    {
        questionId: 5,
        text: "How clear are your project requirements?",
        type: "select",
        options: [
            "Fully defined with detailed requirements",
            "Mostly clear with minor uncertainties",
            "Basic idea but need guidance",
            "Exploring possibilities and need consultation"
        ],
        defaultNext: 6
    },
    {
        questionId: 6,
        text: "Who will be the primary users of this product?",
        type: "select",
        options: [
            "General public / customers",
            "Internal team or employees",
            "Students or learners",
            "Specific niche audience"
        ],
        defaultNext: null
    },

    // 🔹 WEB DEVELOPMENT
    {
        questionId: 10,
        text: "What type of website do you need?",
        type: "select",
        options: [
            "Business website",
            "Portfolio website",
            "E-commerce website",
            "Custom web application"
        ],
        defaultNext: 11
    },
    {
        questionId: 11,
        text: "What is the main purpose of the website?",
        type: "select",
        options: [
            "Showcase services or products",
            "Sell products online",
            "Generate leads or inquiries",
            "Provide online tools or services"
        ],
        defaultNext: 12
    },
    {
        questionId: 12,
        text: "How many pages do you expect?",
        type: "select",
        options: [
            "1 to 5 pages",
            "6 to 10 pages",
            "11 to 20 pages",
            "More than 20 pages"
        ],
        defaultNext: 13
    },
    {
        questionId: 13,
        text: "Do you require user login functionality?",
        type: "select",
        options: [
            "Yes, for customers",
            "Yes, for administrators only",
            "Yes, for both customers and administrators",
            "No login required"
        ],
        defaultNext: 14
    },
    {
        questionId: 14,
        text: "Will your website require payment integration?",
        type: "select",
        options: [
            "Yes, multiple payment methods",
            "Yes, single payment method",
            "Not immediately but in future",
            "No payment required"
        ],
        defaultNext: 15
    },
    {
        questionId: 15,
        text: "Do you need content management capabilities?",
        type: "select",
        options: [
            "Yes, full CMS access",
            "Yes, limited content editing",
            "Not sure, need guidance",
            "No CMS required"
        ],
        defaultNext: 16
    },
    {
        questionId: 16,
        text: "Do you require third-party integrations?",
        type: "select",
        options: [
            "Yes, payment and APIs",
            "Yes, analytics and tracking tools",
            "Yes, CRM or business tools",
            "No integrations required"
        ],
        defaultNext: 17
    },
    {
        questionId: 17,
        text: "Do you need responsive design for mobile devices?",
        type: "select",
        options: [
            "Yes, mobile-first design",
            "Yes, standard responsive",
            "Optional",
            "No requirement"
        ],
        defaultNext: 18
    },
    {
        questionId: 18,
        text: "Do you already have design assets ready?",
        type: "select",
        options: [
            "Yes, full design ready",
            "Partial design available",
            "Basic brand assets only",
            "No design available"
        ],
        defaultNext: 19
    },
    {
        questionId: 19,
        text: "Do you require hosting and deployment support?",
        type: "select",
        options: [
            "Yes, full setup required",
            "Yes, guidance only",
            "Already have hosting",
            "Not required"
        ],
        defaultNext: 2
    },

    // 🔹 APP DEVELOPMENT
    {
        questionId: 20,
        text: "What type of application are you planning to build?",
        type: "select",
        options: [
            "Business management system",
            "Customer-facing platform",
            "Internal company tool",
            "Software as a Service (SaaS)"
        ],
        defaultNext: 21
    },
    {
        questionId: 21,
        text: "What is the expected scale of users?",
        type: "select",
        options: [
            "Less than 100 users",
            "100 to 1,000 users",
            "1,000 to 10,000 users",
            "More than 10,000 users"
        ],
        defaultNext: 22
    },
    {
        questionId: 22,
        text: "Do you require user authentication?",
        type: "select",
        options: [
            "Email and password login",
            "Social login integration",
            "Multi-factor authentication",
            "No authentication required"
        ],
        defaultNext: 23
    },
    {
        questionId: 23,
        text: "Will the application handle sensitive data?",
        type: "select",
        options: [
            "Yes, financial data",
            "Yes, personal user data",
            "Yes, business data",
            "No sensitive data"
        ],
        defaultNext: 24
    },
    {
        questionId: 24,
        text: "Do you require dashboard and reporting features?",
        type: "select",
        options: [
            "Advanced dashboards",
            "Basic reporting",
            "Exportable reports",
            "No reporting required"
        ],
        defaultNext: 25
    },
    {
        questionId: 25,
        text: "Will your application require API integration?",
        type: "select",
        options: [
            "Multiple external APIs",
            "Single external API",
            "Internal APIs only",
            "No APIs required"
        ],
        defaultNext: 26
    },
    {
        questionId: 26,
        text: "What deployment environment do you prefer?",
        type: "select",
        options: [
            "Cloud hosting",
            "Private server",
            "Hybrid setup",
            "Need recommendation"
        ],
        defaultNext: 27
    },
    {
        questionId: 27,
        text: "Do you require role-based access control?",
        type: "select",
        options: [
            "Multiple user roles",
            "Basic admin access",
            "Limited roles",
            "No role system needed"
        ],
        defaultNext: 28
    },
    {
        questionId: 28,
        text: "Will the system require data backup and recovery?",
        type: "select",
        options: [
            "Automatic backups",
            "Scheduled backups",
            "Manual backups",
            "No backup required"
        ],
        defaultNext: 29
    },
    {
        questionId: 29,
        text: "Do you require maintenance and support after launch?",
        type: "select",
        options: [
            "Full maintenance support",
            "Limited support",
            "Bug-fix support only",
            "No support required"
        ],
        defaultNext: 2
    },

    // 🔹 MOBILE APP DEVELOPMENT
    {
        questionId: 30,
        text: "What type of mobile application do you want to build?",
        type: "select",
        options: [
            "Customer service application",
            "E-commerce mobile application",
            "Business management application",
            "Social or community application"
        ],
        defaultNext: 31
    },
    {
        questionId: 31,
        text: "Which platform do you want the application to support?",
        type: "select",
        options: [
            "Android only",
            "iOS only",
            "Both Android and iOS",
            "Need recommendation"
        ],
        defaultNext: 32
    },
    {
        questionId: 32,
        text: "Will the application require user login functionality?",
        type: "select",
        options: [
            "Yes, basic login",
            "Yes, social login options",
            "Yes, advanced authentication",
            "No login required"
        ],
        defaultNext: 33
    },
    {
        questionId: 33,
        text: "Do you require push notifications in the app?",
        type: "select",
        options: [
            "Yes, promotional notifications",
            "Yes, system notifications",
            "Yes, both promotional and system",
            "No notifications required"
        ],
        defaultNext: 34
    },
    {
        questionId: 34,
        text: "Will the application require payment integration?",
        type: "select",
        options: [
            "Yes, multiple payment options",
            "Yes, single payment option",
            "Planned for future phase",
            "No payment required"
        ],
        defaultNext: 35
    },
    {
        questionId: 35,
        text: "Do you require offline functionality?",
        type: "select",
        options: [
            "Yes, full offline support",
            "Yes, partial offline support",
            "Not required",
            "Not sure yet"
        ],
        defaultNext: 36
    },
    {
        questionId: 36,
        text: "Will the application use device features?",
        type: "select",
        options: [
            "Camera and media access",
            "Location and GPS",
            "Multiple device features",
            "No device features required"
        ],
        defaultNext: 37
    },
    {
        questionId: 37,
        text: "Do you require analytics and user tracking?",
        type: "select",
        options: [
            "Advanced analytics dashboard",
            "Basic usage analytics",
            "Third-party analytics tools",
            "No analytics required"
        ],
        defaultNext: 38
    },
    {
        questionId: 38,
        text: "How do you plan to monetize the application?",
        type: "select",
        options: [
            "Paid downloads",
            "In-app purchases",
            "Subscription model",
            "Free application"
        ],
        defaultNext: 39
    },
    {
        questionId: 39,
        text: "Do you require app store submission support?",
        type: "select",
        options: [
            "Yes, full submission support",
            "Yes, guidance only",
            "Already handled internally",
            "Not required"
        ],
        defaultNext: 2
    },

    // 🔹 UI/UX DESIGN
    {
        questionId: 40,
        text: "What type of product requires UI/UX design?",
        type: "select",
        options: [
            "Website design",
            "Mobile application design",
            "Web application design",
            "Multiple platforms"
        ],
        defaultNext: 41
    },
    {
        questionId: 41,
        text: "What stage is your product currently in?",
        type: "select",
        options: [
            "Idea stage",
            "Wireframe stage",
            "Prototype stage",
            "Existing product redesign"
        ],
        defaultNext: 42
    },
    {
        questionId: 42,
        text: "What level of design detail do you require?",
        type: "select",
        options: [
            "Basic wireframes",
            "High-fidelity UI design",
            "Interactive prototypes",
            "Complete design system"
        ],
        defaultNext: 43
    },
    {
        questionId: 43,
        text: "Do you have brand guidelines available?",
        type: "select",
        options: [
            "Yes, complete brand guidelines",
            "Partial brand assets",
            "Logo only available",
            "No brand assets available"
        ],
        defaultNext: 44
    },
    {
        questionId: 44,
        text: "Do you require user research and usability testing?",
        type: "select",
        options: [
            "Yes, full research and testing",
            "Yes, usability testing only",
            "Optional if recommended",
            "Not required"
        ],
        defaultNext: 45
    },
    {
        questionId: 45,
        text: "How many screens do you estimate?",
        type: "select",
        options: [
            "Less than 10 screens",
            "10 to 25 screens",
            "25 to 50 screens",
            "More than 50 screens"
        ],
        defaultNext: 46
    },
    {
        questionId: 46,
        text: "Do you require responsive design layouts?",
        type: "select",
        options: [
            "Yes, mobile and desktop",
            "Yes, mobile only",
            "Desktop only",
            "Not required"
        ],
        defaultNext: 47
    },
    {
        questionId: 47,
        text: "Do you require design handoff documentation?",
        type: "select",
        options: [
            "Complete developer handoff",
            "Standard design assets",
            "Prototype files only",
            "Not required"
        ],
        defaultNext: 48
    },
    {
        questionId: 48,
        text: "Will accessibility standards be required?",
        type: "select",
        options: [
            "Yes, full accessibility compliance",
            "Basic accessibility support",
            "Optional",
            "Not required"
        ],
        defaultNext: 49
    },
    {
        questionId: 49,
        text: "Do you require post-design support?",
        type: "select",
        options: [
            "Yes, full support",
            "Limited support",
            "Bug-fix support",
            "Not required"
        ],
        defaultNext: 2
    },

    // 🔹 SEO
    {
        questionId: 50,
        text: "What is the primary goal of your SEO project?",
        type: "select",
        options: [
            "Increase website traffic",
            "Improve search engine rankings",
            "Generate leads",
            "Increase online sales"
        ],
        defaultNext: 51
    },
    {
        questionId: 51,
        text: "What type of website requires SEO?",
        type: "select",
        options: [
            "Business website",
            "E-commerce website",
            "Blog or content website",
            "New website launch"
        ],
        defaultNext: 52
    },
    {
        questionId: 52,
        text: "What is the current SEO status of your website?",
        type: "select",
        options: [
            "No SEO done previously",
            "Basic SEO implemented",
            "Active SEO campaign",
            "Not sure"
        ],
        defaultNext: 53
    },
    {
        questionId: 53,
        text: "Do you have target keywords defined?",
        type: "select",
        options: [
            "Yes, complete keyword list",
            "Partial keyword list",
            "Need keyword research",
            "Not sure"
        ],
        defaultNext: 54
    },
    {
        questionId: 54,
        text: "What geographic region do you want to target?",
        type: "select",
        options: [
            "Local region",
            "National level",
            "International level",
            "Multiple regions"
        ],
        defaultNext: 55
    },
    {
        questionId: 55,
        text: "Do you require content creation services?",
        type: "select",
        options: [
            "Yes, full content creation",
            "Yes, blog content only",
            "Yes, landing pages",
            "No content required"
        ],
        defaultNext: 56
    },
    {
        questionId: 56,
        text: "Do you require technical SEO optimization?",
        type: "select",
        options: [
            "Full technical audit",
            "Performance optimization",
            "Mobile optimization",
            "Not required"
        ],
        defaultNext: 57
    },
    {
        questionId: 57,
        text: "Will backlink development be required?",
        type: "select",
        options: [
            "Yes, full backlink strategy",
            "Basic backlink building",
            "Optional",
            "Not required"
        ],
        defaultNext: 58
    },
    {
        questionId: 58,
        text: "How frequently do you want SEO reporting?",
        type: "select",
        options: [
            "Weekly reports",
            "Monthly reports",
            "Quarterly reports",
            "No reporting required"
        ],
        defaultNext: 59
    },
    {
        questionId: 59,
        text: "Do you require ongoing SEO maintenance?",
        type: "select",
        options: [
            "Yes, long-term maintenance",
            "Yes, short-term support",
            "Optional",
            "Not required"
        ],
        defaultNext: 2
    },

    // 🔹 BRANDING
    {
        questionId: 60,
        text: "What branding services do you require?",
        type: "select",
        options: [
            "Logo design",
            "Complete brand identity",
            "Brand refresh",
            "Marketing materials design"
        ],
        defaultNext: 61
    },
    {
        questionId: 61,
        text: "What stage is your business currently in?",
        type: "select",
        options: [
            "Startup stage",
            "Growing business",
            "Established brand",
            "Rebranding initiative"
        ],
        defaultNext: 62
    },
    {
        questionId: 62,
        text: "Do you already have brand assets available?",
        type: "select",
        options: [
            "Complete brand assets",
            "Partial assets",
            "Logo only",
            "No assets available"
        ],
        defaultNext: 63
    },
    {
        questionId: 63,
        text: "What type of visual style do you prefer?",
        type: "select",
        options: [
            "Modern and minimal",
            "Corporate and professional",
            "Creative and bold",
            "Need recommendation"
        ],
        defaultNext: 64
    },
    {
        questionId: 64,
        text: "Will your brand require typography selection?",
        type: "select",
        options: [
            "Yes, full typography system",
            "Basic typography selection",
            "Optional",
            "Not required"
        ],
        defaultNext: 65
    },
    {
        questionId: 65,
        text: "Do you require brand usage guidelines?",
        type: "select",
        options: [
            "Yes, full brand manual",
            "Basic usage guide",
            "Optional",
            "Not required"
        ],
        defaultNext: 66
    },
    {
        questionId: 66,
        text: "Will packaging design be required?",
        type: "select",
        options: [
            "Yes, full packaging design",
            "Yes, label design only",
            "Optional",
            "Not required"
        ],
        defaultNext: 67
    },
    {
        questionId: 67,
        text: "Do you require digital branding materials?",
        type: "select",
        options: [
            "Social media templates",
            "Website branding assets",
            "Marketing banners",
            "Not required"
        ],
        defaultNext: 68
    },
    {
        questionId: 68,
        text: "Will print materials be required?",
        type: "select",
        options: [
            "Business cards",
            "Brochures",
            "Stationery",
            "Not required"
        ],
        defaultNext: 69
    },
    {
        questionId: 69,
        text: "Do you require ongoing brand support?",
        type: "select",
        options: [
            "Yes, long-term support",
            "Short-term support",
            "Occasional updates",
            "Not required"
        ],
        defaultNext: 2
    },

    // 🔹 TRAINING
    {
        questionId: 70,
        text: "What type of training are you looking for?",
        type: "select",
        options: [
            "Technical training",
            "Corporate training",
            "Skill development training",
            "Academic training"
        ],
        defaultNext: 71
    },
    {
        questionId: 71,
        text: "What is the expected number of participants?",
        type: "select",
        options: [
            "1 to 10 participants",
            "11 to 25 participants",
            "26 to 50 participants",
            "More than 50 participants"
        ],
        defaultNext: 72
    },
    {
        questionId: 72,
        text: "What training delivery mode do you prefer?",
        type: "select",
        options: [
            "Online live sessions",
            "Recorded sessions",
            "On-site training",
            "Hybrid training"
        ],
        defaultNext: 73
    },
    {
        questionId: 73,
        text: "What is the expected duration of the training?",
        type: "select",
        options: [
            "1 day workshop",
            "1 week program",
            "1 month program",
            "Long-term training"
        ],
        defaultNext: 74
    },
    {
        questionId: 74,
        text: "What level of expertise should the training target?",
        type: "select",
        options: [
            "Beginner level",
            "Intermediate level",
            "Advanced level",
            "Mixed levels"
        ],
        defaultNext: 75
    },
    {
        questionId: 75,
        text: "Do you require certification upon completion?",
        type: "select",
        options: [
            "Yes, official certification",
            "Yes, participation certificate",
            "Optional",
            "Not required"
        ],
        defaultNext: 76
    },
    {
        questionId: 76,
        text: "Will customized training content be required?",
        type: "select",
        options: [
            "Fully customized content",
            "Partially customized",
            "Standard training content",
            "Not sure"
        ],
        defaultNext: 77
    },
    {
        questionId: 77,
        text: "Do you require post-training support?",
        type: "select",
        options: [
            "Yes, full support",
            "Limited support",
            "Email support only",
            "Not required"
        ],
        defaultNext: 78
    },
    {
        questionId: 78,
        text: "Will training materials be required?",
        type: "select",
        options: [
            "Printed materials",
            "Digital materials",
            "Both printed and digital",
            "Not required"
        ],
        defaultNext: 79
    },
    {
        questionId: 79,
        text: "Do you require progress tracking and reporting?",
        type: "select",
        options: [
            "Yes, detailed tracking",
            "Basic tracking",
            "Optional",
            "Not required"
        ],
        defaultNext: 2
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