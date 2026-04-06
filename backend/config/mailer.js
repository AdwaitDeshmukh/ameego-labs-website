import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test the connection when server starts
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Mailer connection failed:', error.message);
    } else {
        console.log('✅ Mailer is ready to send emails');
    }
});

export default transporter;