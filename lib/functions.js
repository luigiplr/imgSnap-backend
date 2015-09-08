var db = require('../lib/database'),
    mysql = require('mysql'),
    fs = require('fs'),
    moment = require('moment'),
    clc = require('cli-color');

var connection = db.connectdb();


module.exports = {
    makeid: function() {
        var text = '';
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;

    }

};