
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.string('vin', 125).unique().notNullable();
    tbl.string('make', 125).notNullable();
    tbl.string('model', 125).notNullable();
    tbl.integer('mileage', 125).notNullable();
    tbl.string('transmission', 125);
    tbl.string('status of title', 125);
    tbl.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
