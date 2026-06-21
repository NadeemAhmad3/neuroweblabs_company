import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function generateOfferLetterPDF({
  firstName,
  lastName,
  trackName,
  applicationId,
}: {
  firstName: string;
  lastName: string;
  trackName: string;
  applicationId: string;
}): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 0, size: "A4" });
      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // ─── COLOR PALETTE (unchanged) ────────────────────────────────────────────
      const navy      = "#0F172A";
      const emerald   = "#059669";
      const slate     = "#475569";
      const lightGray = "#E5E7EB";
      const bodyText  = "#1E293B";

      // Page geometry
      const PW = 595.28;
      const PH = 841.89;
      const ML = 58;           // left margin
      const MR = 58;           // right margin
      const CW = PW - ML - MR; // content width ≈ 479

      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const refId = `NWL-${applicationId.slice(-6).toUpperCase()}`;

      // ─── WHITE PAGE ───────────────────────────────────────────────────────────
      doc.rect(0, 0, PW, PH).fill("#FFFFFF");

      // ─── HEADER BAND ─────────────────────────────────────────────────────────
      doc.rect(0, 0, PW, 88).fill(navy);
      // Left emerald accent strip
      doc.rect(0, 0, 4, 88).fill(emerald);
      // Bottom emerald rule
      doc.rect(0, 86, PW, 2.5).fill(emerald);

      // Logo
      doc.font("Helvetica-Bold").fontSize(23).fillColor("#FFFFFF")
         .text("NeuroWeb", ML, 27, { continued: true });
      doc.font("Helvetica-Bold").fontSize(23).fillColor(emerald)
         .text("Labs", { continued: true });
      doc.font("Helvetica-Bold").fontSize(23).fillColor("#FFFFFF").text(".");

      // Tagline
      doc.font("Helvetica").fontSize(8).fillColor("#FFFFFF")
         .text("Pioneering Tomorrow's Solutions", ML, 55, { characterSpacing: 0.3 });

      // Ref & date — top-right
      doc.font("Helvetica").fontSize(8).fillColor("#FFFFFF")
         .text(`Ref: ${refId}`, 0, 30, { align: "right", width: PW - MR })
         .text(`Date: ${currentDate}`, 0, 44, { align: "right", width: PW - MR });

      // ─── DOCUMENT TITLE ───────────────────────────────────────────────────────
      let y = 108;
      doc.font("Helvetica-Bold").fontSize(13).fillColor(navy)
         .text("INTERNSHIP OFFER LETTER", ML, y, { width: CW, align: "center" });

      y = doc.y + 4;
      // Thin centered rule
      const ruleW = 120;
      doc.moveTo((PW - ruleW) / 2, y)
         .lineTo((PW + ruleW) / 2, y)
         .lineWidth(1.5)
         .strokeColor(emerald)
         .stroke();
      y += 14;

      // ─── SUBJECT LINE ─────────────────────────────────────────────────────────
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(emerald)
         .text("Subject: ", ML, y, { continued: true });
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(navy)
         .text(`Offer of Internship — ${trackName} Track`);
      y = doc.y + 14;

      // ─── SALUTATION ──────────────────────────────────────────────────────────
      doc.font("Helvetica").fontSize(10.5).fillColor(bodyText)
         .text(`Dear ${firstName} ${lastName},`, ML, y);
      y = doc.y + 12;

      // ─── BODY HELPER ─────────────────────────────────────────────────────────
      const para = (text: string, extraGap = 12) => {
        doc.font("Helvetica").fontSize(10.5).fillColor(bodyText)
           .text(text, ML, y, { width: CW, align: "justify", lineGap: 3.5 });
        y = doc.y + extraGap;
      };

      // ─── PARAGRAPH 1 ─────────────────────────────────────────────────────────
      para(
        `We are pleased to inform you that, following a thorough review of your application ` +
        `and interview, NeuroWebLabs is delighted to offer you a position as an intern in our ` +
        `${trackName} program. Your profile stood out for its technical aptitude and the ` +
        `enthusiasm you demonstrated throughout our selection process.`
      );

      // ─── PARAGRAPH 2 ─────────────────────────────────────────────────────────
      para(
        `During this internship you will work alongside experienced professionals on ` +
        `cutting-edge projects in a collaborative and growth-focused environment. ` +
        `We are confident that this experience will be both professionally and personally ` +
        `rewarding for you.`
      );

      // ─── TERMS — plain numbered prose (no box, no card) ──────────────────────
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(navy)
         .text("Terms and Conditions:", ML, y);
      y = doc.y + 8;

      const terms = [
        "This offer is conditional upon the successful completion of all onboarding formalities.",
        "You are expected to adhere to the agreed working hours and actively participate in all team meetings and reviews.",
        "All intellectual property created during the course of this internship remains the sole property of NeuroWebLabs.",
        "You are required to keep all proprietary, technical, and business information strictly confidential, both during and following your internship tenure.",
      ];

      terms.forEach((term, i) => {
        doc.font("Helvetica").fontSize(10.5).fillColor(bodyText)
           .text(`${i + 1}.  ${term}`, ML + 10, y, {
             width: CW - 10,
             align: "justify",
             lineGap: 3,
           });
        y = doc.y + 7;
      });

      y += 5;

      // ─── CLOSING PARAGRAPH ───────────────────────────────────────────────────
      para(
        `We truly look forward to welcoming you to the NeuroWebLabs family. Please regard ` +
        `this letter as your formal confirmation of internship placement. Should you have ` +
        `any questions, feel free to reach out to us at any time.`
      );

      // ─── SIGN-OFF ─────────────────────────────────────────────────────────────
      doc.font("Helvetica").fontSize(10.5).fillColor(bodyText)
         .text("Yours sincerely,", ML, y);
      y = doc.y + 10;

      // ─── SIGNATURE IMAGE (sign.png — backgroundless) ─────────────────────────
      const signPaths = [
        path.resolve("sign.png"),
        path.resolve("public/sign.png"),
        path.resolve("assets/sign.png"),
        path.resolve("src/assets/sign.png"),
        path.resolve("uploads/sign.png"),
        path.resolve(process.cwd(), "sign.png"),
      ];

      let signLoaded = false;
      for (const sp of signPaths) {
        if (fs.existsSync(sp)) {
          try {
            doc.image(sp, ML, y, { width: 115, height: 48 });
            signLoaded = true;
            break;
          } catch (_) {
            // try next path
          }
        }
      }
      // If not found, an empty space is preserved for the signature
      const sigBlockH = signLoaded ? 50 : 50;

      // ─── OFFICIAL STAMP — right-aligned with signature block ─────────────────
      const stampR  = 36;
      const stampCX = PW - MR - stampR - 4;
      const stampCY = y + stampR + 2;

      // Outer circle
      doc.save()
         .circle(stampCX, stampCY, stampR)
         .lineWidth(2)
         .strokeColor(navy)
         .stroke();

      // Inner circle
      doc.circle(stampCX, stampCY, stampR - 6)
         .lineWidth(0.6)
         .strokeColor(emerald)
         .stroke();

      // "NWL" in centre
      doc.font("Helvetica-Bold").fontSize(14).fillColor(navy)
         .text("NWL", stampCX - 15, stampCY - 9);

      // Top arc text — "NEUROWEB LABS"
      const topLabel = "NEUROWEB LABS";
      const topRadius = stampR - 10;
      const topStart  = (-Math.PI * 0.88);
      const topSpan   = (Math.PI * 0.76);
      topLabel.split("").forEach((ch, i) => {
        const t   = i / (topLabel.length - 1);
        const ang = topStart + t * topSpan;
        const chX = stampCX + topRadius * Math.cos(ang);
        const chY = stampCY + topRadius * Math.sin(ang);
        const rot = (ang + Math.PI / 2) * (180 / Math.PI);
        doc.save()
           .translate(chX, chY)
           .rotate(rot)
           .font("Helvetica-Bold")
           .fontSize(5.5)
           .fillColor(navy)
           .text(ch, -2, -3)
           .restore();
      });

      // Bottom arc text — "OFFICIAL SEAL"
      const btmLabel  = "OFFICIAL SEAL";
      const btmRadius = stampR - 10;
      const btmStart  = (Math.PI * 0.12);
      const btmSpan   = (Math.PI * 0.76);
      btmLabel.split("").forEach((ch, i) => {
        const t   = i / (btmLabel.length - 1);
        const ang = btmStart + t * btmSpan;
        const chX = stampCX + btmRadius * Math.cos(ang);
        const chY = stampCY + btmRadius * Math.sin(ang);
        const rot = (ang - Math.PI / 2) * (180 / Math.PI);
        doc.save()
           .translate(chX, chY)
           .rotate(rot)
           .font("Helvetica-Bold")
           .fontSize(5.5)
           .fillColor(navy)
           .text(ch, -2, -3)
           .restore();
      });

      // Two small dots as dividers at 3 o'clock and 9 o'clock positions
      doc.circle(stampCX - topRadius, stampCY, 1.5).fill(emerald);
      doc.circle(stampCX + topRadius, stampCY, 1.5).fill(emerald);

      doc.restore();

      // ─── SIGNATORY DETAILS (below signature image) ───────────────────────────
      const nameY = y + sigBlockH + 4;
      doc.font("Helvetica-Bold").fontSize(10.5).fillColor(navy)
         .text("Nadeem Ahmad", ML, nameY);
      doc.font("Helvetica").fontSize(9.5).fillColor(slate)
         .text("Founder & Chief Executive Officer, NeuroWebLabs", ML, doc.y + 2);

      // ─── DIGITAL ACCEPTANCE BLOCK ────────────────────────────────────────────
      const accY = doc.y + 35; // Minimal gap below signatory details

      // Thin rule above digital acceptance
      doc.moveTo(ML, accY).lineTo(PW - MR, accY)
         .lineWidth(0.5).strokeColor(lightGray).stroke();

      doc.font("Helvetica-Bold").fontSize(9.5).fillColor(emerald)
         .text("Digital Offer Acceptance", ML, accY + 12);

      doc.font("Helvetica").fontSize(9).fillColor(slate)
         .text(
           `This document has been electronically generated and officially authorised. Your acceptance of this internship offer is securely recorded through the NeuroWebLabs digital portal. No physical signature is required.`,
           ML, doc.y + 4, { width: CW, lineGap: 2.5 }
         );

      // ─── FOOTER ──────────────────────────────────────────────────────────────
      const FY = doc.y + 35; // Positioned closely below the ending text to remove the massive gap
      
      // Draw a footer that fills up to the bottom of the page seamlessly
      doc.rect(0, FY, PW, PH - FY).fill(navy);
      doc.rect(0, FY, PW, 1.5).fill(emerald);

      doc.font("Helvetica-Oblique").fontSize(8).fillColor("#FFFFFF")
         .text(
           "Confidentiality Notice: This letter is intended solely for the named recipient. " +
           "Unauthorised distribution, copying, or disclosure is strictly prohibited.",
           ML, FY + 16, { width: CW, align: "center", lineGap: 2 }
         );

      doc.font("Helvetica-Bold").fontSize(8).fillColor("#FFFFFF")
         .text(
           "NeuroWebLabs  •  neuroweblabs@gmail.com  •  www.neuroweblabs.com",
           ML, doc.y + 12, { width: CW, align: "center" }
         );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}