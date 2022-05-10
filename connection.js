const mysql = require("mysql");

var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "Admin123",
  database: "crud"
});

connection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("error", err);
  }
});

module.exports = connection;
