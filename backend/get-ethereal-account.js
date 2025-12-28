const nodemailer = require("nodemailer");

async function createTestAccount() {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log("------------------------------------------------");
    console.log("✨ Ethereal Account Created! Update your .env file:");
    console.log(`EMAIL_USER=${testAccount.user}`);
    console.log(`EMAIL_PASS=${testAccount.pass}`);
    console.log("------------------------------------------------");
  } catch (err) {
    console.error("Error creating account:", err);
  }
}

createTestAccount();
