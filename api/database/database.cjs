require('dotenv').config();
const mysql = require('mysql2');

// Create the connection to the database
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Connect to the database
connection.connect();

// Perform a query on the database
connection.query('SELECT * FROM table', function (err, results, fields) {
    console.log(results);
});

// Close the connection
connection.end();
