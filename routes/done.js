const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const knex = require('../db/knex');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3014',
  database: 'todo_app'
});

router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  if (isAuth) {
    const userId = req.user.id;
    knex("tasks")
      .select("*")
      .where({user_id: userId, do:"1"})
      .then(function (results) {
        res.render('done', {
          title: 'ToDo App',
          todos: results,
          isAuth: isAuth,
        });
      })
      .catch(function (err) {
        console.error(err);
        res.render('done', {
          title: 'ToDo App',
          isAuth: isAuth,
          errorMessage: [err.sqlMessage],
        });
      });
  } else {
    res.render('done', {
      title: 'ToDo App',
      isAuth: isAuth,
    });
  }
});

router.post('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.user.id;
  const todo = req.body.add;

  knex("tasks")
    .insert({user_id: userId, content: todo})
    .then(function () {
      res.redirect('/done')
    })
    .catch(function (err) {
      console.error(err);
      res.render('done', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

module.exports = router;