var express = require('express'),
    formidable = require('formidable'),
    imgur = require('imgur'),
    fs = require('fs'),
    url = require('url'),
    bodyParser = require('body-parser'),
    router = express.Router();

router.post('/upload', function(req, res) {





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

        var owner = fields[0];

        files.forEach(function(file) {

            imgur.uploadFile(file.path)
                .then(function(json) {
                    console.log(json.data);
                    res.send('http://' + req.headers.host + '/' + json.data.id);
                })
                .catch(function(err) {
                    console.error(err.message);
                });
        });


    });

    form.parse(req);



});



router.get('/', function(req, res) {
    res.status(200);
    res.send('Server Online');
});



module.exports = router;