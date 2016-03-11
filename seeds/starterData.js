

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
        throw new Error("There was an error adding this eligibility", err);
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
        console.log("There was an error adding this eligibility", err);
        throw new Error("There was an error adding this eligibility", err);
      })
    .then(function(eligOptions){
      var minorsOptID = eligOptions[0].eligibilityOptionID;
      var adultsOptID = eligOptions[1].eligibilityOptionID;
      var substAddictOptID = eligOptions[6].eligibilityOptionID;
      var vetsOptID = eligOptions[4].eligibilityOptionID;


      //--userRoles
      return knex('userRoles')
                .insert([
                  {userRoleName:"Anonymous", userRoleDescription: "Default anonymous user role for all nonregistered users."},
                  {userRoleName:"Registered", userRoleDescription: "Registered users registered and logged in to site."},
                  {userRoleName:"Admin", userRoleDescription: "Administrative users managing shelters and real-time bed counts."}, 
                ])
      .returning('*');
    })
    .catch(function(err){
        console.log("There was an error adding this user role", err);
        throw new Error("There was an error adding this user role", err);     
    })
    .then(function(userRoles){
      var anonUserID = userRoles[0].userRoleID;
      var registeredUserID = userRoles[1].userRoleID;
      var adminUserID = userRoles[2].userRoleID;

      //--organizations      
      return knex('organizations')
            .insert([
                {organizationName: "Front Steps"}, 
                {organizationName: "Salvation Army"}, 
                {organizationName: "Safe Place"}, 
              ])
      .returning('*');
      })
      .catch(function(err){
        console.log("There was an error adding these organizations", err);
        throw new Error("There was an error adding these organizations", err);
      })
      .then(function(orgs){
        var org1 = orgs[0].organizationID;
        var org2 = orgs[1].organizationID;
        var org3 = orgs[2].organizationID;

        //--users
      return knex('users')
            .insert([
                {fk_userRoleID: anonUserID, userFirstName:"Harry", userLastName: "Henderson", userPhone: "512-555-1234", userEmail: "harry@email.com"},
                {fk_userRoleID: registeredUserID, userFirstName:"Rebecca", userLastName: "Rogers", userPhone: "713-555-5432", userEmail: "rebecca@email.com"},
                {fk_userRoleID: adminUserID, userFirstName:"Michelle", userLastName: "McCalister", userPhone: "512-544-5678", userEmail: "michelle@email.com"}
              ])
      .returning('*');
    })
    .catch(function(err){
      console.log("There was an error adding these users", err);
      throw new Error("There was an error adding these users", err);
    })
    .then(function(users){
      var user1 = users[0].userID;
      var user2 = users[1].userID;
      var user3 = users[2].userID;

        //--userEligibility
      return knex('userEligibility')
            .insert([
              {fk_eligibilityOptionID: vetsOptID, fk_userID: user2},
              {fk_eligibilityOptionID: adultsOptID, fk_userID: user2}
             ])
      .returning('*');
    })
    .catch(function(err){
      console.log("There was an error adding these user eligibility records", err);
      throw new Error("There was an error adding these user eligibility records", err);
    })    
    .then(function(){
        //--hours
      return knex('hours')
            .insert([
              {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"},
              {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"},
              {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"},
              {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"},
              {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"},
              {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"},
              {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"}
            ])
      .returning('*');
    })
    .catch(function(err){
      console.log("There was an error adding these hours", err);
      throw new Error("There was an error adding these hours", err);
    })
    .then(function(hours){
      var hours1ID = hours[0].hoursID;
      var hours2ID = hours[1].hoursID;  
      var hours3ID = hours[2].hoursID;
      var hours4ID = hours[3].hoursID;
      var hours5ID = hours[4].hoursID;
      var hours6ID = hours[5].hoursID;
      var hours7ID = hours[6].hoursID;
    })
    .then(function(){
        //--locations
      return knex('locations')
            .insert([
              {locationName:"Front Steps", locationStreet:"500 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78701", locationPhone:"512-305-4100", fk_hourID:hours1ID},
              {locationName:"Stepfield Church" , locationStreet:"501 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78777", locationPhone:"512-305-4101", fk_hourID:hours2ID},
              {locationName:"Convention Center", locationStreet:"502 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78745", locationPhone:"512-305-4102", fk_hourID:hours3ID},
              {locationName:"Healing Home" , locationStreet:"503 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78756", locationPhone:"512-305-4103", fk_hourID:hours4ID},
              {locationName:"Bolder Building", locationStreet:"504 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78704", locationPhone:"512-305-4104", fk_hourID:hours5ID},
              {locationName:"Popup Shelter", locationStreet:"505 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78703", locationPhone:"512-305-4105", fk_hourID:hours6ID},
              {locationName:"Alpha Center" , locationStreet:"506 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78787", locationPhone:"512-305-4106", fk_hourID:hours7ID}
            ])
      .returning('*');
    })
    .catch(function(err){
      console.log("There was an error adding these locations", err);
      throw new Error("There was an error adding these locations", err);
    })
    .then(function(locations){
      var location1ID = locations[0].locationID;
      var location2ID = locations[1].locationID;
      var location3ID = locations[2].locationID; 
      var location4ID = locations[3].locationID; 
      var location5ID = locations[4].locationID; 
      var location6ID = locations[5].locationID; 
      var location7ID = locations[6].locationID; 
    })
    .then(function(){
        //--shelters
      return knex('shelters')
            .insert([
              {shelterName: "Men Emergency Night Shelter", shelterEmail: "email@MEN.com", shelterDaytimePhone:"512-444-4445", shelterEmergencyPhone:"512-444-4445", fk_shelterOrganizationID: org1, fk_shelterLocationID:location1ID},
              {shelterName: "MEN Day Sleep", shelterEmail: "email@MEN.com", shelterDaytimePhone:"512-444-4445", shelterEmergencyPhone:"512-444-4445", fk_shelterOrganizationID: org2, fk_shelterLocationID:location1ID},
              {shelterName: "MEN Weather Shelter Program", shelterEmail: "MENweathershelter@frontsteps.org", shelterDaytimePhone:"512-444-4233" , shelterEmergencyPhone:"512-444-4445", fk_shelterOrganizationID: org3, fk_shelterLocationID:location2ID},
              {shelterName: "women Emergency Night Shelter", shelterEmail: "email@women.com", shelterDaytimePhone:"512-333-3335", shelterEmergencyPhone:"512-333-3335", fk_shelterOrganizationID: org1, fk_shelterLocationID:location3ID},
              {shelterName: "women Day Sleep", shelterEmail: "email@women.com", shelterDaytimePhone:"512-333-3335", shelterEmergencyPhone:"512-333-3335", fk_shelterOrganizationID: org2, fk_shelterLocationID:location4ID},
              {shelterName: "women Weather Shelter Program", shelterEmail: "womenweathershelter@frontsteps.org", shelterDaytimePhone:"512-333-4233" , shelterEmergencyPhone:"512-333-3335", fk_shelterOrganizationID: org3, fk_shelterLocationID:location4ID},
              {shelterName: "children Emergency Night Shelter", shelterEmail: "email@children.com", shelterDaytimePhone:"512-222-2225", shelterEmergencyPhone:"512-222-2225", fk_shelterOrganizationID: org1, fk_shelterLocationID:location5ID},
              {shelterName: "children Day Sleep", shelterEmail: "email@children.com", shelterDaytimePhone:"512-222-2225", shelterEmergencyPhone:"512-222-2225", fk_shelterOrganizationID: org2, fk_shelterLocationID:location6ID},
              {shelterName: "children Weather Shelter Program", shelterEmail: "childrenweathershelter@frontsteps.org", shelterDaytimePhone:"512-222-4233" , shelterEmergencyPhone:"512-222-2225", fk_shelterOrganizationID: org3, fk_shelterLocationID:location7ID},
              {shelterName: "ARCH Emergency Night Shelter", shelterEmail: "email@email.com", shelterDaytimePhone:"512-555-5555", shelterEmergencyPhone:"512-555-5555", fk_shelterOrganizationID: org1, fk_shelterLocationID:location7ID},
              {shelterName: "ARCH Day Sleep", shelterEmail: "email@email.com", shelterDaytimePhone:"512-555-5555", shelterEmergencyPhone:"512-555-5555", fk_shelterOrganizationID: org2, fk_shelterLocationID:location6ID},
              {shelterName: "Cold Weather Shelter Program", shelterEmail: "coldweathershelter@frontsteps.org", shelterDaytimePhone:"512-305-4233" , shelterEmergencyPhone:"512-555-5555", fk_shelterOrganizationID: org3, fk_shelterLocationID:location5ID}
            ])
      .returning('*');
    })
    .catch(function(err){
      console.log("There was an error adding these shelters", err);
      throw new Error("There was an error adding these shelters", err);
    })
    .then(function(shelters){
      var shelter1ID = shelters[0].shelterID;
      var shelter2ID = shelters[1].shelterID;
      var shelter3ID = shelters[2].shelterID;
      var shelter4ID = shelters[3].shelterID;
      var shelter5ID = shelters[4].shelterID;
      var shelter6ID = shelters[5].shelterID;  
      var shelter7ID = shelters[6].shelterID;
      var shelter8ID = shelters[7].shelterID;
      var shelter9ID = shelters[8].shelterID;
      var shelter10ID = shelters[9].shelterID;
      var shelter11ID = shelters[10].shelterID;
      var shelter12ID = shelters[11].shelterID;           
 
    // .then(function(){
    //     //--shelterEligibility
    //   return knex('shelterEligibility')
    //         .insert([


    //         ])
    //   .returning('*')
    // })
    
        //--shelterUnits
      return knex('shelterUnits')
            .insert([
              {unitSize: "1BD", fk_shelterID:shelter1ID},
              {unitSize: "1BD", fk_shelterID:shelter1ID},
              {unitSize: "1BD", fk_shelterID:shelter1ID},
              {unitSize: "1BD", fk_shelterID:shelter1ID},
              {unitSize: "1BD", fk_shelterID:shelter1ID},
              {unitSize: "1BD", fk_shelterID:shelter2ID},
              {unitSize: "1BD", fk_shelterID:shelter2ID},
              {unitSize: "1BD", fk_shelterID:shelter2ID},
              {unitSize: "1BD", fk_shelterID:shelter4ID}, 
              {unitSize: "1BD", fk_shelterID:shelter4ID}, 
              {unitSize: "1BD", fk_shelterID:shelter7ID}, 
              {unitSize: "1BD", fk_shelterID:shelter7ID}, 
              {unitSize: "2BD", fk_shelterID:shelter7ID}, 
              {unitSize: "2BD", fk_shelterID:shelter3ID}, 
              {unitSize: "2BD", fk_shelterID:shelter3ID}, 
              {unitSize: "2BD", fk_shelterID:shelter3ID}, 
              {unitSize: "2BD", fk_shelterID:shelter9ID}, 
              {unitSize: "2BD", fk_shelterID:shelter9ID}, 
              {unitSize: "2BD", fk_shelterID:shelter9ID}, 
              {unitSize: "2BD", fk_shelterID:shelter9ID}, 
              {unitSize: "2BD", fk_shelterID:shelter10ID}, 
              {unitSize: "1BD", fk_shelterID:shelter10ID}, 
              {unitSize: "1BD", fk_shelterID:shelter11ID}, 
              {unitSize: "1BD", fk_shelterID:shelter11ID}, 
              {unitSize: "1BD", fk_shelterID:shelter12ID}
            ])
      .returning('*');
    })
    .catch(function(err){
      console.log("There was an error adding these shelter units", err);
      throw new Error("There was an error adding these shelter units", err);
    })
    .then(function(units){
      var unit1ID = units[0].unitID;
      var unit2ID = units[1].unitID;
      var unit3ID = units[2].unitID;
      var unit4ID = units[3].unitID;
      var unit5ID = units[4].unitID;
      var unit6ID = units[5].unitID;
      var unit7ID = units[6].unitID;
      var unit8ID = units[7].unitID;
      var unit9ID = units[8].unitID;
      var unit10ID = units[9].unitID;
      var unit11ID = units[10].unitID;
      var unit12ID = units[11].unitID;
      var unit13ID = units[12].unitID;
      var unit14ID = units[13].unitID;
      var unit15ID = units[14].unitID;
      var unit16ID = units[15].unitID;
      var unit17ID = units[16].unitID;
      var unit18ID = units[17].unitID;
      var unit19ID = units[18].unitID;
    })
    .then(function(){
        //--shelterOccupancy
      return knex('shelterOccupancy')
            .insert([
              {fk_shelterUnitID:unit1ID, occupiedByName:"Carly Levy"},
              {fk_shelterUnitID:unit3ID, occupiedByName:"Carlos Levandez"},
              {fk_shelterUnitID:unit9ID, occupiedByName:"Scott Tail"},
              {fk_shelterUnitID:unit14ID, occupiedByName:"Lisa Sue"},
              {fk_shelterUnitID:unit6ID, occupiedByName:"Murphy Brown"},
              {fk_shelterUnitID:unit12ID, occupiedByName:"Bart Simpson"}
            ])
      .returning('*');
    })
     .catch(function(err){
      console.log("There was an error adding these occupancy records", err);
      throw new Error("There was an error adding these occupancy records", err);
    })   
    .then(function(){
        // --shelterManagers
      return knex('shelterManagers')
            .insert([
              {accessApproved: true, fk_userID: user3, fk_shelterID: shelter1ID}
            ])
      .returning('*');
    })
     .catch(function(err){
      console.log("There was an error adding these shelter managers", err);
      throw new Error("There was an error adding these shelter managers", err);
    })   
    .then(function(){
        // --orgAdmins
      return knex('orgAdmins')
            .insert([
              {fk_userID: user3, fk_organizationID: org1}
            ])
      .returning('*');
    })
     .catch(function(err){
      console.log("There was an error adding these organization admins", err);
      throw new Error("There was an error adding these organization admins", err);
    })   
);
};