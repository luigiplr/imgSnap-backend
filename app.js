process.on('uncaughtException', function(err) {
    console.log(err);
});

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    db = require('./lib/database'),
    favicon = require('static-favicon'),
    http = require('http'),
    url = require('url'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index');
var api = require('./routes/api');
var connection = db.connectdb();

connection.connect(function(err) {
    if (err) {
        console.log(err);
    }
});


var events = require('events');
var eventEmitter = new events.EventEmitter();

var app = express();

var server = app.listen(80);


app.set('event', eventEmitter);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser({
    limit: '20mb'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/api', api);

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});
app.use(function(error, req, res, next) {
    console.log(error);
    res.status(500);
    res.render('500');
});



console.log("Server started on port: 80");