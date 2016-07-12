var express = require('express');
var router = express.Router();
var db = require('../db/queries');
var Book = require('../models/book');
var Author = require('../models/author');
var Author_Book = require('../models/author_book');

/* GET home page. */
router.get('/', function(request, response, next) {
  db.Author.get().then(function(author) {
    response.render('authors/all-authors', { authors: author });
  });
});

/* Add an author page */
router.get('/add', function(request, response, next) {
  response.render('authors/add-author');
});

/* Single author more-info page */
router.get('/:id', function(request, response, next) {
  db.Author.get(request.params.id).then(function(author) {
    response.render('authors/one-author', { author: author });
  });
});

/* GET edit author page */
router.get('/edit/:id', function(request, response, next) {
  db.Author.get(request.params.id).then(function(author) {
    console.log(author);
    response.render('authors/edit-author', { author: author });
  });
});

/* POST to update the author information */
router.post('/edit/:id', function(request, response, next) {
  db.Author.update(request.params.id, request.body).then(function() {
    response.redirect('/authors/' + request.params.id);
  });
});


module.exports = router;
