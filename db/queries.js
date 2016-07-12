var Book = require('../models/book');
var Author = require('../models/author');
var Author_Book = require('../models/author_book');

module.exports = {

  Book: {

    get: function(id) {
      if (id) {
        return Book.where({ id: id }).fetch({ withRelated: 'authors' }).then(function(collection) {
          return collection.toJSON();
        });
      }
      return Book.forge().orderBy('title', 'ASC').fetchAll({ withRelated: 'authors' }).then(function(collection) {
        return collection.toJSON();
      });
    },

    update: function(id, body) {
      return Book.forge({ id: id }).fetch().then(function(book) {
        return book.save(body);
      });
    }

  },

  Author: {

    get: function(id) {
      if (id) {
        return Author.where({ id: id }).fetch({ withRelated: 'books' }).then(function(collection) {
          return collection.toJSON();
        });
      }
      return Author.forge().orderBy('first_name', 'ASC').fetchAll({ withRelated: 'books' }).then(function(collection) {
        return collection.toJSON();
      });
    },

    update: function(id, body) {
      return Author.forge({ id: id }).fetch().then(function(author) {
        return author.save(body);
      });
    }

  },

  Search: function (search) {
    return Book.where('title', 'like', '%' + search + '%').fetchAll().then(function (book) {
      var book = book ? book.toJSON() : null;
      return Author.where('last_name', 'like', '%' + search + '%').fetchAll().then(function (author) {
        var author = author ? author.toJSON() : null;
        return { book: book, author: author };
      });
    });
  }

};
