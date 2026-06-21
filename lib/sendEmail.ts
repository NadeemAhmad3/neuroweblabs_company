import nodemailer from "nodemailer";
import { generateOfferLetterPDF } from "./generatePDF";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // e.g., neuroweblabs@gmail.com
    pass: process.env.EMAIL_PASS, // App password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

interface SendApplicationEmailProps {
  to: string;
  firstName: string;
  lastName: string;
  trackName: string;
  selectedTier: string;
  applicationId?: string; // Optional for compatibility
}

export async function sendApplicationEmail({
  to,
  firstName,
  lastName,
  trackName,
  selectedTier,
}: SendApplicationEmailProps) {
  const isPremium = selectedTier === "premium";

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Received - NeuroWebLabs</title>
    <style>
      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: #FAFAFA;
        margin: 0;
        padding: 0;
        color: #0F172A;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border: 1px solid #E5E7EB;
        border-radius: 12px;
        overflow: hidden;
      }
      .header {
        background-color: #0F172A;
        padding: 30px 40px;
        text-align: center;
      }
      .logo {
        color: #FAFAFA;
        font-size: 24px;
        font-weight: 800;
        margin: 0;
        letter-spacing: -0.5px;
      }
      .logo span {
        color: #059669;
      }
      .content {
        padding: 40px;
      }
      .greeting {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .text {
        font-size: 16px;
        line-height: 1.6;
        color: #475569;
        margin-bottom: 24px;
      }
      .details-box {
        background-color: #FAFAFA;
        border: 1px solid #E5E7EB;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 24px;
      }
      .details-row {
        margin-bottom: 12px;
      }
      .details-row:last-child {
        margin-bottom: 0;
      }
      .details-label {
        font-weight: 600;
        color: #0F172A;
      }
      .premium-notice {
        background-color: rgba(5, 150, 105, 0.1);
        border: 1px solid rgba(5, 150, 105, 0.3);
        border-left: 4px solid #059669;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 24px;
      }
      .premium-notice-title {
        color: #059669;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 8px;
      }
      .footer {
        text-align: center;
        padding: 30px;
        background-color: #FAFAFA;
        border-top: 1px solid #E5E7EB;
        font-size: 14px;
        color: #475569;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="logo">NeuroWebLabs<span>.</span></h1>
      </div>
      <div class="content">
        <div class="greeting">Hello ${firstName} ${lastName},</div>
        <p class="text">
          Thank you for applying to the <strong>${trackName}</strong>. We have successfully received your application.
        </p>
        
        <div class="details-box">
          <div class="details-row">
            <span class="details-label">Track:</span> ${trackName}
          </div>
          <div class="details-row">
            <span class="details-label">Selected Tier:</span> ${isPremium ? 'Pro Experience' : 'Standard (Free)'}
          </div>
        </div>

        ${isPremium ? `
        <div class="premium-notice">
          <h3 class="premium-notice-title">Action Required if Selected</h3>
          <p style="margin: 0; color: #0F172A; line-height: 1.5; font-size: 15px;">
            Since you selected the Pro Experience tier, please be aware that <strong>if your application is selected</strong>, you will receive an acceptance email with payment details. You will need to submit a screenshot of your payment within <strong>3 days</strong> of receiving that email to secure your spot and gain access to your account.
          </p>
        </div>
        ` : ''}

        <p class="text">
          Our team is currently reviewing applications. We will get back to you soon regarding the next steps in the selection process.
        </p>
        <p class="text" style="margin-bottom: 0;">
          Best regards,<br>
          <strong>The NeuroWebLabs Engineering Team</strong>
        </p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} NeuroWebLabs. All rights reserved.<br>
        contact@neuroweblabs.com
      </div>
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: '"NeuroWebLabs" <neuroweblabs@gmail.com>', // Sender address
    to, // Recipient email
    subject: `Application Received: ${trackName} at NeuroWebLabs`,
    html: emailHtml,
  });
}

export async function sendAcceptanceEmail({
  to,
  firstName,
  lastName,
  trackName,
  selectedTier,
  applicationId,
}: SendApplicationEmailProps) {
  const isPremium = selectedTier === "premium";

  let pdfBuffer: Buffer | null = null;
  if (applicationId) {
    try {
      pdfBuffer = await generateOfferLetterPDF({
        firstName,
        lastName,
        trackName,
        applicationId,
      });
    } catch (e) {
      console.error("Failed to generate PDF offer letter:", e);
    }
  }

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Congratulations! You are selected - NeuroWebLabs</title>
    <style>
      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: #FAFAFA;
        margin: 0;
        padding: 0;
        color: #0F172A;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border: 1px solid #E5E7EB;
        border-radius: 12px;
        overflow: hidden;
      }
      .header {
        background-color: #0F172A;
        padding: 30px 40px;
        text-align: center;
      }
      .logo {
        color: #FAFAFA;
        font-size: 24px;
        font-weight: 800;
        margin: 0;
        letter-spacing: -0.5px;
      }
      .logo span {
        color: #059669;
      }
      .content {
        padding: 40px;
      }
      .greeting {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 20px;
        color: #059669;
      }
      .text {
        font-size: 16px;
        line-height: 1.6;
        color: #475569;
        margin-bottom: 24px;
      }
      .premium-notice {
        background-color: #FEF2F2;
        border: 1px solid #FECACA;
        border-left: 4px solid #DC2626;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 24px;
      }
      .premium-notice-title {
        color: #DC2626;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 12px;
      }
      .footer {
        text-align: center;
        padding: 30px;
        background-color: #FAFAFA;
        border-top: 1px solid #E5E7EB;
        font-size: 14px;
        color: #475569;
      }
      .btn {
        display: inline-block;
        padding: 12px 24px;
        background-color: #059669;
        color: white;
        text-decoration: none;
        font-weight: bold;
        border-radius: 8px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="logo">NeuroWebLabs<span>.</span></h1>
      </div>
      <div class="content">
        <div class="greeting">Congratulations, ${firstName}!</div>
        <p class="text">
          We are thrilled to inform you that you have been successfully selected for the <strong>${trackName}</strong> internship program at NeuroWebLabs!
        </p>

        ${isPremium ? `
        <div class="premium-notice">
          <h3 class="premium-notice-title">Action Required: Complete Your Registration</h3>
          <p style="margin: 0; color: #0F172A; line-height: 1.6; font-size: 15px;">
            Since you applied for the <strong>Pro Experience</strong> tier, you are required to make the tier payment within the next <strong>3 days</strong> to secure your spot.
            <br><br>
            <strong>Payment Method:</strong> EasyPaisa<br>
            <strong>Account Number:</strong> 03117133585
            <br><br>
            <em>Please send the payment screenshot to us. Failure to complete this step will result in your automatic transfer to the Standard (Free) tier.</em>
          </p>
        </div>
        ` : `
        <p class="text">
          As a Standard Tier applicant, no further payment is required. We will follow up shortly with your onboarding details.
        </p>
        `}

        <p class="text">
          We are excited to have you join us and look forward to building amazing things together. Please find your official offer letter attached to this email.
        </p>
        <p class="text" style="margin-bottom: 0;">
          Best regards,<br>
          <strong>The NeuroWebLabs Engineering Team</strong>
        </p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} NeuroWebLabs. All rights reserved.<br>
        contact@neuroweblabs.com
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions: nodemailer.SendMailOptions = {
    from: '"NeuroWebLabs" <neuroweblabs@gmail.com>',
    to,
    subject: `Congratulations! You are selected at NeuroWebLabs!`,
    html: emailHtml,
  };

  if (pdfBuffer) {
    mailOptions.attachments = [
      {
        filename: `Offer_Letter_${firstName}_${lastName}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ];
  }

  await transporter.sendMail(mailOptions);
}
