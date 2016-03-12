
exports.up = function(knex, Promise) {
  return Promise.all([

  knex.schema.createTableIfNotExists('userRoles', function(table){
    table.increments('userRoleID').primary();
    table.string('userRoleName');
    table.string('userRoleDescription');
  }),

  knex.schema.createTableIfNotExists('users', function(table){
    table.increments('userID').primary();
    table.string('userFirstName').notNullable();
    table.string('userLastName').notNullable();
    table.string('userPassword').notNullable();
    table.dateTime('userDOB').notNullable();
    table.string('userEmail').unique();
    table.string('userPhone').nullable();
    table.integer('fk_userRole').notNullable() 
    			.references('userRoleID')
    			.inTable('userRoles');
  }),

  knex.schema.createTableIfNotExists('shelterManagers', function(table){
    table.increments('managerID').primary();
    table.integer('fk_shelterID').notNullable() 
    			.references('shelterID')
    			.inTable('shelters');
    table.integer('fk_userID').notNullable() 
    			.references('userID')
    			.inTable('users');
    table.boolean('accessApproved').defaultTo(false);
  }),

  knex.schema.createTableIfNotExists('organizations', function(table){
    table.increments('organizationID').primary();
    table.string('organizationName').notNullable();
  }),

  knex.schema.createTableIfNotExists('shelters', function(table){
    table.increments('shelterID').primary();
    table.integer('fk_organizationID').notNullable() 
    			.references('organizationID')
    			.inTable('organizations');
    table.string('shelterName').notNullable();
    table.integer('fk_locationID').nullable()
          .references('locationID')
          .inTable('locations');
    table.string('shelterEmail').notNullable();
    table.string('shelterEmergencyPhone').notNullable();
    table.string('shelterDaytimePhone').notNullable();
  }),

  knex.schema.createTableIfNotExists('shelterUnits', function(table){
    table.increments('shelterUnitID').primary();
    table.integer('fk_shelterID').notNullable() 
    			.references('shelterID')
    			.inTable('shelters');
    table.string('unitSize').notNullable().defaultTo('1BD');
  }),

  knex.schema.createTableIfNotExists('shelterOccupancy', function(table){
    table.increments('occupancyID').primary();
    table.integer('fk_shelterUnitID').notNullable() 
    			.references('shelterUnitID')
    			.inTable('shelterUnits');
    table.string('occupiedByName');
    table.string('DOB');
    table.unique(['fk_shelterUnitID', 'fk_userID']);
  }),

  knex.schema.createTableIfNotExists('userSessions', function(table){
    table.uuid('sessionId').primary(); 
    table.integer('fk_userID').notNullable() 
    			.references('userID')
    			.inTable('users');
  }),

  knex.schema.createTableIfNotExists('orgAdmins', function(table){
    table.increments('orgAdminID').primary();
    table.integer('fk_userID').notNullable()
          .references('userID')
          .inTable('users');
    table.integer('fk_organizationID').notNullable()
          .references('organizationID')
          .inTable('organizations');
  }),

  knex.schema.createTableIfNotExists('eligibilityOptions', function(table){
    table.increments('eligibilityOptionID').primary();
    table.string('eligibilityOption').notNullable().unique();
    table.string('eligibilityOptionDescription').notNullable();
    table.integer('fk_eligibilityParentID')
          .references('eligibilityOptionID')
          .inTable('eligibilityOptions')
          .nullable();
  }),

  knex.schema.createTableIfNotExists('shelterEligibility', function(table){
    table.increments('shelterEligibilityID').primary();
    table.integer('fk_shelterID')
          .references('shelterID')
          .inTable('shelters')
          .notNullable();
    table.integer('fk_eligibilityOptionID')
          .references('eligibilityOptionID')
          .inTable('eligibilityOptions')
          .notNullable();
    table.unique(['fk_shelterID', 'fk_eligibilityOptionID']);
  }),

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

  knex.schema.createTable('userEligibility', function(table){
    table.increments('userEligibilityID').primary();
    table.integer('fk_userID').notNullable()
            .references('userID')
            .inTable('users');
    table.integer('fk_eligibilityOptionID').notNullable()
            .references('eligibilityOptionID')
            .inTable('eligibilityOptions');
    table.unique(['fk_userID', 'fk_eligibilityOptionID']);
  }),

  knex.schema.createTableIfNotExists('locations', function(table){
    table.increments('locationID').primary();
    table.string('locationName');
    table.string('locationStreet');
    table.string('locationCity');
    table.string('locationState');
    table.string('locationZip');
    table.string('locationPhone');
    table.integer('fk_hourID').nullable()
              .references('hoursID')
              .inTable('hours');
  }),

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
