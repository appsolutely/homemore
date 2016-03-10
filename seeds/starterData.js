
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    // knex('eligibilityOptions').del()

    // Inserts seed entries

//seeds insert order:
      // 1.  eligibilityOptions

  var eligibilityOptionRows = [
        {eligibilityOption: "Age", eligibilityOptionDescription: "There is an age requirement for this shelter"}, {
      eligibilityOption: "Household Size",
      eligibilityOptionDescription: "There is a household size requirement for this shelter"
    },

    {
      eligibilityOption: "Armed Forces",
      eligibilityOptionDescription:"There is an armed forces requirement for this shelter"
    },

    {
      eligibilityOption: "Ex-Offenders",
      eligibilityOptionDescription: "Must be ex-offender"      
    },
    {
      eligibilityOption: "Health",
      eligibilityOptionDescription: "There is a health related requirement to qualify for this shelter"      
    },

    {
      eligibilityOption: "Trauma Survivors",
      eligibilityOptionDescription: "There is a trauma related requirement to qualify for this shelter."      
    }]



    knex.batchInsert('eligibilityOptions', eligibilityOptionRows)
    .then(function(result){
      console.log("RESULT", result);
    })
    .catch(function(err){
      console.log("There was an error adding this eligibility", err);
      throw new Error("There was an error adding this eligibility", err);
    });
//     .then(function(eligibilityIDs){
//       var ageID = eligibilityIDs[0];
//       var houseSizeID = eligibilityIDs[1];
//       var armedForcesID = eligibilityIDs[2];
//       var exOffenderID =  eligibilityIDs[3];
//       var healthID = eligibilityIDs[4];
//       var traumaSurvivorID = eligibilityIDs[5];
//     })
//     .then(function(){

//       return knex('eligibilityOptions')
//           .insert([
//               {
//                 eligibilityOption: "Minors",
//                 eligibilityOptionDescription:"Must be younger than 18 years of age",
//                 fk_eligibilityParentID: ageID
//               },
//               {
//                 eligibilityOption: "Adults",
//                 eligibilityOptionDescription:"Must be 18 years of age and older",
//                 fk_eligibilityParentID: ageID
//               },
//               {
//                 eligibilityOption: "Active Duty",
//                 eligibilityOptionDescription: "Must be active duty.",
//                 fk_eligibilityParentID: armedForcesID
//               },
//               {
//                 eligibilityOption: "Veterans",
//                 eligibilityOptionDescription: "Must be veterans.",
//                 fk_eligibilityParentID: armedForcesID
//               },
//               {
//                 eligibilityOption: "Pregnancy",
//                 eligibilityOptionDescription: "Must be pregnant.",
//                 fk_eligibilityParentID: healthID
//               },
//               {
//                 eligibilityOption: "Substance Dependency",
//                 eligibilityOptionDescription: "Must have active substance dependency",
//                 fk_eligibilityParentID: healthID
//               },
//               {
//                 eligibilityOption: "Individuals",
//                 eligibilityOptionDescription: "Must be individual person (not families or groups)",
//                 fk_eligibilityParentID: houseSizeID
//               },
//               {
//                 eligibilityOption: "Families",
//                 eligibilityOptionDescription: "Must be families with children",
//                 fk_eligibilityParentID: houseSizeID
//               },
//               {
//                 eligibilityOption: "Domestic and Family Violence",
//                 eligibilityOptionDescription: "Must be survivor of domestic or family violence situation.",
//                 fk_eligibilityParentID: traumaSurvivorID
//               },
//               {
//                 eligibilityOption: "Natural Disasters",
//                 eligibilityOptionDescription: "Must be a survivor of natural disaster",
//                 fk_eligibilityParentID: traumaSurvivorID
//               }
//             ]);
//       })
//     .catch(function(err){
//       console.log("There was an error adding this eligibility", err);
//       throw new Error("There was an error adding this eligibility", err);
//     });
// };
    // .then(function(){
    //   // 2.  organizations      
    //   return knex('organizations').insert([
    //       {organizationName: "Front Steps"
    //       },
    //       {organizationName: "Salvation Army"
    //       },
    //       {organizationName: "Safe Place"
    //       },          
    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   })
    //   .then(function(orgs){
    //     var org1 = orgs[0];
    //     var org2 = orgs[1];
    //     var org3 = orgs[2];
    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){
    //   // 3.  userRoles
    //   return knex('userRoles').insert([
    //       {
    //         userRoleName:"Anonymous",
    //         userRoleDescription: "Default anonymous user role for all nonregistered users."
    //       },
    //       {
    //         userRoleName:"Registered",
    //         userRoleDescription: "Registered users registered and logged in to site."
    //       },
    //       {
    //         userRoleName:"Admin",
    //         userRoleDescription: "Administrative users managing shelters and real-time bed counts."
    //       },
    //     ])
    //   .returning('*')
    //   .catch(function(err){
        
    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){
    //     // 4.  users
    //   return knex('users').insert([

    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){
    //     // 5.  userEligibility
    //   return knex('userEligibility').insert([

    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){
    //     // 6.  hours
    //   return knex('hours').insert([

    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){
    //     // 7.  locations
    //   return knex('locations').insert([

    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){
    //     // 8.  shelters
    //   return knex('shelters').insert([

    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){
    //     // 9.  shelterEligibility
    //   return knex('shelterEligibility').insert([

    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){
    //     // 10.  shelterUnits
    //   return knex('shelterUnits').insert([

    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){
    //     // 11. shelterOccupancy
    //   return knex('shelterOccupancy').insert([

    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){
    //     // 12. shelterManagers
    //   return knex('shelterManagers').insert([

    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   });
    // })
    // .catch(function(err){
      
    // })
    // .then(function(){

    //     // 13. orgAdmins
    //   return knex('orgAdmins').insert([

    //     ])
    //   .returning('*')
    //   .catch(function(err){

    //   });
    // })
    // .catch(function(err){
      
    // })