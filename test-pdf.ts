const { generateOfferLetterPDF } = require("./lib/generatePDF.ts");

async function test() {
  try {
    const buf = await generateOfferLetterPDF({
      firstName: "Test",
      lastName: "User",
      trackName: "Frontend",
      applicationId: "1234567890",
    });
    console.log("PDF BUF SIZE:", buf.length);
  } catch (err) {
    console.error("ERROR:", err);
  }
}
test();