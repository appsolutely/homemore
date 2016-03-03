var Schema = {
  userRoles: {
    userRoleID: {type: "increments", nullable: false, primary: true},
    userRoleName: {type: "string", maxlength: 255},
    userRoleDescription: {type: "string"}
  },

  users: {
    userID: {type: "increments", nullable: false, primary: true},
    userFirstName: {type: "string", maxlength: 255, nullable: false},
    userLastName: {type: "string", maxlength: 255, nullable: false},
    userPassword: {type: "string", maxlength: 255, nullable: false},
    userDOB: {type: "dateTime", nullable: false},
    userEmail: {type: "string", maxlength: 255, nullable: false, unique: true},
    fk_userRole: {type: "integer", nullable: false, references: "userRoles.userRoleID"}
  },

  shelterManagers: {
    managerID: {type: "increments", nullable: false, primary: true},
    managerPhone: {type: "integer", nullable: false},
    fk_shelterID: {type: "integer", nullable: false, references: "shelters.shelterID"},
    fk_userID: {type: "integer", nullable: false, references: "users.userID"}
  },

  organizations: {
    organizationID: {type: "increments", nullable: false, primary: true},
    organizationName: {type: "string", maxlength: 255, nullable: false}
  },

  shelters: {		
    shelterID: {type: "increments", nullable: false, primary: true},
    fk_organizationID: {type: "integer", nullable: false, references: "organizations.organizationID"},
    shelterName: {type: "string", maxlength: 255, nullable: false},
    shelterLocation: {type: "string", nullable: false}
  },

  shelterUnits: {
    shelterUnitID: {type: "increments", nullable: false, primary: true},
    fk_shelterID: {type: "integer", nullable: false, references: "shelters.shelterID"},
    unitSize: {type: "string", maxlength: 255, nullable: false, default: '1BD'}
  },

  shelterOccupancy: {	
    occupancyID: {type: "increments", nullable: false, primary: true},
    fk_shelterUnitID: {type: "integer", nullable: false, references: "shelterUnits.shelterUnitID"},
    fk_userID: {type: "integer", nullable: false, references: "users.userID"}
  },

  userSessions: {
    sessionId: {type: "string", maxlength: 255, primary: true}, 
    fk_userID: {type: "integer", nullable: false, references: "users.userID"}
  } 
};   

module.exports = Schema;
 