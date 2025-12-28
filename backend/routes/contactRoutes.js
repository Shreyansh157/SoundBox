const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Setup Ethereal Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email, eventType, message } = req.body;

  try {
    const ownerMailOptions = {
      from: '"SoundBox Website" <website@soundbox.com>',
      to: "owner@soundbox.com",
      subject: `📩 New Contact: ${eventType}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage:\n${message}`,
    };

    const userMailOptions = {
      from: '"SoundBox Team" <support@soundbox.com>',
      to: email,
      subject: "We received your message",
      text: `Hi ${firstName},\n\nThanks for contacting us. We will get back to you soon.\n\n- SoundBox Team`,
    };

    const infoOwner = await transporter.sendMail(ownerMailOptions);
    const infoUser = await transporter.sendMail(userMailOptions);

    console.log("---------------------------------------");
    console.log("📧 Ethereal Contact Emails Sent!");
    console.log("👉 Preview Owner Email: " + nodemailer.getTestMessageUrl(infoOwner));
    console.log("👉 Preview User Email: " + nodemailer.getTestMessageUrl(infoUser));
    console.log("---------------------------------------");

    res.status(200).json({ message: "Message sent!" });
  } catch (err) {
    console.error("Contact Email Error:", err);
    res.status(500).json({ message: "Failed to send", error: err.message });
  }
});

module.exports = router;
