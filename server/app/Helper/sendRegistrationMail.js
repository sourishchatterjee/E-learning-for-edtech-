const transporter = require('../Config/emailConfig');


async function sendRegistrationMail(user, verificationLink) {
  try {
    await transporter.sendMail({
      from: `Upskilling ${process.env.EMAIL_FROM}`,
      to: user.email,
      subject: 'Verify your email address',
      html: `
        <p>Dear ${user.name},</p>
        <p>Thank you for registering on the Upskilling E-Learning Platform.</p>
        <p>Please click the link below to verify your email address:</p>
        <p><a href="${verificationLink}">Verify your email</a></p>
        <p>If you didn't register, please ignore this email.</p>
        <p>Best regards,<br>The Upskilling Team</p>
      `,
    });
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send verification email');
  }
}

module.exports = {sendRegistrationMail};