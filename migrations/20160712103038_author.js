exports.up = function(knex, Promise) {
  return knex.schema.createTable('author', function(table) {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.text('bio').notNullable();
    table.string('portrait_url').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('author');
};
