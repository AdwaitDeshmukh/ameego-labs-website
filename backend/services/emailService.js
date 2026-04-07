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

export const buildCRDEmail = (userEmail, crd) => {
    const featuresHTML = crd.features_required
        .map(f => `<li>${f}</li>`).join('');

    const coreHTML = crd.functional_requirements.core_features
        .map(f => `<li>${f}</li>`).join('');

    const adminHTML = crd.functional_requirements.admin_features
        .map(f => `<li>${f}</li>`).join('');

    const html = `
    <div style="font-family: 'Georgia', serif; max-width: 680px; margin: 0 auto; background: #0f0f0f; color: #f0ede6; border-radius: 12px; overflow: hidden;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 48px 40px; text-align: center; border-bottom: 2px solid #e8c547;">
            <p style="color: #e8c547; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 12px;">Ameego Labs</p>
            <h1 style="color: #f0ede6; font-size: 32px; margin: 0 0 8px; font-weight: 700;">Your Project Blueprint</h1>
            <p style="color: #a09d96; font-size: 14px; margin: 0;">Client Requirement Document</p>
        </div>

        <!-- Body -->
        <div style="padding: 40px;">

            <!-- Greeting -->
            <p style="color: #a09d96; font-size: 14px; margin: 0 0 32px;">Prepared for: <span style="color: #e8c547;">${userEmail}</span></p>

            <!-- Project Overview -->
            <div style="background: #1a1a1a; border-left: 3px solid #e8c547; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <p style="color: #e8c547; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 12px;">Project Overview</p>
                <p style="color: #f0ede6; font-size: 15px; line-height: 1.7; margin: 0;">${crd.project_overview}</p>
            </div>

            <!-- Goals -->
            <div style="background: #1a1a1a; border-left: 3px solid #4ecdc4; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <p style="color: #4ecdc4; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 12px;">Goals & Objectives</p>
                <p style="color: #f0ede6; font-size: 15px; line-height: 1.7; margin: 0;">${crd.goals_objectives}</p>
            </div>

            <!-- Features Required -->
            <div style="background: #1a1a1a; border-left: 3px solid #ff6b6b; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <p style="color: #ff6b6b; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 12px;">Features Required</p>
                <ul style="color: #f0ede6; font-size: 15px; line-height: 2; margin: 0; padding-left: 20px;">
                    ${featuresHTML}
                </ul>
            </div>

            <!-- Functional Requirements -->
            <div style="background: #1a1a1a; border-left: 3px solid #a78bfa; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <p style="color: #a78bfa; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 16px;">Functional Requirements</p>

                <p style="color: #a09d96; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px;">Authentication</p>
                <p style="color: #f0ede6; font-size: 14px; margin: 0 0 16px;">${crd.functional_requirements.authentication}</p>

                <p style="color: #a09d96; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px;">Core Features</p>
                <ul style="color: #f0ede6; font-size: 14px; line-height: 2; margin: 0 0 16px; padding-left: 20px;">
                    ${coreHTML}
                </ul>

                <p style="color: #a09d96; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px;">Admin Features</p>
                <ul style="color: #f0ede6; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
                    ${adminHTML}
                </ul>
            </div>

            <!-- Timeline & Budget -->
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                <div style="flex: 1; background: #1a1a1a; border-left: 3px solid #e8c547; border-radius: 8px; padding: 24px;">
                    <p style="color: #e8c547; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">Timeline</p>
                    <p style="color: #f0ede6; font-size: 15px; margin: 0;">${crd.timeline}</p>
                </div>
                <div style="flex: 1; background: #1a1a1a; border-left: 3px solid #4ecdc4; border-radius: 8px; padding: 24px;">
                    <p style="color: #4ecdc4; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">Budget</p>
                    <p style="color: #f0ede6; font-size: 22px; font-weight: 700; margin: 0;">${crd.budget}</p>
                </div>
            </div>

            <!-- Additional Notes -->
            <div style="background: #1a1a1a; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <p style="color: #a09d96; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">Additional Notes</p>
                <p style="color: #f0ede6; font-size: 14px; line-height: 1.7; margin: 0;">${crd.additional_notes}</p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; border-top: 1px solid #2a2a2a; padding-top: 32px;">
                <p style="color: #e8c547; font-size: 18px; font-weight: 700; margin: 0 0 8px;">Ameego Labs</p>
                <p style="color: #a09d96; font-size: 13px; margin: 0 0 4px;">📞 +91 7007 901 057</p>
                <p style="color: #a09d96; font-size: 13px; margin: 0;">✉️ hello@ameegolabs.com</p>
            </div>

        </div>
    </div>
    `;

    return html;
};

export const sendCRDEmail=async(userEmail,crd)=>{
try{
    const html=buildCRDEmail(userEmail,crd);
    await sendEmail({ to: userEmail, subject: "Your CRD - Ameego Labs", html });  

}
catch(error){
console.error(`some thing went wrong ${error}`)
}
};

export const buildFollowUpEmail = (userEmail, sessionId) => {
    return `
    <div style="font-family: 'Georgia', serif; max-width: 680px; margin: 0 auto; background: #0f0f0f; color: #f0ede6; border-radius: 12px; overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #1a1a2e, #16213e); padding: 48px 40px; text-align: center; border-bottom: 2px solid #e8c547;">
            <p style="color: #e8c547; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; margin: 0 0 12px;">Ameego Labs</p>
            <h1 style="color: #f0ede6; font-size: 28px; margin: 0 0 8px;">Ready to Build Your Project?</h1>
            <p style="color: #a09d96; font-size: 14px; margin: 0;">You received your CRD yesterday. Let's take the next step!</p>
        </div>

        <div style="padding: 40px; text-align: center;">
            <p style="color: #f0ede6; font-size: 16px; line-height: 1.7; margin: 0 0 32px;">
                Hey! You received your project blueprint from Ameego Labs.<br/>
                Our team is ready to turn it into reality. 🚀
            </p>

            <a href="http://localhost:5000/api/ai/wizard/acknowledge/${sessionId}" 
               style="background: #e8c547; color: #0f0f0f; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 700;">
                Yes, I'm Interested!
            </a>

            <div style="margin-top: 48px; border-top: 1px solid #2a2a2a; padding-top: 32px;">
                <p style="color: #e8c547; font-size: 18px; font-weight: 700; margin: 0 0 8px;">Ameego Labs</p>
                <p style="color: #a09d96; font-size: 13px; margin: 0 0 4px;">📞 +91 7007 901 057</p>
                <p style="color: #a09d96; font-size: 13px; margin: 0;">✉️ hello@ameegolabs.com</p>
            </div>
        </div>
    </div>
    `;
};

export const sendFollowUpEmail = async (userEmail, sessionId) => {
    try {
        const html = buildFollowUpEmail(userEmail, sessionId);
        await sendEmail({
            to: userEmail,
            subject: "Ready to build your project? — Ameego Labs",
            html
        });
    } catch (error) {
        console.error(`Follow-up email failed: ${error.message}`);
    }
};