var mysql = require('mysql');

module.exports = {

    connectdb: function() {

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'imgsnap',
            port: 3306
        });

        return connection;
    }


}