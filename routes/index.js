'use strict';

// Express te router özelliğini kullanıma açtık
const express = require('express');
const router = express.Router();

// Introduce NodeMailer
const nodemailer = require("nodemailer");
let config = require("../public/js/config");

// GET SECTION START
// GET /
router.get('/', function(req, res, next) {
    return res.render("index");
});

// GET /email
router.get('/email', function(req, res, next) {
    return res.render("email");
});

// GET /search
router.get('/search', function(req, res, next) {
  return res.render("search");
});

// GET /report
router.get('/report', function(req, res, next) {
  return res.render("report");
});

// GET /addStudy
router.get('/addStudy', function(req, res, next) {
  return res.render("addStudy");
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render("about");
});

// GET /test
router.get('/test', function(req, res, next) {
  return res.render("test");
});
// GET SECTION ENDS

// POST SECTION STARTS
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
          res.locals.Sent = `Your message could not be sent. If your connection was established, check your firewall and antivirus software settings`;
          return res.render("email");
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
            return setTimeout(function() {
              if (typeof mailSpot !== undefined) {
              res.locals.Sent = `Your message was sent to ${mailSpot}. Please check your junk/spam folder. You may also add mustafa@renaldose.com to your address list for your future inquiries.`;
              } else {
                res.locals.Sent = `Your message was sent. Please check your junk/spam folder. You may also add mustafa@renaldose.com to your address list for your future inquiries.`;
              }
              res.render("email");  
              }, 2000);            
          } else {
            errMessage = err.response;
            return setTimeout(function() {
              if (typeof errMessage !== undefined) {
                res.locals.Sent = `There has been an error. Please check your e-mail address. Error message: ${errMessage}`;
              } else {
                res.locals.Sent = `There has been an error. Please provide a valid e-mail address`;
              }
              res.render("email");
            }, 2000);
          }
        });
        }
    });    
  }
  return main().catch(console.error);
});

// POST /report
router.post('/report', function(req, res, next) {
  let studyName = req.body.studyName;
  let name = req.body.name;
  let email = req.body.email;
  let problem = req.body.problem;
  let details = req.body.details

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
          res.locals.Report = `Your message could not be sent. If your connection was established, check your firewall and antivirus software settings`;
          return res.render("report");
        } else {
        // send mail with defined transport object
        transporter.sendMail({
          from: '"PharmaSearch Report Service ☕" <mustafa@renaldose.com>', // sender address
          to: "mustafa@renaldose.com", // list of receivers
          subject: "Your Reported Issue 📌", // Subject line
          html: `<b>Study Name:</b> ${studyName} <br><br> <b>Name:</b> ${name} <br><br> <b>Email:</b> ${email} <br><br> <b>Classification:</b> ${problem} <br><br>  <b>Detail:</b> ${details}` // html body
        }, (err, info) => {
          if (info) {
            return setTimeout(function() {
              res.locals.Report = `Thanks for your report! We'll get back to you shortly if there is a requiring detail`;
              res.render("report");
              }, 2000);            
          } else {
            errMessage = err.response;
            return setTimeout(function() {
              res.locals.Report = `There has been an error. Error message: ${errMessage}`;
              res.render("report");
            }, 2000);
          }
        });
        }
    });    
  }
  return main().catch(console.error);

})

// POST /addStudy
router.post('/addStudy', function(req, res, next) {
  let title = req.body.title;
  let studyUrl = req.body.studyUrl;
  let email = req.body.email;
  let studyDetails = req.body.studyDetails;

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
          res.locals.StudyAdd = `Your study could not be sent. If your connection was established, check your firewall and antivirus software settings`;
          return res.render("addStudy");
        } else {
        // send mail with defined transport object
        transporter.sendMail({
          from: '"PharmaSearch AddStudy Service ☕" <mustafa@renaldose.com>', // sender address
          to: "mustafa@renaldose.com", // list of receivers
          subject: "Your Study for Review 📌", // Subject line
          html: `<b>Study Title:</b> ${title} <br><br> <b>Study URL:</b> ${studyUrl} <br><br> <b>Email:</b> ${email} <br><br> <b>Study Details:</b> ${studyDetails}` // html body
        }, (err, info) => {
          if (info) {
            return setTimeout(function() {
              res.locals.StudyAdd = `Thanks for your contribution! We'll add the study to our database as soon as we review, and inform you if contact information was provided`;
              res.render("addStudy");
              }, 2000);            
          } else {
            errMessage = err.response;
            return setTimeout(function() {
              res.locals.StudyAdd = `There has been an error. Error message: ${errMessage}`;
              res.render("addStudy");
            }, 2000);
          }
        });
        }
    });    
  }
  return main().catch(console.error);

})

// POST SECTION ENDS

module.exports = router;