var express = require('express');
var router = express.Router();
var db = require('../db/queries');
var Book = require('../models/book');
var Author = require('../models/author');
var Author_Book = require('../models/author_book');

/* GET home page. */
router.get('/', function(request, response, next) {
  db.Author.get(null, request.query).then(function(author) {
    Author.count().then(function(count) {
      response.render('authors/all-authors', { authors: author, count: count, query: request.query });
    });
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
    db.Book.get().then(function(book) {
      response.render('authors/edit-author', { author: author, book: book });
    });
  });
});

/* Delete single author from book edit page */
router.get('/delete-book/:authorId/:bookId', function(request, response, next) {
  db.Author_Book.destroy(request.params.bookId, request.params.authorId).then(function() {
    response.redirect('/authors/edit/' + request.params.authorId );
  });
});

/* POST to add an author */
router.post('/add', function(request, response, next) {
  db.Author.insert(request.body).then(function() {
    response.redirect('/authors?page=1');
  });
});

/* POST to update the author information */
router.post('/edit/:id', function(request, response, next) {
  db.Author.update(request.params.id, request.body).then(function() {
    response.redirect('/authors/' + request.params.id);
  });
});

/* Add book to author POST */
router.post('/add-book-to-author', function(request, response, next) {
  db.Author_Book.insert(request.body).then(function() {
    response.redirect('/authors/edit/' + request.body.author_id);
  });
});

/* DELETE author */
router.post('/delete/:id', function(request, response, next) {
  db.Author.destroy(request.params.id).then(function() {
    response.redirect('/authors?page=1');
  });
});


module.exports = router;
