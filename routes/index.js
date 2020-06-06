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
  let receiver = req.body.email;
  let studies = req.body.studies;
  let mailSpot;
  let errMessage;

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
          to: receiver, // list of receivers
          subject: "Your List of Selected Studies 📌", // Subject line
          text: studies, // html body
        }, (err, info) => {
          if (info) {
            mailSpot = ((info.accepted)[0]); // mustafa@renaldose.com
          } else {
            errMessage = err.response;
          }
        });
        setTimeout(function() {
        if (typeof mailSpot !== undefined) {
        res.locals.Sent = `Your message is sent to ${mailSpot}`;
        } else {
          res.locals.Sent = `Your message is sent`;
        }
        console.log(errMessage);
        res.render("email");  
        }, 8000);
        }
    });    
  }
  return main().catch(console.error);
});

// GET /test
router.get('/test', function(req, res, next) {
    return res.render("test");
});

module.exports = router;