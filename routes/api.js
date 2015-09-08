var express = require('express'),
    formidable = require('formidable'),
    imgur = require('imgur'),
    bodyParser = require('body-parser'),
    router = express.Router();



router.post('/upload', function(req, res) {
    var form = new formidable.IncomingForm(),
        files = [],
        fields = [];

    form.on('field', function(field, value) {
        fields.push(value);
    })
    form.on('file', function(field, file) {
        files.push(file);
    })
    form.on('end', function() {
        var urls = [];
        var count = 0,
            owner = fields[0],
            total = files.length;

        files.forEach(function(file) {
            count++;
            // urls.push(tools.uploadfile(file, owner));

            if (count == total) {
                res.send('http://' + req.headers.host + '/' + urls[0]);
            }
        });

    });

    form.parse(req);



});

router.get('/', function(req, res) {
    res.status(200);
    res.send('Server Online');
});



module.exports = router;