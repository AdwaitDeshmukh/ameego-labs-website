import { sendCRDEmail } from "./emailService.js";

const fakeCRD = {
  project_overview: "A food delivery app for local restaurants.",
  goals_objectives: "Help restaurants go online and reach more customers.",
  features_required: ["User login", "Menu browsing", "Cart & checkout"],
  functional_requirements: {
    authentication: "Email + Google OAuth",
    core_features: ["Browse restaurants", "Place orders", "Track delivery"],
    admin_features: ["Manage restaurants", "View orders"]
  },
  technical_preferences: "React frontend, Node backend",
  non_functional_requirements: {
    performance: "Load under 2 seconds",
    security: "JWT auth, HTTPS",
    scalability: "Handle 10k users"
  },
  timeline: "3 months",
  budget: "₹2,00,000",
  additional_notes: "Should work well on mobile browsers."
};

sendCRDEmail("adwaitdeshmukh1121@gmail.com",fakeCRD);