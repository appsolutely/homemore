require('../test-helper.js');
var request = require('supertest-as-promised');

var orgRecs = require(__server + '/dbHelpers/organizations');
var shelterRecs = require(__server + '/dbHelpers/shelters');
var locRecs = require(__server + '/dbHelpers/locations');
var userRecs = require(__server + '/dbHelpers/users');
var db = require(__db + '/db.js');
var config = require('../../knexfile.js').test;


describe('Organization DB Calls', function(){
  var org = {organizations: {orgName: 'FrontSteps'}};

  beforeEach(function() {
    return db.deleteEverything();
  });

  //response should have just ID
  it('should insert organizations', function(){
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
    return orgRecs.insertOrganization(org)
                  .then(function(resp){
                    var orgId = resp[0].organizationID;
          return orgRecs.selectOrganization(org)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].organizationName).to.equal('FrontSteps');  
                      expect(resp[0].organizationID).to.equal(orgId);
                  });   
      });
  });


  it('should delete organizations', function(){
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
  });

  it('should not fetch deleted Organizations', function(){
    return orgRecs.selectOrganization(org)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp.length).to.have.length(0);
      });
    });               
  });
});

  after(function(){
   return db.deleteEverything();
  });
});



describe('Shelter and eligibility DB calls', function(){
  var unit = {shelterUnit: {unitSize: '2BD'}};
  var org = {organizations: {orgName: 'FrontSteps'}};
  var shelter = {shelters:
      {shelterName: 'Arches', shelterEmail: 'example@example.com', shelterEmergencyPhone: '555-5555', shelterAddress: 'an address', shelterDayTimePhone: '555-5555'},
    organizations: org.organizations};
  var occupant = {occupancy: {name: 'John Smith', unitSize: '2BD'}};
  var eligibility = {eligibility: {eligibilityOption: 'Vets'}};

  beforeEach(function(){
  return db.deleteEverything()
    .then(function(){  
      console.log('inserting org');
    return orgRecs.insertOrganization(org);
    })
    .then(function(resp){
      console.log('inserted organization ', resp[0]);
      var orgId = resp[0].orgId;
      return;
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


                shelterId = resp[0].shelterID;
              });
  });

  it('should fetch Shelters', function(){
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

  xit('should insert Shelter units', function(){
      return shelterRecs.insertShelter(shelter)
            .then(function(resp){
              var shelterId = resp[0].shelterID;
      return shelterRecs.insertShelterUnit(unit, shelterId)
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].unitSize).to.equal('2BD');
              });
            });
  });

  xit('should insert Shelter eligibility', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
    return shelterRecs.insertShelterEligibility(eligibility, shelterId)
            .then(function(resp){
              expect(resp).to.be.an.instanceOf(Array);
              expect(resp).to.have.length(1);
              expect(resp[0].fk_eligibilityOptionID).to.equal(eligibilityID);
            });
          });
  });

  xit('should insert shelter occupancy', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
        return shelterRecs.insertShelterOccupancy(occupant, shelterId)
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

  xit('should fetch shelter occupancy', function(){
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
                      .then(function(resp){
                        expect(resp).to.be.an.instanceOf(Array);
                        expect(resp).to.have.length(2);
                        expect(resp[0].occupiedByName).to.equal('Jimmy McGoo');
                        expect(resp[1].occupiedByName).to.equal('John Smith');
                      });
        });
  });

  xit('should delete shelter occupancy', function(){
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


  xit('should delete shelter eligibility', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
            return shelterRecs.insertShelterEligibility(eligibility, shelterId);
          })
          .then(function(resp){
            var eligibilityID = resp[0].eligibilityID;
              return shelterRecs.deleteShelterEligibility(eligibilityID)
                      .then(function(resp){
                        expect(resp).to.have.length(1);
                        expect(resp[0].eligibilityID).to.equal(eligibilityID);
                      });
          });
  });

  xit('should delete shelter units', function(){
    return shelterRecs.insertShelter(shelter)
            .then(function(resp){
              var shelterId = resp[0].shelterID;
              return shelterRecs.insertShelterUnit(unit, shelterId)
          .then(function(){
            return shelterRecs.deleteShelterUnit(unitId)
                  .then(function(resp){
                    expect(resp).to.have.length(1);
                    expect(resp[0].shelterUnitID).to.equal(unitId);
                  });
          });
       });
  });

  xit('should delete Shelters', function(){
    return shelterRecs.insertShelter(shelter)
    .then(function(resp){
      var shelterId = shelter[0].shelterID;
      return shelterRecs.deleteShelter(shelterId)
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(1);
                    expect(resp[0].shelterName).to.equal('Arches');
                  });
      }).then(function(){
      it('should not fetch deleted Shelters', function(){
        return shelterRecs.selectShelter(shelterName)
                      .then(function(resp){
                        expect(resp).to.be.an.instanceOf(Array);
                        expect(resp).to.have.length(0);
          });
        });    
      });
  });

  // after(function(){
  //   return db.deleteEverything();
  // });
});

xdescribe('users DB calls', function(){
  var publicUser = {pubUser: {firstName: 'Joe', lastname: 'Schmoe', password: 'longencryptedstring', email: 'joe@example.com'}};
  var adminUser = {adminUser: {firstName: 'Billy', lastname: 'the kid', password: 'anotherlongstring', email: 'billy@example.com'}, organizations:{orgName:'FrontSteps'}};    
  var newAdmin = {adminUser: {firstName: 'Jane', lastname: 'Smith', password: 'longsk9isthebesttring', email: 'jane@example.com'}, organizations: {orgName: 'FrontSteps'}};
  var email = {user: {email: 'jane@example.com'}};

  beforeEach(function() {
    db.deleteEverything();
  });
  it('should create new public users', function(){
    return userRecs.addNewPublic(publicUser)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].firstName).to.equal('Joe');
                      expect(resp[0].userID).to.not.equal(undefined);
                    });
  });

  it('should create new admins without existing organization', function(){
    return userRecs.addNewAdmin(adminUser)
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(1);
                    expect(resp[0].firstName).to.equal('Billy');
                    expect(resp[0].orgAdminId).to.not.equal(undefined);
                  });
  });

  it('should allow admin users to be associated with existing organizations', function(){
    var org = {organizations: {orgName: 'FrontSteps'}};
        return orgRecs.insertOrganization(org)
                  .then(function(){
                    return userRecs.addNewAdmin(adminUser);
                  })
                  .then(function(){
                      return userRecs.addNewAdmin(newAdmin);
                  })
                  .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].firstName).to.equal('Jane');
                      expect(resp[0].organizationName).to.equal('FrontSteps');
                      expect(resp[0].userID).to.not.equal(undefined);
                  });
  });

  it('should allow users to update passwords', function(){
    var newPass = {user: {userID: adminUserId, newPass: 'newlongstring'}};
    return userRecs.addNewAdmin(adminUser)
                    .then(function(resp){
                      var adminUserId = resp[0].userID;
                      var oldPass = resp[0].password;
                    })
                    .then(function(){
                      return userRecs.changePassword(newPass);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].password).to.not.equal(oldPass);
                    });
  });

  it('should allow users to update contact information', function(){
    //come back to this... which contact info for who?
  });

  it('should find users by userID', function(){
        return userRecs.addNewAdmin(newAdmin)
                    .then(function(resp){
                      var adminUserId = resp[0].userID;
                    })
                    .then(function(){
                      return userRecs.findByUserID(adminUserId);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].firstName).to.equal('Jane');
                      expect(resp[0].email).to.equal('jane@example.com');
                    });

  });

  it('should find users by email', function(){
    return userRecs.addNewAdmin(newAdmin)
                    .then(function(){
                      return userRecs.findByUserEmail(email);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].firstName).to.equal('Jane');
                    });
  });

  it('should be able to return users role', function(){
    return userRecs.addNewAdmin(newAdmin)
                    .then(function(resp){
                      var adminUserId = resp[0].userID;
                      return userRecs.findUserRole(adminUserId);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].fk_userRole).to.equal(2);
                    });
  });
  after(function(){
    db.deleteEverything();
  });
});