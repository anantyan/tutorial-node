const mysql = require('mysql');

const dbConfig = () => {
  return new Promise((resolve, reject) => {
    mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tutorial_node',
    }).getConnection((err, conn) => {
      if(err) reject(new Error(err));
      resolve(conn);
    });
  });
}

module.exports = dbConfig;