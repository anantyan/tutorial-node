const fs = require('fs'); // access file system
const path = require('path');
const indexModel = require('../models/index.model');

class Index {

  static home(req, res) {
    if(req.session.logged) {
      res.send({hello: req.session});
    } else {
      res.send({hello: 'session ID not found!'});
    }
  }
  static index(req, res) {
    indexModel.get((err, results) => {
      if(results) {
        res.render('index.ejs', {csrfToken: req.csrfToken(), items: results});
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
    res.send({hello: req.session}); // sebagai contoh session aja
  } // detail

  static new(req, res) {
    res.render('new.ejs', {csrfToken: req.csrfToken()});
  }
  static create(req, res) {
    indexModel.post([req.body.itemName], (err, results) => {
      res.redirect('/index');
    });
  } // create

  static edit(req, res) {
    indexModel.getId([req.params.id], (err, results) => {
      if(results) {
        res.render('edit.ejs', {csrfToken: req.csrfToken(), item: results[0]});
      } else {
        console.log(err);
      }
    });
  }
  static update(req, res) {
    indexModel.getId([req.params.id], (err, results) => {
      if(results) {
        fs.unlink(path.join(__dirname, `../public/upload/${results[0].picture}`), (err) => {
          // if(err) console.log(err);
          indexModel.put([req.body.itemName, req.file.filename, req.file.path, req.params.id],
            (err, results) => {
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
    indexModel.getId([req.params.id], (err, results) => {
      if(results) {
        fs.unlink(path.join(__dirname, `../public/upload/${results[0].picture}`), (err) => {
          // if(err) console.log(err);
          indexModel.delete([req.params.id], (err, results) => {
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