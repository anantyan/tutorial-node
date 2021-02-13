const dbConfig = require('../config/db.config');

class Index {

  static get(cb) {
    dbConfig((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM items', (err, result) => {
        return cb(err, connection, result);
      });
    });
  }

  static getId(req, cb) {
    dbConfig((err, connection) => {
      if(err) throw err;
      connection.query('SELECT * FROM items WHERE id=?', req, (err, result) => {
        return cb(err, connection, result);
      });
    });
  }

  static post(req, cb) {
    dbConfig((err, connection) => {
      if(err) throw err;
      connection.query('INSERT INTO items (nama) VALUES (?)', req, (err, result) => {
        return cb(err, connection, result);
      });
    });
  }

  static put(req, cb) {
    dbConfig((err, connection) => {
      if(err) throw err;
      connection.query('UPDATE items SET nama=?, picture=?, picture_blob=? WHERE id=?', req, (err, result) => {
        return cb(err, connection, result);
      });
    });
  }
  
  static delete(req, cb) {
    dbConfig((err, connection) => {
      if(err) throw err;
      connection.query('DELETE FROM items WHERE id=?', req, (err, result) => {
        return cb(err, connection, result);
      });
    });
  }
}

module.exports = Index;