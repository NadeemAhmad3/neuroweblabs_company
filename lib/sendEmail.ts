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
  applicationId?: string;
}

export async function sendApplicationEmail({
  to,
  firstName,
  lastName,
  trackName,
}: SendApplicationEmailProps) {
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
        </div>

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

  const emailText = `Hello ${firstName} ${lastName},

Thank you for applying to the ${trackName} at NeuroWebLabs. We have successfully received your application.

Our team is currently reviewing applications. We will get back to you soon regarding the next steps in the selection process.

Best regards,
The NeuroWebLabs Engineering Team

contact@neuroweblabs.com`;

  await transporter.sendMail({
    from: '"NeuroWebLabs" <neuroweblabs@gmail.com>',
    to,
    subject: `Application Received: ${trackName} at NeuroWebLabs`,
    text: emailText,
    html: emailHtml,
  });
}

export async function sendAcceptanceEmail({
  to,
  firstName,
  lastName,
  trackName,
  applicationId,
}: SendApplicationEmailProps) {
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
        <div class="greeting">Congratulations, ${firstName}!</div>
        <p class="text">
          We are thrilled to inform you that you have been successfully selected for the <strong>${trackName}</strong> internship program at NeuroWebLabs!
        </p>

        <p class="text">
          We are excited to have you join us and look forward to building amazing things together. Please find your official offer letter attached to this email. We will follow up shortly with your onboarding details.
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

  const emailText = `Congratulations, ${firstName}!

We are thrilled to inform you that you have been successfully selected for the ${trackName} internship program at NeuroWebLabs!

We are excited to have you join us and look forward to building amazing things together. Please find your official offer letter attached to this email. We will follow up shortly with your onboarding details.

Best regards,
The NeuroWebLabs Engineering Team

contact@neuroweblabs.com`;

  const mailOptions: nodemailer.SendMailOptions = {
    from: '"NeuroWebLabs" <neuroweblabs@gmail.com>',
    to,
    subject: `Congratulations! You are selected at NeuroWebLabs!`,
    text: emailText,
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
