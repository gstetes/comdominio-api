exports.up = function (knex) {
  return knex.schema.createTable('users_condominiums', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.integer('condominium_id').notNullable();
    table.integer('role_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
    table.foreign('condominium_id').references('id').inTable('condominiums');
    table.foreign('role_id').references('id').inTable('roles');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users_condominiums');
};
