var express = require('express');
var router = express.Router();
var db = require('../db/queries');
var Book = require('../models/book');
var Author = require('../models/author');
var Author_Book = require('../models/author_book');

/* GET home page. */
router.get('/', function(request, response, next) {
  db.Book.get().then(function(book) {
    console.log(book);
    response.render('books/all-books', { books: book });
  });
});

/* Add a book page */
router.get('/add', function(request, response, next) {
  response.render('books/add-book');
});

/* Single book more-info page */
router.get('/:id', function(request, response, next) {
  db.Book.get(request.params.id).then(function(book) {
    console.log(book);
    response.render('books/one-book', { book: book });
  });
});

module.exports = router;
