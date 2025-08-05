// services/emailService.js
const sendEmail = async (to, subject, message) => {
  // This simulates sending email (replace with nodemailer if needed)
  console.log(`📧 Sending email to ${to} | Subject: ${subject}`);
  console.log(`Message: ${message}`);
  // Simulate logging result
  return { status: 'sent', to, subject, message };
};

module.exports = { sendEmail };
