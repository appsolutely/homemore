
exports.up = function(knex, Promise) {
  return Promise.all([

  knex.schema.createTableIfNotExists('locations', function(table){
    table.increments('locationID').primary();
    table.string('locationName');
    table.string('locationStreet');
    table.string('locationCity');
    table.string('locationState');
    table.string('locationZip');
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
    table.integer('fk_locationID').nullable()
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

  knex.schema.createTableIfNotExists('orgAdmins', function(table){
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
    knex.schema.dropTableIfExists('userSessions'),
    knex.schema.dropTableIfExists('shelterOccupancy'),
    knex.schema.dropTableIfExists('shelterUnits'),
    knex.schema.dropTableIfExists('shelterManagers'),
    knex.schema.dropTableIfExists('shelters'),
    knex.schema.dropTableIfExists('locations'),
    knex.schema.dropTableIfExists('orgAdmins'),
    knex.schema.dropTableIfExists('organizations'),
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('userRoles')
  ]);
};
