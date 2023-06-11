const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


router.post('/', function (req, res, next) {
    const id = req.body.delete_id;
    console.log(id);
    knex('tasks')
        .where({id: id})
        .del()
        .then(function() {
            res.redirect('/');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/');
        }); 
});

module.exports = router;