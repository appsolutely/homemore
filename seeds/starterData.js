

exports.seed = function(knex, Promise) {
  return Promise.join(

    // Deletes ALL existing entries
    // knex('eligibilityOptions').del()

    // Inserts seed entries

//seeds insert order:
      // --eligibilityOptions
      knex('eligibilityOptions')
        .insert([
            {eligibilityOption: "Age", eligibilityOptionDescription: "There is an age requirement for this shelter"}, 
            {eligibilityOption: "Household Size", eligibilityOptionDescription: "There is a household size requirement for this shelter"},
            {eligibilityOption: "Armed Forces", eligibilityOptionDescription:"There is an armed forces requirement for this shelter"},
            {eligibilityOption: "Ex-Offenders", eligibilityOptionDescription: "Must be ex-offender"}, 
            {eligibilityOption: "Health", eligibilityOptionDescription: "There is a health related requirement to qualify for this shelter"},
            {eligibilityOption: "Trauma Survivors", eligibilityOptionDescription: "There is a trauma related requirement to qualify for this shelter."}
        ])
        .returning('*')
      
      .catch(function(err){
        console.log("There was an error adding this eligibility", err);
        // throw new Error("There was an error adding this eligibility", err);
      })
      .then(function(result){
        var ageID = result[0].eligibilityOptionID;
        var houseSizeID = result[1].eligibilityOptionID;
        var armedForcesID = result[2].eligibilityOptionID;
        var exOffenderID =  result[3].eligibilityOptionID;
        var healthID = result[4].eligibilityOptionID;
        var traumaSurvivorID = result[5].eligibilityOptionID;

        return knex('eligibilityOptions')
              .insert([
                  {eligibilityOption: "Minors", eligibilityOptionDescription:"Must be younger than 18 years of age", fk_eligibilityParentID: ageID }, 
                  {eligibilityOption: "Adults", eligibilityOptionDescription:"Must be 18 years of age and older", fk_eligibilityParentID: ageID },
                  {eligibilityOption: "Active Duty", eligibilityOptionDescription: "Must be active duty.", fk_eligibilityParentID: armedForcesID },
                  {eligibilityOption: "Veterans", eligibilityOptionDescription: "Must be veterans.", fk_eligibilityParentID: armedForcesID },
                  {eligibilityOption: "Pregnancy", eligibilityOptionDescription: "Must be pregnant.", fk_eligibilityParentID: healthID },
                  {eligibilityOption: "Substance Dependency", eligibilityOptionDescription: "Must have active substance dependency", fk_eligibilityParentID: healthID },
                  {eligibilityOption: "Individuals", eligibilityOptionDescription: "Must be individual person (not families or groups)", fk_eligibilityParentID: houseSizeID },
                  {eligibilityOption: "Families", eligibilityOptionDescription: "Must be families with children", fk_eligibilityParentID: houseSizeID }, 
                  {eligibilityOption: "Domestic and Family Violence", eligibilityOptionDescription: "Must be survivor of domestic or family violence situation.", fk_eligibilityParentID: traumaSurvivorID },
                  {eligibilityOption: "Natural Disasters", eligibilityOptionDescription: "Must be a survivor of natural disaster", fk_eligibilityParentID: traumaSurvivorID }
              ]);
        })
      .catch(function(err){
        // console.log("There was an error adding this eligibility", err);
        throw new Error("There was an error adding this eligibility", err);
      })
// };
    .then(function(){
      // 2.  organizations      
      return knex('organizations')
            .insert([
                {organizationName: "Front Steps"}, 
                {organizationName: "Salvation Army"}, 
                {organizationName: "Safe Place"}, 
              ])
      .returning('*')
      .catch(function(err){
        throw new Error("There was an error adding these organizations", err);
      });
    })
    //   .then(function(orgs){
    //     var org1 = orgs[0].organizationID;
    //     var org2 = orgs[1].organizationID;
    //     var org3 = orgs[2].organizationID;
    //   });
    // });
    // .then(function(){
    //   // 3.  userRoles
    //   return knex('userRoles')
                // .insert([
                //   {userRoleName:"Anonymous", userRoleDescription: "Default anonymous user role for all nonregistered users."},
                //   {userRoleName:"Registered", userRoleDescription: "Registered users registered and logged in to site."},
                //   {userRoleName:"Admin", userRoleDescription: "Administrative users managing shelters and real-time bed counts."}, 
                // ])
    //   .returning('*')
    // })
    // .then(function(){
    //     //--users
    //   return knex('users').insert([])
    //   .returning('*')
    // })
    // .then(function(){
    //     //--userEligibility
    //   return knex('userEligibility').insert([])
    //   .returning('*')
    // })
    // .then(function(){
    //     //--hours
    //   return knex('hours').insert([])
    //   .returning('*')
    // })
    // .then(function(){
    //     //--locations
    //   return knex('locations').insert([])
    //   .returning('*')
    // })
    // .then(function(){
    //     //--shelters
    //   return knex('shelters').insert([])
    //   .returning('*')
    // })
    // .then(function(){
    //     //--shelterEligibility
    //   return knex('shelterEligibility').insert([])
    //   .returning('*')
    // })
    // .then(function(){
    //     //--shelterUnits
    //   return knex('shelterUnits').insert([])
    //   .returning('*')
    // })
    // .then(function(){
    //     //--shelterOccupancy
    //   return knex('shelterOccupancy').insert([])
    //   .returning('*')
    // })
    // .then(function(){
    //     // --shelterManagers
    //   return knex('shelterManagers').insert([])
    //   .returning('*')
    // })
    // .then(function(){
    //     // --orgAdmins
    //   return knex('orgAdmins').insert([])
    //   .returning('*')
    // })
);
};