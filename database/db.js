const envConfig = require('dotenv');
const mysql = require('mysql');

envConfig.config();
const dbHost = process.env.HOST;
const dbPort = process.env.PORT;
const dbUsername = process.env.MYSQL_USERNAME;
const dbPassword = process.env.MYSQL_PASSWORD;
const dbDatabase = process.env.MYSQL_DATABASE;

const connection = mysql.createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUsername,
    password: dbPassword,
    database: dbDatabase
})

connection.connect((error) => {
    if (error) {
        console.log('Error connecting to database: ', error)
    } else {
        console.log("connected to database")
    }

})

module.exports = connection
