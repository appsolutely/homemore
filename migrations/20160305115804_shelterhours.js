
exports.up = function(knex, Promise) {
  return Promise.ass([

  knex.schema.table('shelters',function(table){
    table.string('shelterHoursMonday').defaultTo('Open 24 hours');
    table.string('shelterHoursTuesday').defaultTo('Open 24 hours');
    table.string('shelterHoursWednesday').defaultTo('Open 24 hours');
    table.string('shelterHoursThursday').defaultTo('Open 24 hours');
    table.string('shelterHoursFriday').defaultTo('Open 24 hours');
    table.string('shelterHoursSaturday').defaultTo('Open 24 hours');
    table.string('shelterHoursSunday').defaultTo('Open 24 hours');
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
