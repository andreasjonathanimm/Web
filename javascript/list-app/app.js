const express = require('express');

const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jojoandreas72779673',
    database: 'list_app'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM items',
        (error, results) => {
            console.log(results);
            res.render('hello.ehs');
        }
    );
});

app.listen(3000);