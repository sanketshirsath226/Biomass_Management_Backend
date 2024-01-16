const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS,
    },
});

const sendEmail = async (options) => {

    const msg = {
        to: options.email,
        from: "2018.sanketshirsath@gmail.com",
        // text : options.data.message,
        html : htmlTemplate(options.data.reset_url)
    }
    transporter.sendMail(msg).then(() => {
        console.log('Email Sent')
    }).catch((error) => {
        console.error(error)
    });
};

const htmlTemplate = (text) => {
    return `
    <!DOCTYPE html>
    <html lang="html">
      <head>
        <meta charset="utf-8">
        <title>NodeMailer Email Template</title>
        <style>
          .container {
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .email-header {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
          }
          .email-footer {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
        </style>
      </head>
           <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <h1>Your Verification Code</h1>
            </div>
            <div class="email-body">
              <p>Your one-time password (OTP) is:</p>
              <h2>${text}</h2>
              <p>Please enter this code to verify your account.</p>
            </div>
            <div class="email-footer">
              <p>If you didn't request this code, please disregard this email.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = sendEmail