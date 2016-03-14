

exports.seed = function(knex, Promise) {

var org1, org2, org3;
  return Promise.join(

    // Deletes ALL existing entries
    // knex('eligibilityOptions').del()

    // Inserts seed entries

//seeds insert order:


     knex('eligibilityOptions')
              .returning('*')
          .catch(function(err){
            console.log("Error selecting eligibility options", err);
            throw new Error("Error selecting eligibility options", err);
          })
          .then(function(eligOptions){
            console.log("Successfully selected eligibility options", eligOptions);
            return eligOptions;
          })




    //     //--userEligibility
    //   return knex('userEligibility')
    //         .insert([
    //           {fk_eligibilityOptionID: vetsOptID, fk_userID: user2},
    //           {fk_eligibilityOptionID: adultsOptID, fk_userID: user2}
    //          ])
    //         .returning('*');
    // })
    // .catch(function(err){
    //   console.log("There was an error adding these user eligibility records", err);
    //   throw new Error("There was an error adding these user eligibility records", err);
    // })    


        
 
    // .then(function(){
    //     //--shelterEligibility
    //   return knex('shelterEligibility')
    //         .insert([


    //         ])
    //   .returning('*')
    // })
    
        //--shelterUnits

    // .then(function(results){
    //     console.log("SUCCESS #11");      
    //   var shelterOccupancyResults = results;
    //     // --shelterManagers
    //   return knex('shelterManagers')
    //         .insert([
    //             {accessApproved: true, fk_userID: user3, fk_shelterID: shelter1ID}
    //         ])
    //         .returning('*');
    // })
    //  .catch(function(err){
    //   console.log("There was an error adding these shelter managers", err);
    //   throw new Error("There was an error adding these shelter managers", err);
    // })   
    // .then(function(results){
    //     console.log("SUCCESS #12");      
    //   var shelterManagersresults = results;
    //     // --orgAdmins
    //   return knex('orgAdmins')
    //         .insert([
    //             {fk_userID: user3, fk_organizationID: org1}
    //           ])
    //         .returning('*');
    // })
    //  .catch(function(err){
    //   console.log("There was an error adding these organization admins", err);
    //   throw new Error("There was an error adding these organization admins", err);
    // })   
);};