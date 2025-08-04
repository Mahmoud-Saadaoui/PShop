import nodemailer from "nodemailer";

export const sendEmail = async (userEmail, subject, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL_ADDRESS,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
      // ⛔ Don't use it in production
      tls: {
        rejectUnauthorized: false, 
      },
    });

    const mailOptions = {
      from: process.env.APP_EMAIL_ADDRESS,
      to: userEmail,
      subject,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent:", info.response);
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw new Error("Internal Server Error (nodemailer)");
  }
};
