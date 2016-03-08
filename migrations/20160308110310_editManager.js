
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('shelterManagers', function(table){
       table.boolean('accessApproved').defaultTo(false);
       table.dropColumns('managerEmail', 'managerPhone');
    }),
    knex.schema.table('users', function(table){
      table.string('userPhone').nullable();
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
