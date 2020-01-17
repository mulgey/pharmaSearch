'use strict';

// Express te router özelliğini kullanıma açtık
const express = require('express');
const router = express.Router();

// GET /
router.get('/', function(req, res, next) {
    return res.render("index");
});

// GET /test
router.get('/test', function(req, res, next) {
    return res.render("test");
});

module.exports = router;