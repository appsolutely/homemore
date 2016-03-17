var shelterHelpers = require('../server/dbHelpers/shelters.js');
var orgHelpers = require('../server/dbHelpers/organizations.js');
var userHelpers = require('../server/dbHelpers/users.js');

var minorsOptID, adultsOptID, substAddictOptID, vetsOptID, womenOptID, menOptID;
var ageID, houseSizeID, armedForcesID, exOffenderID, healthID, traumaSurvivorID;
var hours1ID, hours2ID, hours3ID, hours4ID, hours5ID, hours6ID, hours7ID;

var shelter1 = {shelters: {shelterName: "Men Emergency Night Shelter", shelterEmail: "email@men.com", shelterDaytimePhone:"512-444-4445", shelterEmergencyPhone:"512-444-4445"},
 locations: {name:"Front Steps Main Building", street:"500 E 7th St" , city:"Austin" , state:"TX" , zip:"78701", phone:"512-305-4100"},
 organizations: {orgName: 'Front Steps'},
 hours: {hoursMonday: "Open 8am to 4pm", hoursTuesday: "Open 8am to 4pm", hoursWednesday: "Open 8am to 4pm", hoursThursday: "Open 8am to 4pm", hoursFriday: "Open 8am to 4pm", hoursSaturday: "Open 8am to 4pm", hoursSunday: "Open 8am to 4pm"}
};

var shelter2 = {shelters: {shelterName: "Men's Day Sleep", shelterEmail: "email@men.com", shelterDaytimePhone:"512-444-4445", shelterEmergencyPhone:"512-444-4445"},
  organizations: {orgName: 'Salvation Army'},
  locations: {name:"Front Steps Main Building", street:"500 E 7th St" , city:"Austin" , state:"TX" , zip:"78701", phone:"512-305-4100"},
  hours: {hoursMonday: "Open 8am to 4pm", hoursTuesday: "Open 8am to 4pm", hoursWednesday: "Open 8am to 4pm", hoursThursday: "Open 8am to 4pm", hoursFriday: "Open 8am to 4pm", hoursSaturday: "Open 8am to 4pm", hoursSunday: "Open 8am to 4pm"}
};

var shelter3 = { shelters: {shelterName: "Men's Cold Weather Shelter", shelterEmail: "MENweathershelter@frontsteps.org", shelterDaytimePhone:"512-444-4233" , shelterEmergencyPhone:"512-444-4445"},
  organizations: {orgName: 'Safe Place'},
  locations: {locationName:"Stepfield Church" , locationStreet:"501 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78777", locationPhone:"512-305-4101"},
  hours: {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"}
};

var shelter4 = { shelters: {shelterName: "Women's Emergency Night Shelter", shelterEmail: "email@women.com", shelterDaytimePhone:"512-333-3335", shelterEmergencyPhone:"512-333-3335"},
organizations: {orgName: 'FrontSteps'},
locations: {locationName:"Convention Center", locationStreet:"502 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78745", locationPhone:"512-305-4102"},
hours: {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"}
};

var shelter5 = { shelters:{shelterName: "Women's Day Sleep", shelterEmail: "email@women.com", shelterDaytimePhone:"512-333-3335", shelterEmergencyPhone:"512-333-3335"},
  organizations: {orgName: "Salvation Army"},
  locations: {locationName:"Healing Home" , locationStreet:"503 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78756", locationPhone:"512-305-4103"},
  hours: {hoursMonday: "Open 6am to 5pm", hoursTuesday: "Open 6am to 5pm", hoursWednesday: "Open 6am to 5pm", hoursThursday: "Open 6am to 5pm", hoursFriday: "Open 6am to 5pm", hoursSaturday: "Open 6am to 5pm", hoursSunday: "Open 6am to 5pm"}
};

var shelter5 = {shelters: {shelterName: "Women's Cold Weather Shelter", shelterEmail: "womenweathershelter@frontsteps.org", shelterDaytimePhone:"512-333-4233" , shelterEmergencyPhone:"512-333-3335"},
  organizations: {orgName: "Safe Place"},
  locations: {locationName:"Healing Home" , locationStreet:"503 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78756", locationPhone:"512-305-4103"},
  hours: {hoursMonday: "Open 6am to 5pm", hoursTuesday: "Open 6am to 5pm", hoursWednesday: "Open 6am to 5pm", hoursThursday: "Open 6am to 5pm", hoursFriday: "Open 6am to 5pm", hoursSaturday: "Open 6am to 5pm", hoursSunday: "Open 6am to 5pm"}
};

var shelter6 = { shelters:{shelterName: "Children and Teen's Emergency Night Shelter", shelterEmail: "email@children.com", shelterDaytimePhone:"512-222-2225", shelterEmergencyPhone:"512-222-2225"},
  organizations: {orgName: "Front Steps"},
  locations: {locationName:"Bolder Building", locationStreet:"504 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78704", locationPhone:"512-305-4104"},
  hours: {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"}
};

var shelter7 = { shelters:{shelterName: "Youth Day Sleep", shelterEmail: "email@children.com", shelterDaytimePhone:"512-222-2225", shelterEmergencyPhone:"512-222-2225"},
  organizations: {orgName: "Salvation Army"},
  locations: {locationName:"Popup Shelter on 7th", locationStreet:"505 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78703", locationPhone:"512-305-4105"},
  hours: {hoursMonday: "Open 7am to 3pm", hoursTuesday: "Open 7am to 3pm", hoursWednesday: "Open 7am to 3pm", hoursThursday: "Open 7am to 3pm", hoursFriday: "Open 7am to 3pm", hoursSaturday: "Open 7am to 3pm", hoursSunday: "Open 7am to 3pm"}
};

var shelter8 = { shelters:{shelterName: "Children's Cold Weather Shelter Program", shelterEmail: "childrenweathershelter@frontsteps.org", shelterDaytimePhone:"512-222-4233" , shelterEmergencyPhone:"512-222-2225"},
  organizations: {orgName: "Safe Place"},
  locations: {locationName:"Alpha Delta Phi Helping Home" , locationStreet:"506 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78787", locationPhone:"512-305-4106"},
  hours:{hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Closed"}
};

var shelter9 = { shelters: {shelterName: "ARCH Emergency Night Shelter", shelterEmail: "email@email.com", shelterDaytimePhone:"512-555-5555", shelterEmergencyPhone:"512-555-5555"},
   organizations: {orgName: "Front Steps"},
   locations: {locationName:"Alpha Delta Phi Helping Home" , locationStreet:"506 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78787", locationPhone:"512-305-4106"},
   hours: {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Closed"}
};

var shelter10 = { shelters: {shelterName: "Emergency Night Shelter", shelterEmail: "email@email.com", shelterDaytimePhone:"512-555-5555", shelterEmergencyPhone:"512-555-5555"},
  organizations: {orgName: "Salvation Army"},
  locations: {locationName:"Popup Shelter on 7th", locationStreet:"505 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78703", locationPhone:"512-305-4105"},
  hours:{hoursMonday: "Open 7am to 3pm", hoursTuesday: "Open 7am to 3pm", hoursWednesday: "Open 7am to 3pm", hoursThursday: "Open 7am to 3pm", hoursFriday: "Open 7am to 3pm", hoursSaturday: "Open 7am to 3pm", hoursSunday: "Open 7am to 3pm"}
};

var shelter11 = { shelters: {shelterName: "Emergency Shelter for Women and Children", shelterEmail: "coldweathershelter@frontsteps.org", shelterDaytimePhone:"512-305-4233" , shelterEmergencyPhone:"512-555-5555"},
  organizations: {orgName: "Safe Place"},
  locations:{locationName:"Bolder Building", locationStreet:"504 E 7th St" , locationCity:"Austin" , locationState:"TX" , locationZip:"78704", locationPhone:"512-305-4104"},
  hours: {hoursMonday: "Open 24", hoursTuesday: "Open 24", hoursWednesday: "Open 24", hoursThursday: "Open 24", hoursFriday: "Open 24", hoursSaturday: "Open 24", hoursSunday: "Open 24"}
};

var unit1 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Men Emergency Night Shelter"};
var unit2 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Men Emergency Night Shelter"};
var unit3 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Men Emergency Night Shelter"};
var unit4 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Men Emergency Night Shelter"};
var unit5 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Men Emergency Night Shelter"};
var unit6 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Men's Day Sleep"};
var unit7 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Men's Day Sleep"};
var unit8 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Men's Day Sleep"};
var unit9 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Men's Cold Weather Shelter"};
var unit10 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Men's Cold Weather Shelter"};
var unit11 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Women's Emergency Night Shelter"};
var unit12 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Women's Emergency Night Shelter"};
var unit13 = {shelterUnit: {unitSize: "2BD" }, shelterName: "Women's Emergency Night Shelter"};
var unit14 = {shelterUnit: {unitSize: "2BD" }, shelterName: "Women's Day Sleep"};
var unit15 = {shelterUnit: {unitSize: "2BD" }, shelterName: "Women's Day Sleep"};
var unit16 = {shelterUnit: {unitSize: "2BD" }, shelterName: "Women's Day Sleep"};
var unit17 = {shelterUnit: {unitSize: "2BD" }, shelterName: "ARCH Emergency Night Shelter"};
var unit18 = {shelterUnit: {unitSize: "2BD" }, shelterName: "ARCH Emergency Night Shelter"};
var unit19 = {shelterUnit: {unitSize: "2BD" }, shelterName: "ARCH Emergency Night Shelter"};
var unit20 = {shelterUnit: {unitSize: "2BD" }, shelterName: "ARCH Emergency Night Shelter"};
var unit21 = {shelterUnit: {unitSize: "2BD" }, shelterName: "Emergency Night Shelter"};
var unit22 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Emergency Night Shelter"};
var unit23 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Emergency Shelter For Women and Children"};
var unit24 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Emergency Shelter For Women and Children"};
var unit25 = {shelterUnit: {unitSize: "1BD" }, shelterName: "Children's Cold Weather Shelter Program"};

exports.seed = function(knex, Promise) {
var org1, org2, org3;
  return Promise.join(
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
        console.log("SUCCESS #1");
        ageID = result[0].eligibilityOptionID;
        houseSizeID = result[1].eligibilityOptionID;
        armedForcesID = result[2].eligibilityOptionID;
        exOffenderID =  result[3].eligibilityOptionID;
        healthID = result[4].eligibilityOptionID;
        traumaSurvivorID = result[5].eligibilityOptionID;
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
                  {eligibilityOption: "Natural Disasters", eligibilityOptionDescription: "Must be a survivor of natural disaster", fk_eligibilityParentID: traumaSurvivorID },
                  {eligibilityOption: "Men", eligibilityOptionDescription: "There is a gender based requirement (men only) to qualify for this shelter."},
                  {eligibilityOption: "Women", eligibilityOptionDescription: "There is a gender based requirement (women only) to qualify for this shelter."}
              ])
              .returning('*');
        })
      .catch(function(err){
        console.log("There was an error adding this eligibility", err);
        throw new Error("There was an error adding this eligibility", err);
      })
    .then(function(eligOptions){
        console.log("SUCCESS #2");      
      minorsOptID = eligOptions[0].eligibilityOptionID;
      adultsOptID = eligOptions[1].eligibilityOptionID;
      substAddictOptID = eligOptions[6].eligibilityOptionID;
      vetsOptID = eligOptions[4].eligibilityOptionID;
      womenOptID = eligOptions[11].eligibilityOptionID;
      menOptID = eligOptions[10].eligibilityOptionID;
      //--userRoles
      return knex('userRoles')
            .insert([
              {userRoleName:"Anonymous", userRoleDescription: "Default anonymous user role for all nonregistered users."},
              {userRoleName:"Registered", userRoleDescription: "Registered users registered and logged in to site."},
              {userRoleName:"Admin", userRoleDescription: "Administrative users managing organizations."}, 
              {userRoleName:"Manager", userRoleDescription: "Administrative users managing shelters and real-time bed counts."}

            ])
            .returning('*');
    })
    .catch(function(err){
        console.log("There was an error adding this user role", err);
        throw new Error("There was an error adding this user role", err);     
    })

    .then(function(results){
        console.log("SUCCESS #5");       
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
       //insert all the shelters
       return Promise.all([
        shelterHelpers.insertShelter(shelter1),
        shelterHelpers.insertShelter(shelter2),
        shelterHelpers.insertShelter(shelter3),
        shelterHelpers.insertShelter(shelter4),
        shelterHelpers.insertShelter(shelter5),
        shelterHelpers.insertShelter(shelter6),
        shelterHelpers.insertShelter(shelter7),
        shelterHelpers.insertShelter(shelter8),
        shelterHelpers.insertShelter(shelter9),
        shelterHelpers.insertShelter(shelter10),
        shelterHelpers.insertShelter(shelter11)
      ]);
    })
    .catch(function(err){
      console.log("There was an error adding these shelters", err);
      throw new Error("There was an error adding these shelters", err);
    })
    .then(function(shelters){
        console.log("SUCCESS #9"); 
        console.log('shelters ', shelters);    
        //--shelterUnits
      return Promise.all([
            shelterHelpers.insertShelterUnit(unit1),
            shelterHelpers.insertShelterUnit(unit2),
            shelterHelpers.insertShelterUnit(unit3),
            shelterHelpers.insertShelterUnit(unit4),
            shelterHelpers.insertShelterUnit(unit5),
            shelterHelpers.insertShelterUnit(unit6),
            shelterHelpers.insertShelterUnit(unit7),
            shelterHelpers.insertShelterUnit(unit8),
            shelterHelpers.insertShelterUnit(unit9),
            shelterHelpers.insertShelterUnit(unit10),
            shelterHelpers.insertShelterUnit(unit11),
            shelterHelpers.insertShelterUnit(unit12),
            shelterHelpers.insertShelterUnit(unit13),
            shelterHelpers.insertShelterUnit(unit14),
            shelterHelpers.insertShelterUnit(unit15),
            shelterHelpers.insertShelterUnit(unit16),
            shelterHelpers.insertShelterUnit(unit17),
            shelterHelpers.insertShelterUnit(unit18),
            shelterHelpers.insertShelterUnit(unit19),
            shelterHelpers.insertShelterUnit(unit20),
            shelterHelpers.insertShelterUnit(unit21),
            shelterHelpers.insertShelterUnit(unit22),
            shelterHelpers.insertShelterUnit(unit23),
            shelterHelpers.insertShelterUnit(unit24),
            shelterHelpers.insertShelterUnit(unit25)
      ]);
    })
    .catch(function(err){
      console.log("There was an error adding these shelter units", err);
      throw new Error("There was an error adding these shelter units", err);
    })
    .then(function(units){
        console.log("SUCCESS #10");
        console.log('units! ', units);     
        var unit1ID = units[0].shelterUnitID;
        var unit2ID = units[2].shelterUnitID;
        var unit3ID = units[8].shelterUnitID;
        var unit4ID = units[13].shelterUnitID;
        var unit5ID = units[5].shelterUnitID;
        var unit6ID = units[11].shelterUnitID;

        var occupant1 = {occupancy: {name: "OJ Simpson", entranceDate:'04/08/2015', exitDate:'04/14/2015'}, unit: [{shelterUnitID: unit1ID}]};
        var occupant2 = {occupancy: {name: "George Bush Sr.", entranceDate:'04/08/2015', exitDate:'04/14/2015'}, unit: [{shelterUnitID: unit2ID}]};
        var occupant3 = {occupancy: {name: "Zac Morris", entranceDate:'05/08/2015', exitDate:'05/14/2015'}, unit: [{shelterUnitID: unit3ID}]};
        var occupant4 = {occupancy: {name: "Prince", entranceDate:'02/08/2015', exitDate:'04/14/2015'}, unit: [{shelterUnitID: unit4ID}]};
        var occupant5 = {occupancy: {name: "Celine Dion", entranceDate:'03/08/2015', exitDate:'05/14/2015'}, unit: [{shelterUnitID: unit5ID}]};
        var occupant6 = {occupancy: {name: "Bart Simpson", entranceDate:'04/08/2015', exitDate:'04/14/2015'}, unit: [{shelterUnitID: unit6ID}]};

        //--shelterOccupancy
        return Promise.all([
          shelterHelpers.insertShelterOccupancy(occupant1),
          shelterHelpers.insertShelterOccupancy(occupant2),
          shelterHelpers.insertShelterOccupancy(occupant3),
          shelterHelpers.insertShelterOccupancy(occupant4),
          shelterHelpers.insertShelterOccupancy(occupant5),
          shelterHelpers.insertShelterOccupancy(occupant6)
        ]);
    })
     .catch(function(err){
      console.log("There was an error adding these occupancy records", err);
      throw new Error("There was an error adding these occupancy records", err);
    })   
  );
};