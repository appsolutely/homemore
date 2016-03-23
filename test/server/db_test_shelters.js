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
  var unit = {shelterUnit: {unitSize: '2BD'}, shelters: {shelterName: 'Arches'}};
  var org = {organizations: {orgName: 'FrontSteps'}};
  var shelter = {shelters:
      {shelterName: 'Arches', shelterEmail: 'example@example.com', shelterEmergencyPhone: '555-5555', shelterDayTimePhone: '555-5555'},
      organizations: org.organizations,
      locations:{name: 'Greenfield Apartments', street: '1352 N. Austin Blvd.', city: 'Austin', state: 'TX', zip: '78703', phone: '555-5555'}, 
      hours: {monday: 'Open 9-18', tuesday: 'Open 9-18', wednesday: 'Open 9-18', thursday: 'Open 9-18', friday: 'Open 9-18', saturday: 'Open 9-18', sunday: 'Open 9-18'}};
  var occupant = {occupancy: {name: 'John Smith', unitSize: '2BD', entranceDate:'04/08/2015', exitDate:'04/14/2015'}};
  var eligibility = {eligibility: {eligibilityOption: 'Vets'}, shelterName: 'Arches'};
  var shelterId;

  beforeEach(function(){
    return db.deleteEverything()
    .then(function(){  
    return orgRecs.insertOrganization(org);
    })
    .then(function(resp){
      var orgId = resp[0].orgId;
      return knex.insert({eligibilityOption: 'Vets', eligibilityOptionDescription: 'beds for vets'}).into('eligibilityOptions');
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

  it('should update shelters', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterID = resp[0].shelterID;
            var updateShelter = {shelters: {shelterID: shelterID, shelterName: 'Emergency Shelter', shelterEmail: 'different@example.com'}, organizations: org.organizations};
            return shelterRecs.updateShelter(updateShelter);
          })
          .then(function(resp){
            expect(resp).to.be.an.instanceOf(Array);
            expect(resp).to.have.length(1);
            expect(resp[0].shelterName).to.equal('Emergency Shelter');
            expect(resp[0].shelterEmail).to.equal('different@example.com');
          });
  })

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
              return shelterRecs.insertShelterUnit(unit)
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].unitSize).to.equal('2BD');
              });
            });
  });

  it('should insert Shelter eligibility', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
    return shelterRecs.insertShelterEligibility(eligibility)
            .then(function(resp){
              expect(resp).to.be.an.instanceOf(Array);
              expect(resp).to.have.length(1);
              expect(resp[0].fk_eligibilityOptionID).to.not.equal(undefined);
            });
          });
  });

  it('should insert shelter occupancy', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
    return shelterRecs.insertShelterUnit(unit)
          .then(function(resp){
            occupant.unit = resp[0].shelterUnitID;
    return shelterRecs.insertShelterOccupancy(occupant)
          .then(function(resp){
            expect(resp).to.have.length(1);
            expect(resp[0].occupiedByName).to.equal('John Smith');
          });

      });
      });
  });

  it('should update shelter occupancy', function(){
    var updateOccupancy = {occupancy: {name: 'Jimmy McGoo'}};
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
    return shelterRecs.insertShelterUnit(unit)
          .then(function(resp){
            occupant.unit = resp[0].shelterUnitID;
    return shelterRecs.insertShelterOccupancy(occupant)
          .then(function(resp){
            updateOccupancy.occupancy.occupancyID = resp[0].occupancyID;
    return shelterRecs.updateShelterOccupancy(updateOccupancy)
            .then(function(resp){
              expect(resp).to.be.an.instanceOf(Array);
              expect(resp).to.have.length(1);
              expect(resp[0].occupiedByName).to.equal('Jimmy McGoo');
            });
          });
          });
  });
        });

  it('should update occupants unit', function(){
     var updateOccupancy = {occupancy: {name: 'Jimmy McGoo'}};
     return shelterRecs.insertShelter(shelter)
           .then(function(resp){
             var shelterId = resp[0].shelterID;
     return shelterRecs.insertShelterUnit(unit)
           .then(function(resp){
             occupant.unit = resp[0].shelterUnitID;
             updateOccupancy.occupancy.unit = resp;
     return shelterRecs.insertShelterOccupancy(occupant)
           .then(function(resp){
             updateOccupancy.occupancy.occupancyID = resp[0].occupancyID;
     return shelterRecs.updateShelterOccupancy(updateOccupancy)
             .then(function(resp){
               expect(resp).to.be.an.instanceOf(Array);
               expect(resp).to.have.length(1);
               expect(resp[0].occupiedByName).to.equal('Jimmy McGoo');
             });
           });
        });
    }); 
  });

  it('should fetch shelter occupancy', function(){
    var occupancyID;
    return shelterRecs.insertShelter(shelter)
        .then(function(resp){
    return shelterRecs.insertShelterUnit(unit)
        .then(function(resp){
          occupant.unit = resp[0].shelterUnitID;
    return shelterRecs.insertShelterOccupancy(occupant)
        .then(function(resp){
          occupancyID = resp[0].occupancyID;
    return shelterRecs.selectShelterOccupancy(occupancyID)
                .then(function(resp){
                  expect(resp).to.be.an.instanceOf(Array);
                  expect(resp).to.have.length(1);
                  expect(resp[0].occupiedByName).to.equal('John Smith');
                });
          //should be passed just the shelterId directly
        });
      });
    });
  });

  it('should delete shelter occupancy', function(){
    // var occupied = {occupancy: {name: 'Jimmy McGoo'}};
    var occupancyID;
    return shelterRecs.insertShelter(shelter)
        .then(function(resp){
    return shelterRecs.insertShelterUnit(unit)
        .then(function(resp){
          occupant.unit = resp[0].shelterUnitID;
    return shelterRecs.insertShelterOccupancy(occupant)
        .then(function(resp){
          occupancyID = resp[0].occupancyID;     
    return shelterRecs.deleteShelterOccupancy({occupant: occupancyID, organizations: {orgName: 'FrontSteps'}})
        .then(function(resp){
          expect(resp).to.have.length(1);
          expect(resp[0].occupiedByName).to.equal('John Smith');
        it('should not fetch deleted occupancy', function(){
        return shelterRecs.selectShelterOccupancy(occupancyID)
          .then(function(resp){
            expect(resp).to.have.length(0);
            });
          });
        });
      });
    });
  });
});


  it('should delete shelter eligibility', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(resp){
            var shelterId = resp[0].shelterID;
            return shelterRecs.insertShelterEligibility(eligibility);
          })
          .then(function(resp){
            var eligibilityID = resp[0];
              return shelterRecs.deleteShelterEligibility(eligibilityID)
                      .then(function(resp){
                        expect(resp).to.have.length(1);
                        expect(resp[0].eligibilityID).to.equal(undefined);
                      });
          });
  });

  it('should delete shelter units', function(){
    return shelterRecs.insertShelter(shelter)
            .then(function(resp){
              var shelterId = resp[0].shelterID;
              return shelterRecs.insertShelterUnit(unit)
          .then(function(resp){
            var unit = {unit: resp[0], organizations: {orgName: 'FrontSteps'}};
            return shelterRecs.deleteShelterUnit(unit)
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

  it('should select all shelters and all their data', function(){
    return shelterRecs.insertShelter(shelter)
          .then(function(){
            shelter.shelterName = 'Emergency Shelter';
            return shelterRecs.insertShelter(shelter);
          })
          .then(function(){
            shelter.shelterName = 'Emergency Mens Shelter';
            return shelterRecs.insertShelter(shelter);
          })
          .then(function(resp){
            return shelterRecs.selectAllShelters();
          })
          .then(function(resp){
            expect(resp).to.be.an.instanceOf(Array);
            expect(resp).to.have.length(3);
            expect(resp[0].hoursID).to.not.equal(null);
          });
  });

  after(function(){
    return db.deleteEverything();
  });
});

