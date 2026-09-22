const transporter = require('../Config/emailConfig');
const emailverifymodel = require('../Module/userAuth/model/otp.Model');


const sendmailverificationotp = async (req, user) => {

    const otp = Math.floor(1000 + Math.random() * 9000);
    const gg = await emailverifymodel({
        userid: user._id,
        otp: otp
    }).save()

    await transporter.sendMail({
        from:`Upskilling ${process.env.EMAIL_FROM}`,
        to: user.email,
        subject: "OTP - Verify your account",
        html: `<p>Dear ${user.name},</p><p>Thank you for signing up with our website. To complete your registration, please verify your email address by entering the following one-time password (OTP)</p>
        <h2>OTP: ${otp}</h2>
        <p>This OTP is valid for 15 minutes. If you didn't request this OTP, please ignore this email.</p>`
    })

    return otp;
}

module.exports = sendmailverificationotp;