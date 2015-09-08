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

    var id = tools.makeid();
    //console.log(id)
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

        if (fields[0]) {
            owner = fields[0];
        }
        files.forEach(function(file) {
            imgur.uploadFile(file.path)
                .then(function(json) {
                    connection.query("INSERT INTO `imgsnap`.`images` (`id`, `direct`, `timestamp`, `delete`, `owner`) VALUES ('" + connection.escape(id).replace(/'/g, '') + "', '" + connection.escape(json.data.link).replace(/'/g, '') + "', '" + connection.escape(json.data.datetime) + "', '" + connection.escape(json.data.deletehash).replace(/'/g, '') + "', '" + connection.escape(owner).replace(/'/g, '') + "')");
                })
                .catch(function(err) {
                    console.error(err.message);
                });
        });


    });

    form.parse(req);

    res.send('http://' + req.headers.host + '/' + id);

});



router.get('/', function(req, res) {
    res.status(200);
    res.send('Server Online');
});



module.exports = router;