import nodemailer from "nodemailer";
import { generateOfferLetterPDF } from "./generatePDF";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS — more widely trusted than direct TLS on 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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

  // ── Plain-text version (required to avoid spam classification) ──────────
  const emailText = `Hi ${firstName},

We have received your application for the ${trackName} internship at NeuroWebLabs.

Our team is currently reviewing submissions and will contact you with the next steps within a few business days.

If you have any questions in the meantime, feel free to reply to this email.

Kind regards,
The NeuroWebLabs Team
contact@neuroweblabs.com
https://neuroweblabs.com`;

  // ── HTML version — inline styles only (no <style> blocks) ───────────────
  const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Application Received</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0f172a;padding:28px 40px;text-align:center;">
              <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">NeuroWeb<span style="color:#059669;">Labs</span></span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#0f172a;">Hi ${firstName},</p>

              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#475569;">
                Thank you for applying for the <strong style="color:#0f172a;">${trackName}</strong> internship at NeuroWebLabs. We have successfully received your application.
              </p>

              <!-- Info box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td style="background-color:#f8fafc;border-left:3px solid #059669;border-radius:4px;padding:16px 20px;">
                    <p style="margin:0;font-size:14px;color:#64748b;font-weight:500;">Program applied for</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#0f172a;font-weight:600;">${trackName}</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#475569;">
                Our team is currently reviewing submissions and will contact you regarding the next steps within a few business days.
              </p>

              <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#475569;">
                If you have any questions, you can reply directly to this email.
              </p>

              <p style="margin:32px 0 0;font-size:15px;color:#475569;">
                Kind regards,<br />
                <strong style="color:#0f172a;">The NeuroWebLabs Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#94a3b8;">
                &copy; ${new Date().getFullYear()} NeuroWebLabs &bull; contact@neuroweblabs.com
              </p>
              <p style="margin:6px 0 0;font-size:12px;color:#cbd5e1;">
                You are receiving this email because you submitted an internship application on our website.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: `"NeuroWebLabs" <${process.env.EMAIL_USER}>`,
    replyTo: `"NeuroWebLabs" <${process.env.EMAIL_USER}>`,
    to,
    subject: `We received your application for ${trackName} – NeuroWebLabs`,
    text: emailText,
    html: emailHtml,
    headers: {
      "X-Mailer": "NeuroWebLabs Mailer",
      Precedence: "bulk",
    },
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

  // ── Plain-text version ───────────────────────────────────────────────────
  const emailText = `Hi ${firstName},

We are pleased to inform you that your application for the ${trackName} internship at NeuroWebLabs has been accepted.

Your official offer letter is attached to this email as a PDF. Please review it and retain it for your records.

We will follow up shortly with onboarding details and your start date.

If you have any questions, please reply to this email and we will be happy to help.

Kind regards,
The NeuroWebLabs Team
contact@neuroweblabs.com
https://neuroweblabs.com`;

  // ── HTML version ─────────────────────────────────────────────────────────
  const emailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Internship Offer – NeuroWebLabs</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0f172a;padding:28px 40px;text-align:center;">
              <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">NeuroWeb<span style="color:#059669;">Labs</span></span>
            </td>
          </tr>

          <!-- Green accent bar -->
          <tr>
            <td style="background-color:#059669;padding:14px 40px;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#ffffff;letter-spacing:0.5px;text-transform:uppercase;">Internship Offer Confirmation</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#0f172a;">Hi ${firstName},</p>

              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#475569;">
                We are pleased to inform you that your application for the <strong style="color:#0f172a;">${trackName}</strong> internship at NeuroWebLabs has been accepted.
              </p>

              <!-- Info box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td style="background-color:#f0fdf4;border-left:3px solid #059669;border-radius:4px;padding:16px 20px;">
                    <p style="margin:0;font-size:14px;color:#64748b;font-weight:500;">You have been accepted for</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#0f172a;font-weight:600;">${trackName} – NeuroWebLabs Internship</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#475569;">
                Your official offer letter is attached to this email as a PDF. Please review it and keep it for your records.
              </p>

              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#475569;">
                We will follow up shortly with your onboarding information and start date. If you have any questions before then, feel free to reply directly to this email.
              </p>

              <p style="margin:32px 0 0;font-size:15px;color:#475569;">
                Kind regards,<br />
                <strong style="color:#0f172a;">The NeuroWebLabs Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#94a3b8;">
                &copy; ${new Date().getFullYear()} NeuroWebLabs &bull; contact@neuroweblabs.com
              </p>
              <p style="margin:6px 0 0;font-size:12px;color:#cbd5e1;">
                You are receiving this email because you applied for an internship at NeuroWebLabs.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"NeuroWebLabs" <${process.env.EMAIL_USER}>`,
    replyTo: `"NeuroWebLabs" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Your internship offer from NeuroWebLabs – ${trackName}`,
    text: emailText,
    html: emailHtml,
    headers: {
      "X-Mailer": "NeuroWebLabs Mailer",
      Precedence: "bulk",
    },
  };

  if (pdfBuffer) {
    mailOptions.attachments = [
      {
        filename: `Offer_Letter_${firstName}_${lastName}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ];
  }

  await transporter.sendMail(mailOptions);
}
