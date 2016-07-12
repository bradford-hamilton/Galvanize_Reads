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
    }

  }
};
