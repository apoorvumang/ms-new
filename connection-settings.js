/*
  Mysql connection settings
*/

var mysql = require('mysql');
module.exports.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'drmahima_com'
});