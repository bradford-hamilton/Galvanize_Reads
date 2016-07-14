var express = require('express');
var router = express.Router();
var db = require('../db/queries');
var Book = require('../models/book');
var Author = require('../models/author');
var Author_Book = require('../models/author_book');

/* GET home page. */
router.get('/', function(request, response, next) {
  db.Book.get(null, request.query).then(function(book) {
    Book.count().then(function(count) {
      response.render('books/all-books', { books: book, count: count, query: request.query });
    });
  });
});

/* Add a book page */
router.get('/add', function(request, response, next) {
  response.render('books/add-book');
});

/* Single book more-info page */
router.get('/:id', function(request, response, next) {
  db.Book.get(request.params.id).then(function(book) {
    response.render('books/one-book', { book: book });
  });
});

/* GET edit book page */
router.get('/edit/:id', function(request, response, next) {
  db.Book.get(request.params.id).then(function(book) {
    db.Author.get().then(function(author) {
      response.render('books/edit-book', { book: book, author: author });
    });
  });
});

/* Delete single author from book edit page */
router.get('/delete-author/:bookId/:authorId', function(request, response, next) {
  db.Author_Book.destroy(request.params.bookId, request.params.authorId).then(function() {
    response.redirect('/books/edit/' + request.params.bookId );
  });
});

/* POST to add a book */
router.post('/add', function(request, response, next) {
  db.Book.insert(request.body).then(function() {
    response.redirect('/books?page=1');
  });
});

/* POST to update the book information */
router.post('/edit/:id', function(request, response, next) {
  db.Book.update(request.params.id, request.body).then(function() {
    response.redirect('/books/' + request.params.id);
  });
});

/* Add author to book POST */
router.post('/add-author-to-book', function(request, response, next) {
  db.Author_Book.insert(request.body).then(function() {
    response.redirect('/books/edit/' + request.body.book_id);
  });
});

/* DELETE books */
router.post('/delete/:id', function(request, response, next) {
  db.Book.destroy(request.params.id).then(function() {
    response.redirect('/books?page=1');
  });
});


module.exports = router;
