require('../test-helper.js');
var request = require('supertest-as-promised');

var orgRecs = require(__server + '/dbHelpers/organizations');
var shelterRecs = require(__server + '/dbHelpers/shelters');
var locRecs = require(__server + '/dbHelpers/locations');
var userRecs = require(__server + '/dbHelpers/users');
var knex = require(__db + '/db.js');
var config = require('../../knexfile.js').test;
// knex.deleteEverything();


describe('Organization DB Calls', function(){
  before(function(done) {
    knex.deleteEverything();
    done();
  });

  // beforeEach(function(done){
  //   return knex.migrate.latest()
  //       .then(function(){
  //         //anything that needs to start out in the db
  //         done();
  //       })
  //       .catch(function(err){
  //         console.error('error migrating ', err);
  //         done();
  //       });
  // });
  //response should have just ID
  it('should insert organizations', function(){
    var org = {organizations: {orgName: 'FrontSteps'}};

    return orgRecs.insertOrganization(org)
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].organizationID).to.not.equal('undefined');
                expect(resp[0].organizationName).to.equal('FrontSteps');
                console.log('response from insertOrgs', resp);
              });
  });

  it('should fetch organizations', function(){
    var org = {organizations: {orgName: 'FrontSteps'}}; 
    return orgRecs.insertOrganization(org)
                  .then(function(resp){
                    var orgId = resp[0].organizationID;
          return orgRecs.selectOrganization(org)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
                      expect(resp[0].organizationName).to.equal('FrontSteps');  
                      expect(resp[0].organizationID).to.equal(orgId);
=======
                      expect(resp[0].organizationID).to.equal(orgId);  
>>>>>>> fixed org tests
                  });   
      });
  });


  it('should delete organizations', function(){
    var org = {organizations: {orgName: 'FrontSteps'}};
        return orgRecs.insertOrganization(org)
                  .then(function(resp){
                    var orgId = resp[0].organizationID;
                    return orgRecs.deleteOrganization(org)
                        .then(function(resp){
                          expect(resp).to.be.an.instanceOf(Array);
                          expect(resp).to.have.length(1);
                          expect(resp[0].organizationName).to.equal('FrontSteps');
                          expect(resp[0].organizationID).to.equal(orgId);
                        });
                    })
                    .then(function(){
              it('should not fetch deleted Organizations', function(){
                var org = {organizations: {orgName: 'FrontSteps'}};
                return shelterRecs.selectOrganization(org)
                                .then(function(resp){
                                  expect(resp).to.be.an.instanceOf(Array);
                                  expect(resp.length).to.have.length(0);
                  });
<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
  });

  it('should not fetch deleted Organizations', function(){
    var org = {organizations: {orgName: 'FrontSteps'}};
    return orgRecs.selectOrganization(org)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp.length).to.have.length(0);
      });
    });               
  });
});

  after(function(done){
    knex.deleteEverything();
    done();
=======
      });
    });               
>>>>>>> fixed org tests
  });
});



describe('Shelter and eligibility DB calls', function(){
  before(function(done) {
    knex.deleteEverything();
    done();
  });

<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
  beforeEach(function(done){
    var unit = {shelterUnit: {unitSize: '2BD'}};
    var org = {organizations: {orgName: 'FrontSteps'}};
=======
  // beforeEach(function(done){
  //   return knex.migrate.latest()
  //       .then(function(){
  //         //anything that needs to start out in the db
  //         done();
  //       })
  //       .catch(function(err){
  //         console.error('error migrating ', err);
  //       });
  // });

xit('should insert Shelters', function(){
>>>>>>> fixed org tests
    var shelter = {shelters:
      {shelterName: 'Arches', shelterEmail: 'example@example.com', shelterEmergencyPhone: '555-5555', shelterAddress: 'an address', shelterDayTimePhone: '555-5555'}
    };
    var occupant = {occupancy: {name: 'John Smith', unitSize: '2BD'}};
    var eligibility = {eligibility: {eligibilityOption: 'Vets'}};
    return orgRecs.insertOrganization(org)
            .then(function(resp){
              var orgId = resp[0].orgId;
            });
  });

it('should insert Shelters', function(){
    return shelterRecs.insertShelter(shelter)
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].shelterID).to.not.equal('undefined');
                expect(resp[0].shelterName).to.equal('Arches');
                expect(resp[0].shelterEmail).to.equal('example@example.com');


                var shelterId = resp[0].shelterID;
              });
  });

  xit('should fetch Shelters', function(){
    var shelterName = {shelters: shelter.shelters.shelterName};
    return shelterRecs.insertShelter(shelter)
          .then(function(){
              return shelterRecs.selectShelter(shelterName)
                        .then(function(resp){
                          expect(resp).to.be.an.instanceOf(Array);
                          expect(resp).to.have.length(1);
                          expect(resp[0].shelterID).to.equal(shelterId);
                          expect(resp[0].shelterName).to.equal('Arches');
                });
            });
   });

<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
  it('should insert Shelter units', function(){
      return shelterRecs.insertShelter(shelter)
            .then(function(resp){
              var shelterId = resp[0].shelterID;
=======
  xit('should insert Shelter units', function(){
      var unit = {shelterUnit: {unitSize: '2BD'}};
>>>>>>> fixed org tests
      return shelterRecs.insertShelterUnit(unit, shelterId)
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].unitSize).to.equal('2BD');
              });
            });
  });

<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
  it('should insert Shelter eligibility', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
=======
  xit('should insert Shelter eligibility', function(){
    var eligibility = {eligibility: {eligibilityOption: 'Vets'}};
>>>>>>> fixed org tests
    return shelterRecs.insertShelterEligibility(eligibility, shelterId)
            .then(function(resp){
              expect(resp).to.be.an.instanceOf(Array);
              expect(resp).to.have.length(1);
              expect(resp[0].fk_eligibilityOptionID).to.equal(eligibilityID);
            });
          });
  });

<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
  it('should insert shelter occupancy', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
        return shelterRecs.insertShelterOccupancy(occupant, shelterId)
=======
  xit('should insert shelter occupancy', function(){
    var occupant = {occupancy: {name: 'John Smith', unitSize: '2BD'}};
    return shelterRecs.insertShelterOccupancy(occupant, shelterId)
>>>>>>> fixed org tests
                        .then(function(resp){
                          expect(resp).to.have.length(1);
                          expect(resp[0].occupiedByName).to.equal('John Smith');
                        });
                    });
  });

  xit('should update shelter occupancy', function(){
    var updateOccupancy = {occupancy: {name: 'Jimmy McGoo'}};
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
            return shelterRecs.insertShelterOccupancy(occupant, shelterId);
          })
          .then(function(resp){
            var occupancyId = resp[0].occupancyID;
            return shelterRecs.updateShelterOccupancy(updateOccupancy, occupancyId)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].occupiedByName).to.equal('Jimmy McGoo');
                    });
          });
  });

<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
  it('should fetch shelter occupancy', function(){
    return shelterRecs.insertShelter()
        .then(function(resp){
          var shelterId = resp[0].shelterID;
          return shelterRecs.insertShelterOccupancy(unit);
        })
        .then(function(resp){
          return shelterRecs.insertShelterUnit(occupant);
        })
        .then(function(){
          //should be passed just the shelterId directly
          return shelterRecs.selectShelterOccupancy(shelterId)
=======
  xit('should fetch shelter occupancy', function(){
    //should be passed just the shelterId directly
    shelterRecs.insertShelterOccupancy(unit);
    shelterRecs.insertShelterUnit(occupant);
    return shelterRecs.selectShelterOccupancy(shelterId)
>>>>>>> fixed org tests
                      .then(function(resp){
                        expect(resp).to.be.an.instanceOf(Array);
                        expect(resp).to.have.length(2);
                        expect(resp[0].occupiedByName).to.equal('Jimmy McGoo');
                        expect(resp[1].occupiedByName).to.equal('John Smith');
                      });
        });
  });

<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
  it('should delete shelter occupancy', function(){
=======
  xit('should delete shelter occupancy', function(){
    //just req should have the name of the person occuping the unit
>>>>>>> fixed org tests
    var occupied = {occupancy: {name: 'Jimmy McGoo'}};
    return shelterRecs.insertShelter()
        .then(function(resp){
          var shelterId = resp[0].shelterID;
          return shelterRecs.insertShelterOccupancy(unit);
        })
        .then(function(resp){
          return shelterRecs.insertShelterUnit(occupant);
        })
        .then(function(){     
    //req should just have the name of the person occuping the unit
          return shelterRecs.deleteShelterOccupancy(occupied)
                      .then(function(resp){
                        expect(resp).to.have.length(1);
                        expect(resp[0].occupiedByName).to.equal('Jimmy McGoo');
                      });
        })
        .then(function(){
          it('should not fetch deleted occupancy', function(){
              return shelterRecs.selectShelterOccupancy(shelterId)
                            .then(function(resp){
                              expect(resp).to.have.length(1);
                              expect(resp[0].occupiedByName).to.not.equal('Jimmy McGoo');
                            });
        });
      });
  });

<<<<<<< a0984c0cea843bcc49212336f85cab991f160021

  it('should delete shelter eligibility', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
            return shelterRecs.insertShelterEligibility(eligibility, shelterId);
          })
          .then(function(resp){
            var eligibilityID = resp[0].eligibilityID;
              return shelterRecs.deleteShelterEligibility(eligibilityID)
=======
  xit('should not fetch deleted occupancy', function(){
      return shelterRecs.selectShelterOccupancy(shelterId)
                        .then(function(resp){
                          expect(resp).to.have.length(1);
                          expect(resp[0].occupiedByName).to.not.equal('Jimmy McGoo');
                        });

  });

  xit('should delete shelter eligibility', function(){
    return shelterRecs.deleteShelterEligibility(eligibilityID)
>>>>>>> fixed org tests
                      .then(function(resp){
                        expect(resp).to.have.length(1);
                        expect(resp[0].eligibilityID).to.equal(eligibilityID);
                      });
          });
  });

<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
  it('should delete shelter units', function(){
    return shelterRecs.insertShelter(shelter)
            .then(function(resp){
              var shelterId = resp[0].shelterID;
              return shelterRecs.insertShelterUnit(unit, shelterId)
          .then(function(){
            return shelterRecs.deleteShelterUnit(unitId)
=======
  // module.exports.deleteShelterUnit = function(req, shelterUnitID){
//   //function for deleting specific shelter unit
// }
  xit('should delete shelter units', function(){
    return shelterRecs.deleteShelterUnit(unitId)
>>>>>>> fixed org tests
                  .then(function(resp){
                    expect(resp).to.have.length(1);
                    expect(resp[0].shelterUnitID).to.equal(unitId);
                  });
          });
       });
  });

<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
  it('should delete Shelters', function(){
    return shelterRecs.insertShelter(shelter)
    .then(function(resp){
      var shelterId = shelter[0].shelterID;
      return shelterRecs.deleteShelter(shelterId)
=======
  xit('should delete Shelters', function(){
    return shelterRecs.deleteShelter(org)
>>>>>>> fixed org tests
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(1);
                    expect(resp[0].shelterName).to.equal('Arches');
                  });
<<<<<<< a0984c0cea843bcc49212336f85cab991f160021
      }).then(function(){
      it('should not fetch deleted Shelters', function(){
        return shelterRecs.selectShelter(shelterName)
                      .then(function(resp){
                        expect(resp).to.be.an.instanceOf(Array);
                        expect(resp).to.have.length(0);
          });
        });    
=======
  });

  xit('should not fetch deleted Shelters', function(){
    return shelterRecs.selectShelter(shelterName)
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(0);
>>>>>>> fixed org tests
      });
  });

  after(function(done){
    knex.deleteEverything();
    done();
  });
});

describe('users DB calls', function(){
  before(function(done) {
    knex.deleteEverything();
    done();
  });

  // beforeEach(function(done){
  //  return knex.insert().into()
  //       .then(function(){
  //         //anything that needs to start out in the db
  //         done();
  //       })
  //       .catch(function(err){
  //         console.error('error migrating ', err);
  //       });
  // }); 

  xit('should create new public users', function(){
    var publicUser = {pubUser: {firstName: 'Joe', lastname: 'Schmoe', password: 'longencryptedstring', email: 'joe@example.com'}};
    return userRecs.addNewPublic(publicUser)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].firstName).to.equal('Joe');
                      expect(resp[0].userID).to.not.equal(undefined);

                      var publicUserId = resp[0].userID;
                    });
  });

  xit('should create new admins for new organizations', function(){
    var adminUser = {adminUser: {firstName: 'Billy', lastname: 'the kid', password: 'anotherlongstring', email: 'billy@example.com'}, organizations:{orgName:'FrontSteps'}};
    return userRecs.addnewAdmin(adminUser)
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(1);
                    expect(resp[0].firstName).to.equal('Billy');
                    expect(resp[0].orgAdminId).to.not.equal(undefined);
                    expect(resp[0].organizationName).to.equal('FrontSteps');
                  });
  });

  xit('should allow admin users to be associated with existing organizations', function(){
    var newAdmin = {adminUser: {firstName: 'Jane', lastname: 'Smith', password: 'longstring', email: 'jane@example.com'}, organizations: {orgName: 'FrontSteps'}};
    return userRecs.addnewAdmin(newAdmin)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].firstName).to.equal('Jane');
                      expect(resp[0].organizationName).to.equal('FrontSteps');
                      expect(resp[0].userID).to.not.equal(undefined);
                      var oldPass = resp[0].password;
                      var adminUserId = resp[0].userID;
                    });
  });

  xit('should allow users to update passwords', function(){
    var newPass = {user: {userID: adminUserId, newPass: 'newlongstring'}};
    return userRecs.changePassword(newPass)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].password).to.not.equal(oldPass);
                    });
  });

  xit('should allow users to update contact information', function(){
    //come back to this...
  });

  xit('should find users by userID', function(){
    return userRecs.findByUserID(adminUserId)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].firstName).to.equal('Jane');
                      expect(resp[0].email).to.equal('jane@example.com');
                    });

  });

  xit('should find users by email', function(){
    var email = {user: {email: 'jane@example.com'}};
    return userRecs.findByUserEmail(email)
                .then(function(resp){
                  expect(resp).to.be.an.instanceOf(Array);
                  expect(resp).to.have.length(1);
                  expect(resp[0].firstName).to.equal('Jane');
                });
  });

  xit('should be able to return users role', function(){
    return userRecs.findUserRole(adminUserId)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].userRoleName).to.equal('admin');
                    });
  });
  after(function(done){
    knex.deleteEverything();
    done();
  });
});
