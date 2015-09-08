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

    var id = req.params.id.split('.')[0];

    if (req.params.id.split('.')[1]) {
        console.log('direct')
    }

    console.log(id)

    res.render('image', {
        id: id
    });

});


module.exports = router;