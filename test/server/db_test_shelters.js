require('../test-helper.js');
var request = require('supertest-as-promised');
var orgRecs = require(__server + '/dbHelpers/organizations');
var shelterRecs = require(__server + '/dbHelpers/shelters');
var locRecs = require(__server + '/dbHelpers/locations');
var userRecs = require(__server + '/dbHelpers/users');
var db = require(__db + '/db.js');
var config = require('../../knexfile.js').test;
var knex = require('knex')(config);



describe('Shelter and eligibility DB calls', function(){
  var unit = {shelterUnit: {unitSize: '2BD'}, shelterName: 'Arches'};
  var org = {organizations: {orgName: 'FrontSteps'}};
  var shelter = {shelters:
      {shelterName: 'Arches', shelterEmail: 'example@example.com', shelterEmergencyPhone: '555-5555', shelterAddress: 'an address', shelterDayTimePhone: '555-5555'},
    organizations: org.organizations};
  var occupant = {occupancy: {name: 'John Smith', unitSize: '2BD'}};
  var eligibility = {eligibility: {eligibilityOption: 'Vets'}, shelterName: 'Arches'};
  var shelterId;

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
              });
  });

  it('should fetch Shelters', function(){
    var shelterName = {shelters: shelter.shelters.shelterName};
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            shelterId = resp[0].shelterID;
              return shelterRecs.selectShelter(shelterName)
                        .then(function(resp){
                          expect(resp).to.be.an.instanceOf(Array);
                          expect(resp).to.have.length(1);
                          expect(resp[0].shelterID).to.equal(shelterId);
                          expect(resp[0].shelterName).to.equal('Arches');
                });
            });
   });

  it('should insert Shelter units', function(){
      return shelterRecs.insertShelter(shelter)
            .then(function(resp){
              console.log("Passed in response for test containing: ", resp);
              return shelterRecs.insertShelterUnit(unit)
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
    return shelterRecs.insertShelterEligibility(eligibility)
            .then(function(resp){
              expect(resp).to.be.an.instanceOf(Array);
              expect(resp).to.have.length(1);
              expect(resp[0].fk_eligibilityOptionID).to.equal(eligibilityID);
            });
          });
  });

  it('should insert shelter occupancy', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
    return shelterRecs.insertShelterUnit(unit)
          .then(function(resp){
    return shelterRecs.insertShelterOccupancy(occupant, resp)
          .then(function(resp){
            expect(resp).to.have.length(1);
            expect(resp[0].occupiedByName).to.equal('John Smith');
          });

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

  it('should delete shelter units', function(){
    return shelterRecs.insertShelter(shelter)
            .then(function(resp){
              var shelterId = resp[0].shelterID;
              return shelterRecs.insertShelterUnit(unit)
          .then(function(resp){
            return shelterRecs.deleteShelterUnit(resp)
                  .then(function(resp){
                    expect(resp).to.have.length(1);
                    expect(resp).to.be.an.instanceOf(Array);
                  });
          });
       });
  });

  it('should delete Shelters', function(){
    return shelterRecs.insertShelter(shelter)
    .then(function(resp){
      // console.log("RESPONSE ", resp)
      
      return shelterRecs.deleteShelter(resp)
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

  after(function(){
    return db.deleteEverything();
  });
});

