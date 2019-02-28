
exports.up = function(knex, Promise) {
  knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('username').unique().notNullable();
    table.string('salt');
    table.specificType('password', 'char(60)').notNullable();
  }).then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
      knex.destroy();
    });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
