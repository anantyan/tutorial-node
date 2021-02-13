const mysql = require('mysql');

const dbConfig = (cb) => {
  mysql.createPool({
    connectionLimit : 2,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tutorial_node',
  }).getConnection(cb);
}

module.exports = dbConfig;