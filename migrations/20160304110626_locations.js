
exports.up = function(knex, Promise) {
  return Promise.all([

  knex.schema.createTable('locations', function(table){
    table.increments('locationID').primary()
          .onDelete('RESTRICT')
          .onUpdate('CASCADE');
    table.string('locationName');
    table.string('locationStreet');
    table.string('locationCity');
    table.string('locationState');
    table.string('locationZip')
    table.string('locationPhone');
    table.string('locationHoursMonday').defaultTo('Open 24 hours');
    table.string('locationHoursTuesday').defaultTo('Open 24 hours');
    table.string('locationHoursWednesday').defaultTo('Open 24 hours');
    table.string('locationHoursThursday').defaultTo('Open 24 hours');
    table.string('locationHoursFriday').defaultTo('Open 24 hours');
    table.string('locationHoursSaturday').defaultTo('Open 24 hours');
    table.string('locationHoursSunday').defaultTo('Open 24 hours');
  }),

  knex.schema.table('shelters', function(table){
    table.dropColumn('shelterLatLong');
    table.dropColumn('shelterAddress');
    table.integer('fk_locationID').notNullable()
          .references('locationID')
          .inTable('locations');
  }),

  knex.schema.table('shelterOccupancy', function(table){
    table.dropColumn('fk_userID');
    table.string('occupiedByName');
  }),

  knex.schema.table('users', function(table){
    table.dropColumn('userDOB');
  }),

  knex.schema.createTable('orgAdmins', function(table){
    table.increments('orgAdminID').primary();
    table.integer('fk_userID').notNullable()
          .references('userID')
          .inTable('users');
    table.integer('fk_organizationID').notNullable()
          .references('organizationID')
          .inTable('organizations');
  })

    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.dropTable('userRoles'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('shelterManagers'),
    knex.schema.dropTable('organizations'),
    knex.schema.dropTable('shelters'),
    knex.schema.dropTable('shelterUnits'),
    knex.schema.dropTable('shelterOccupancy'),
    knex.schema.dropTable('userSessions'),
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('orgAdmins')
  ]);
};
