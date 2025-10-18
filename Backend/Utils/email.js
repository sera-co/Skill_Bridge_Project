import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendWelcomeEmail = async (to, name) => {
  if (!process.env.EMAIL_USER) return; 
  const mailOptions = {
    from: `"SkillBridge" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to SkillBridge!",
    text: `Hi ${name},\n\nWelcome to SkillBridge! We're excited to help you build your learning path.\n\n— SkillBridge Team`
  };
  return transporter.sendMail(mailOptions);
};

export default sendWelcomeEmail;
