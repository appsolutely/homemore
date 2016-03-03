var Schema = {
  userRoles: {
    userRoleID: {type: "increments", nullable: false, primary: true},
    userRoleName: {type: "string", maxlength: 255},
    userRoleDescription: {type: "string"}
  },

  users: {
    personID: {type: "increments", nullable: false, primary: true},
    personFirstName: {type: "string", maxlength: 255, nullable: false},
    personLastName: {type: "string", maxlength: 255, nullable: false},
    personDOB: {type: "dateTime", nullable: false},
    fk_userRole: {type: "integer", nullable: false, references: "userRoles.userRoleID"}
  },

  shelterManagers: {
    managerID: {type: "increments", nullable: false, primary: true},
    fk_shelterID: {type: "integer", nullable: false, references: "shelters.shelterID"},
    fk_personID: {type: "integer", nullable: false, references: "persons.personID"}
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
    fk_personID: {type: "integer", nullable: false, references: "persons.personID"}
  } 
};   

 