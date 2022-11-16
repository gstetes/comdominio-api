exports.up = function (knex) {
  return knex.schema.createTable('condominiums', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('address').notNullable();
    table.integer('responsible').notNullable();

    table.foreign('responsible').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('condominiums');
};
