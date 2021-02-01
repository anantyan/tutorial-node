const dbConfig = require('../config/db.config');

class Index {

  static get(cb) {
    dbConfig((err, connection) => {
      if(err) console.log(err);
      connection.query('SELECT * FROM items', cb);
    });
  }

  static getId(req, cb) {
    dbConfig((err, connection) => {
      if(err) console.log(err);
      connection.query('SELECT * FROM items WHERE id=?', req, cb);
    });
  }

  static post(req, cb) {
    dbConfig((err, connection) => {
      if(err) console.log(err);
      connection.query('INSERT INTO items (nama) VALUES (?)', req, cb);
    });
  }

  static put(req, cb) {
    dbConfig((err, connection) => {
      if(err) console.log(err);
      connection.query('UPDATE items SET nama=?, picture=?, picture_blob=? WHERE id=?', req, cb);
    });
  }
  
  static delete(req, cb) {
    dbConfig((err, connection) => {
      if(err) console.log(err);
      connection.query('DELETE FROM items WHERE id=?', req, cb);
    });
  }
}

module.exports = Index;