import WizardSession from '../models/wizardSession.model.js';
import { generateCRD } from '../services/questionWizard.service.js';
import { sendCRDEmail, sendFollowUpEmail } from '../services/emailService.js';

export const sendCRDController = async (req, res, next) => {
    try {
        const { sessionId, userEmail } = req.body;
        const session = await WizardSession.findOne({ sessionId });
        if (!session) return res.status(404).json({ error: "Session not found" });
        const crd = await generateCRD(sessionId);
        session.crd = crd;
        session.userEmail = userEmail;
        await session.save();
        await sendCRDEmail(userEmail, crd);
        setTimeout(async () => {
            const freshSession = await WizardSession.findOne({ sessionId });
            if (!freshSession.acknowledged) {
                await sendFollowUpEmail(userEmail, sessionId);
            }
        }, process.env.FOLLOWUP_DELAY_MS);
        res.json({ success: true, message: "CRD emailed successfully!" });

    } catch (error) {
        next(error);
    }
};

export const acknowledgeController = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    const session = await WizardSession.findOne({ sessionId });
    if (!session) return res.status(404).json({ error: "Session not found" });
    
    session.acknowledged = true;
    await session.save();
    
    // Return a nice HTML thank you page
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Thank You - Ameego Labs</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #0f0f0f, #1a1a2e);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f0ede6;
          }
          .container {
            text-align: center;
            background: rgba(26, 26, 46, 0.8);
            padding: 60px 40px;
            border-radius: 12px;
            border: 2px solid #e8c547;
            max-width: 500px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          }
          h1 {
            font-size: 32px;
            margin-bottom: 16px;
            color: #e8c547;
          }
          .checkmark {
            font-size: 60px;
            margin-bottom: 24px;
          }
          p {
            font-size: 16px;
            line-height: 1.7;
            color: #a09d96;
            margin-bottom: 12px;
          }
          .footer {
            margin-top: 40px;
            border-top: 1px solid #2a2a2a;
            padding-top: 24px;
            font-size: 13px;
          }
          .footer strong {
            color: #e8c547;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="checkmark">✅</div>
          <h1>Thank You!</h1>
          <p>We've received your interest. 🚀</p>
          <p>Our team at Ameego Labs will reach out within 24 hours to discuss your project in detail.</p>
          <div class="footer">
            <p><strong>Ameego Labs</strong></p>
            <p>📞 +91 7007 901 057</p>
            <p>✉️ hello@ameegolabs.com</p>
          </div>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    next(error);
  }
};