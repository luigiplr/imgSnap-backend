var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    favicon = require('static-favicon'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    api = require('./routes/api');

var app = express();

app.set('port', 80);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.engine('.html', require('ejs').__express);

app.use(favicon());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/api', api);

app.use(bodyParser({
    limit: '20mb'
}));

process.on('uncaughtException', function(err) {
    console.log(err);
});

// Handle 404
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

// Handle 500
app.use(function(error, req, res, next) {
    console.log(error);
    res.status(500);
    res.render('500');
});


module.exports = app;

var server = app.listen(app.get('port'), function() {
    console.log('imgSnap Server started on port: %d', server.address().port);
});