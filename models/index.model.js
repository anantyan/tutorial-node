const {conn} = require('../configs/db.config.js');

class Index {

  static get(cb) {
    conn((err, connection) => {
      if(err) console.log(err);
      connection.query('SELECT * FROM items', cb);
    });
  }

  static getId(req, cb) {
    conn((err, connection) => {
      if(err) console.log(err);
      connection.query('SELECT * FROM items WHERE id=?', req, cb);
    });
  }

  static post(req, cb) {
    conn((err, connection) => {
      if(err) console.log(err);
      connection.query('INSERT INTO items (nama) VALUES (?)', req, cb);
    });
  }

  static put(req, cb) {
    conn((err, connection) => {
      if(err) console.log(err);
      connection.query('UPDATE items SET nama=?, picture=?, picture_blob=? WHERE id=?', req, cb);
    });
  }
  
  static delete(req, cb) {
    conn((err, connection) => {
      if(err) console.log(err);
      connection.query('DELETE FROM items WHERE id=?', req, cb);
    });
  }
}

module.exports.indexModel = Index;