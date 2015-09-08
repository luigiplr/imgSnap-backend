var express = require('express'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    Cookies = require('cookies'),
    router = express.Router();


router.get('/', function(req, res) {
    res.render('home');
});

router.get('/PrivacyPolicy', function(req, res) {
    res.render('PrivacyPolicy', {});
});

router.get('/TermsofService', function(req, res) {
    res.render('TermsofService', {});
});


router.get("/:id", function(req, res) {

    var Imageid = req.params.id.split('.');
    var Imageiddb = Imageid[0];

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

});


module.exports = router;