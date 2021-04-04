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
        // send mail with defined transport object
        transporter.sendMail({
          from: '"PharmaSearch E-Mail Service ☕" <mustafa@renaldose.com>', // sender address
          to: "mustafa@renaldose.com", // list of receivers
          subject: "Your List of Selected Studies 📌", // Subject line
          html: "<b>Test e-mail</b> starts here. And ends <i>here</i>", // html body
        }, (err, info) => {
          if (info) {
            // console.log(info.accepted); // [ 'mustafa@renaldose.com' ]
            console.log((info.accepted)[0]); // mustafa@renaldose.com
          } else {
            console.log(err.response); // 550 <mustafaaaaa@renaldose.com> No such user here
          }          
        });
      }
    });
}

main().catch(console.error);

