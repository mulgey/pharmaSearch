'use strict';

// Express te router özelliğini kullanıma açtık
const express = require('express');
const router = express.Router();

// Introduce NodeMailer
const nodemailer = require("nodemailer");
let config = require("../public/js/config");

// GET /
router.get('/', function(req, res, next) {
    return res.render("index");
});

// GET /email
router.get('/email', function(req, res, next) {
    return res.render("email");
});

// POST /email
router.post('/email', function(req, res, next) {
  console.log('Hey yo!');
  let receiver = req.body.email;
  let studies = req.body.studies;
  console.log(receiver);
  console.log(studies);

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
      to: receiver, // list of receivers
      subject: "Your List of Selected Studies 📌", // Subject line
      text: studies, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.render("email");
  }

  return main().catch(console.error);
});

// GET /test
router.get('/test', function(req, res, next) {
    return res.render("test");
});

module.exports = router;