const nodemailer = require("nodemailer");
const { transporter } = require("../config/nodeMailer");
const dotenv = require("dotenv").config();

async function sendMail(toEmail, subject, name, token) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.USER_NAME, // sender address
    to: toEmail, // list of receivers
    subject: subject, // Subject line
    html: `<h1>Forgot Password</h1>
    <p>Hello ${name},  </p>
    <br/>
    You are receiving this email because you have requested the reset of a password
    <a href='${process.env.FRONTEND_DOMAIN}/update-password/${token}'>Click here to update password</a>`,
  });

  return info.messageId;
}

module.exports = { sendMail };
