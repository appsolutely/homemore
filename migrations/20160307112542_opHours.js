
exports.up = function(knex, Promise) {
    return Promise.all([

    knex.schema.createTable('hours', function(table){
      table.increments('hoursID').primary();
      table.string('hoursMonday').defaultTo('Open 24 hours');
      table.string('hoursTuesday').defaultTo('Open 24 hours');
      table.string('hoursWednesday').defaultTo('Open 24 hours');
      table.string('hoursThursday').defaultTo('Open 24 hours');
      table.string('hoursFriday').defaultTo('Open 24 hours');
      table.string('hoursSaturday').defaultTo('Open 24 hours');
      table.string('hoursSunday').defaultTo('Open 24 hours');
    }),

    knex.schema.table('shelters', function(table){
      table.dropColumn('shelterHoursMonday');
      table.dropColumn('shelterHoursTuesday');
      table.dropColumn('shelterHoursWednesday');
      table.dropColumn('shelterHoursThursday');
      table.dropColumn('shelterHoursFriday');
      table.dropColumn('shelterHoursSaturday');
      table.dropColumn('shelterHoursSunday');
      table.integer('fk_hourID').notNullable()
              .references('hoursID')
              .inTable('hours');
    }),

    knex.schema.table('locations', function(table){
      table.dropColumn('locationHoursMonday');
      table.dropColumn('locationHoursTuesday');
      table.dropColumn('locationHoursWednesday');
      table.dropColumn('locationHoursThursday');
      table.dropColumn('locationHoursFriday');
      table.dropColumn('locationHoursSaturday');
      table.dropColumn('locationHoursSunday');
      table.integer('fk_hourID').notNullable()
              .references('hoursID')
              .inTable('hours');
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
    knex.schema.dropTable('orgAdmins'),
    knex.schema.dropTable('userEligibility'),
    knex.schema.dropTable('hours')
  ]);    
};
