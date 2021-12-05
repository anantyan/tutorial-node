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
  
  static async index(req, res) {
    try {
      const [conn, result] = await indexModel.get();
      conn.release();
      res.render('index', {csrfToken: req.csrfToken(), items: result});
    } catch(err) {
      new Error(err);
    }
  } // read

  static detail(req, res) {
    res.locals.logged = req.session.logged = true
    res.locals.userID = req.session.userID = {
      uniqID: req.sessionID,
      name: "Arya Rezza Anantya",
      address: "Banjarnegara",
    }
    res.locals.func = function(args) {
      return args
    }
    res.render('detail')
  } // detail

  static new(req, res) {
    res.render('new', {csrfToken: req.csrfToken()});
  }
  
  static async create(req, res) {
    try {
      await indexModel.post([req.body.itemName]);
      res.redirect('/index');
    } catch(err) {
      new Error(err);
    }
  } // create

  static async edit(req, res) {
    try {
      const [conn, result] = await indexModel.getId([req.params.id]);
      conn.release();
      res.render('edit', {csrfToken: req.csrfToken(), item: result[0]});
    } catch(err) {
      new Error(err);
    }
  }

  static async update(req, res) {
    const unlink = (args) => {
      return new Promise((resolve, reject) => {
        fs.unlink(path.join(__dirname, args), err => {
          // if(err) reject(err);
          resolve();
        });
      });
    }
    try {
      const [conn, result] = await indexModel.getId([req.params.id]);
      conn.release();
      await unlink(`../public/upload/${result[0].picture}`);
      await indexModel.put([req.body.itemName, req.file.filename, req.file.path, req.params.id]);
      res.redirect('/index');
    } catch(err) {
      new Error(err);
    } 
  } // update

  static async delete(req, res) {
    const unlink = (args) => {
      return new Promise((resolve, reject) => {
        fs.unlink(path.join(__dirname, args), err => {
          // if(err) reject(err);
          resolve();
        });
      });
    }
    try {
      const [conn, result] = await indexModel.getId([req.params.id]);
      conn.release();
      await unlink(`../public/upload/${result[0].picture}`);
      await indexModel.delete([req.params.id]);
      res.redirect('/index');
    } catch(err) {
      new Error(err);
    }
  } // delete
}

module.exports = Index;