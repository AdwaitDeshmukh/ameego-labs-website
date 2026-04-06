import transporter from '../config/mailer.js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ BASIC EMAIL SENDER - the core function everything else uses
export const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html
        });

        console.log(`✅ Email sent to ${to} — ID: ${info.messageId}`);
        return { success: true, messageId: info.messageId };

    } catch (error) {
        console.error('❌ Email send failed:', error.message);
        throw new Error(`Email failed: ${error.message}`);
    }
};