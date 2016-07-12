exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('author_book').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('author_book').insert({
          book_id: 1,
          author_id: 1
        }),
        knex('author_book').insert({
          book_id: 1,
          author_id: 5
        }),
        knex('author_book').insert({
          book_id: 1,
          author_id: 6
        }),
        knex('author_book').insert({
          book_id: 2,
          author_id: 2
        }),
        knex('author_book').insert({
          book_id: 3,
          author_id: 3
        }),
        knex('author_book').insert({
          book_id: 4,
          author_id: 4
        }),
        knex('author_book').insert({
          book_id: 5,
          author_id: 4
        }),
        knex('author_book').insert({
          book_id: 6,
          author_id: 4
        })
      ]);
    });
};
