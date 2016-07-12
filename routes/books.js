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


module.exports = router;
