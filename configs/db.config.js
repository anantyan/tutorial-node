const mysql = require('mysql');

const conn = (cb) => {
  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tutorial_node'
  }).getConnection(cb);
}

module.exports.conn = conn;