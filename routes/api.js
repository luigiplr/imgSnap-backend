var express = require('express'),
    formidable = require('formidable'),
    imgur = require('imgur'),
    fs = require('fs'),
    url = require('url'),
    bodyParser = require('body-parser'),
    router = express.Router(),
    uuid = require('node-uuid'),
    db = require('../lib/database'),
    tools = require('../lib/functions');

var connection = db.connectdb();


router.post('/upload', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Transfer-Encoding': 'chunked'
    });

    var id = tools.makeid();


    var owner = uuid.v1();

    var form = new formidable.IncomingForm(),
        files = [],
        fields = [];
    form.uploadDir = 'tmp/';

    form.on('field', function(field, value) {
        fields.push(value);
    });
    form.on('file', function(field, file) {
        files.push(file);
    });
    form.on('end', function() {
        res.end('http://' + req.headers.host + '/' + id);
        if (fields[0]) {
            owner = fields[0];
        }
        files.forEach(function(file) {
            imgur.uploadFile(file.path)
                .then(function(json) {
                    fs.unlink(file.path);
                    connection.query("INSERT INTO `imgsnap`.`images` (`id`, `direct`, `timestamp`, `delete`, `owner`) VALUES ('" + connection.escape(id).replace(/'/g, '') + "', '" + connection.escape(json.data.link).replace(/'/g, '') + "', '" + connection.escape(json.data.datetime) + "', '" + connection.escape(json.data.deletehash).replace(/'/g, '') + "', '" + connection.escape(owner).replace(/'/g, '') + "')");
                })
                .catch(function(err) {
                    fs.unlink(file.path);
                    console.log(err);
                });
        });

    });

    form.parse(req);


});


router.get('/image/:id', function(req, res) {

    var id = req.params.id;

    connection.query('SELECT * FROM images WHERE id = ' + connection.escape(id), function(err, row, fields) {
        if (!row[0]) {
            res.json({
                status: false
            });
        } else {
            res.json({
                status: true,
                direct: row[0].direct,
                timestamp: row[0].timestamp
            });
        }
    });
});


router.get('/check', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Transfer-Encoding': 'chunked'
    });

    res.end('Server Online');
});



module.exports = router;