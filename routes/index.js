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
      .where({user_id: userId, do :"0"})
      .then(function (results) {
        res.render('index', {
          title: 'ToDo App',
          todos: results,
          isAuth: isAuth,
        });
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'ToDo App',
          isAuth: isAuth,
          errorMessage: [err.sqlMessage],
        });
      });
  } else {
    res.render('index', {
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
    .insert({user_id: userId, content: todo, do: "0"})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/done', require('./done'));
router.use('/did', require('./did'));
router.use('/logout', require('./logout'));
router.use('/delete', require('./delete'));
router.use('/delete2', require('./delete2'));


module.exports = router;