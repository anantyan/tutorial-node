const dbConfig = require('../config/db.config');

class Index {

  static async get() {
    try {
      const conn = await dbConfig();
      return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM items', (err, result) => {
          if(err) reject(new Error(err));
          resolve([conn, result]);
        });
      });
    } catch(err) {
      console.log(err);
    }
  }

  static async getId(req) {
    try {
      const conn = await dbConfig();
      return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM items WHERE id=?', req, (err, result) => {
          if(err) reject(new Error(err));
          return resolve([conn, result]);
        });
      });
    } catch(err) {
      console.log(err);
    }
  }

  static async post(req) {
    try {
      const conn = await dbConfig();
      return new Promise((resolve, reject) => {
        conn.query('INSERT INTO items (nama) VALUES (?)', req, (err, result) => {
          if(err) reject(new Error(err));
          resolve(result);
        });
      });
    } catch(err) {
      console.log(err);
    }
  }

  static async put(req) {
    try {
      const conn = await dbConfig();
      return new Promise((resolve, reject) => {
        conn.query('UPDATE items SET nama=?, picture=?, picture_blob=? WHERE id=?', req, (err, result) => {
          if(err) reject(new Error(err));
          resolve(result);
        });
      });
    } catch(err) {
      console.log(err);
    }
  }
  
  static async delete(req) {
    try {
      const conn = await dbConfig();
      return new Promise((resolve, reject) => {
        conn.query('DELETE FROM items WHERE id=?', req, (err, result) => {
          if(err) reject(new Error(err));
          resolve(result);
        });
      });
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = Index;