var express = require('express'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    Cookies = require('cookies'),
    db = require('../lib/database'),
    router = express.Router();


var connection = db.connectdb();



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
    var direct = false;
    if (req.params.id.split('.')[1]) {
        console.log('direct')
        direct = true;
    }

    connection.query('SELECT * FROM images WHERE id = ' + connection.escape(id), function(err, row, fields) {
        console.log(row)
        if (!direct) {
            res.render('image', row[0]);
        } else {

        }

    });


});


module.exports = router;