const mysql = require('mysql');

const dbConfig = () => {
  return new Promise((resolve, reject) => {
    mysql.createPool({
      connectionLimit : 2,
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tutorial_node',
      debug: false
    }).getConnection((err, conn) => {
      if(err) reject(new Error(err));
      resolve(conn);
    });
  });
}

module.exports = dbConfig;