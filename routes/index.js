var express = require('express'),
    url = require('url'),
    fs = require('fs'),
    needle = require('needle'),
    path = require('path'),
    Cookies = require('cookies'),
    db = require('../lib/database'),
    useragent = require('useragent'),
    router = express.Router();


var connection = db.connectdb();


router.get('/', function(req, res) {
    res.render('home');
});

router.get('/download', function(req, res) {
    var agent = useragent.parse(req.headers['user-agent'])
    agent = agent.os.toString();
    console.log(agent)
    if (agent.indexOf('Windows') > -1) {
        res.setHeader('Content-disposition', 'attachment; filename=imgSnap.exe');
        res.setHeader('Content-type', 'application/x-msdownload');
        var file = fs.createReadStream('clients/win/imgSnap.exe');
    }
    file.pipe(res);
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
        direct = true;
    }

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');



    connection.query('SELECT * FROM images WHERE id = ' + connection.escape(id), function(err, row, fields) {
        if (!row[0]) {
            res.render('image', {
                id: id,
                direct: null
            });
        } else {
            if (!direct) {
                res.render('image', row[0]);
            } else {

                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Transfer-Encoding': 'chunked'
                });
                needle.get(row[0].direct).pipe(res);
            }
        }
    });


});


module.exports = router;