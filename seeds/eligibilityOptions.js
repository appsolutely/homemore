
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('eligibilityOptions').del(), 

    // Inserts seed entries
    knex('eligibilityOptions').insert({eligibilityOption: '', 'eligibilityOptionDescription': '', }),
  );
};







INSERT INTO "userRoles" ("userRoleName", "userRoleDescription") VALUES ('Anonymous', 'Default anonymous user role for all nonregistered users.'),('Registered', 'Registered users registered and logged in to site.'),('Admin', 'Administrative users managing shelters and real-time bed counts.') RETURNING "userRoleID";
