"use strict";
const nodemailer = require("nodemailer");
let config = require("../js/config")

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.renaldose.com",
    port: 8889,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.user,
      pass: config.pass
    },
  });

  // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
        console.log(error);
        } else {
        console.log("Server is ready to take our messages");
        }
    });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"PharmaSearch E-Mail Service ☕" <mustafa@renaldose.com>', // sender address
    to: "mustafa@renaldose.com", // list of receivers
    subject: "Your List of Selected Studies 📌", // Subject line
    html: "<b>Test e-mail</b> starts here. And ends <i>here</i>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

