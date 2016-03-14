

exports.seed = function(knex, Promise) {

var reqID_Adult, reqID_Veteran, reqID_Individual, reqID_Addiction, reqID_Family;
var reqID_Minor, reqID_Men, reqID_Women, shelterMens_ID, shelterMens2_ID, shelterMens3_ID;
var shelterWomens_ID, shelterWomens2_ID, shelterWomens3_ID, shelterChildren_ID, shelterChildren2_ID, shelterChildren3_ID;

  return Promise.join(

    // Deletes ALL existing entries
    // knex('eligibilityOptions').del()

       knex('eligibilityOptions')
          .insert([
              {eligibilityOption: "Men", eligibilityOptionDescription: "There is a gender based requirement (men only) to qualify for this shelter."},
              {eligibilityOption: "Women", eligibilityOptionDescription: "There is a gender based requirement (women only) to qualify for this shelter."}
          ])
          .returning('*')
      
      .catch(function(err){
        console.log("There was an error adding this eligibility", err);
        throw new Error("There was an error adding this eligibility", err);
      })
      .then(function(result){
         return knex('eligibilityOptions')
                  .returning('*')
                  .catch(function(err){
                    console.log("Error selecting eligibility options", err);
                    throw new Error("Error selecting eligibility options", err);
                  })
                  .then(function(eligOptions){
                    console.log("Successfully selected eligibility options");
                    for (var i=0;i<eligOptions.length;i++){
                        if (eligOptions[i].eligibilityOption === "Adults"){
                          reqID_Adult = eligOptions[i].eligibilityOptionID;
                        }
                        else if (eligOptions[i].eligibilityOption === "Veterans"){
                          reqID_Veteran = eligOptions[i].eligibilityOptionID;
                        }
                        else if (eligOptions[i].eligibilityOption === "Individuals"){
                          reqID_Individual = eligOptions[i].eligibilityOptionID;
                        }
                        else if (eligOptions[i].eligibilityOption === "Substance Dependency"){
                          reqID_Addiction = eligOptions[i].eligibilityOptionID;
                        }   
                        else if (eligOptions[i].eligibilityOption === "Families"){
                          reqID_Family = eligOptions[i].eligibilityOptionID;
                        }        
                        else if (eligOptions[i].eligibilityOption === "Minors"){
                          reqID_Minor = eligOptions[i].eligibilityOptionID;
                        }
                        else if (eligOptions[i].eligibilityOption === "Men"){
                          reqID_Men = eligOptions[i].eligibilityOptionID;
                        }        
                        else if (eligOptions[i].eligibilityOption === "Women"){
                          reqID_Women = eligOptions[i].eligibilityOptionID;
                        }
                    }
                  })
        .then(function(){
            return knex.select('*').from("shelters")
            .catch(function(err){
              console.log("Something went wrong selecting this shelter ", err);
              throw new Error("Something went wrong selecting these shelter", err);           
            })
            .then(function(shelters){
            console.log("Successfully returned select shelters", shelters );
              for (var j=0;j<shelters.length;j++){
                if (shelters[j].shelterName === "Men Emergency Night Shelter") {
                  shelterMens_ID = shelters[j].shelterID;
                }
                else if (shelters[j].shelterName === "MEN Day Sleep"){
                  shelterMens2_ID = shelters[j].shelterID;
                }
                else if (shelters[j].shelterName === "MEN Weather Shelter Program"){
                  shelterMens3_ID = shelters[j].shelterID;
                }
                else if (shelters[j].shelterName === "women Emergency Night Shelter"){
                  shelterWomens_ID = shelters[j].shelterID;
                }
                else if (shelters[j].shelterName === "women Day Sleep"){
                  shelterWomens2_ID = shelters[j].shelterID;
                }
                else if (shelters[j].shelterName === "women Weather Shelter Program"){
                  shelterWomens3_ID = shelters[j].shelterID;
                }
                else if (shelters[j].shelterName === "children Emergency Night Shelter"){
                  shelterChildren_ID = shelters[j].shelterID;
                }
                else if (shelters[j].shelterName === "children Day Sleep"){
                  shelterChildren2_ID = shelters[j].shelterID;
                }
                 else if (shelters[j].shelterName === "children Weather Shelter Program"){
                  shelterChildren3_ID = shelters[j].shelterID;
                }
              }
            })
          .then(function(){
           return knex('shelterEligibility')
              .insert([
                  {fk_shelterID: shelterMens_ID, fk_eligibilityOptionID:reqID_Men },
                  {fk_shelterID: shelterMens2_ID, fk_eligibilityOptionID:reqID_Men },
                  {fk_shelterID: shelterMens3_ID, fk_eligibilityOptionID:reqID_Men },
                  {fk_shelterID: shelterWomens_ID, fk_eligibilityOptionID:reqID_Women },
                  {fk_shelterID: shelterWomens2_ID, fk_eligibilityOptionID:reqID_Women },
                  {fk_shelterID: shelterWomens3_ID, fk_eligibilityOptionID:reqID_Women },
                  {fk_shelterID: shelterChildren_ID, fk_eligibilityOptionID:reqID_Minor },
                  {fk_shelterID: shelterChildren2_ID, fk_eligibilityOptionID:reqID_Minor },
                  {fk_shelterID: shelterChildren3_ID, fk_eligibilityOptionID:reqID_Minor }

              ])
              .returning('*');
          })
          .catch(function(err){
            console.log("There was an error adding these shelter eligibility records", err);
            throw new Error("There was an error adding these shelter eligibility records", err);
          })
          .then(function(results){
            console.log("ID", shelterChildren3_ID, reqID_Men);
            console.log("Successfully added shelter eligibility records", results);
            return results;
          });
        });
        })
      );
    };