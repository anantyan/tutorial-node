const fs = require('fs'); // access file system
const path = require('path');
const indexModel = require('../models/index.model');

class Index {

  static home(req, res) {
    if(req.session.logged) {
      res.render('top');
    } else {
      res.json({hello: 'session ID not found!'});
    }
  }
  static index(req, res) {
    indexModel.get((err, connection, result) => {
      connection.release();
      if(result) {
        res.render('index', {csrfToken: req.csrfToken(), items: result});
      } else {
        console.log(err);
      }
    });
  } // read

  static detail(req, res) {
    req.session.logged=true
    req.session.userID = {
      uniqID: req.sessionID,
      name: "Arya Rezza Anantya",
      address: "Banjarnegara",
    }
    res.json({hello: req.session}); // sebagai contoh session aja
  } // detail

  static new(req, res) {
    res.render('new', {csrfToken: req.csrfToken()});
  }
  static create(req, res) {
    indexModel.post([req.body.itemName], (err, connection, results) => {
      connection.release();
      res.redirect('/index');
    });
  } // create

  static edit(req, res) {
    indexModel.getId([req.params.id], (err, connection ,result) => {
      connection.release();
      if(result) {
        res.render('edit', {csrfToken: req.csrfToken(), item: result[0]});
      } else {
        console.log(err);
      }
    });
  }
  static update(req, res) {
    indexModel.getId([req.params.id], (err, connection, result) => {
      connection.release();
      if(result) {
        fs.unlink(path.join(__dirname, `../public/upload/${result[0].picture}`), (err) => {
          // if(err) throw err;
          indexModel.put([req.body.itemName, req.file.filename, req.file.path, req.params.id],
            (err, connection, result) => {
              connection.release();
              res.redirect('/index');
            }
          );
        });
      } else {
        console.log(err);
      }
    });
  } // update

  static delete(req, res) {
    indexModel.getId([req.params.id], (err, connection, result) => {
      connection.release();
      if(result) {
        fs.unlink(path.join(__dirname, `../public/upload/${result[0].picture}`), (err) => {
          // if(err) throw err;
          indexModel.delete([req.params.id], (err, connection, results) => {
            connection.release();
            res.redirect('/index');
          });
        });
      } else {
        console.log(err);
      }
    });
  } // delete
}

module.exports = Index;