require('../testHelper.js');
var db = require(__db + '/db');
var request = require('supertest-as-promised');
var config = require('../knexfile.js');  
var env =  'test';  
var knex = require('knex')(config[env]);

var OrgReqs = require(__server + '/organizations');
var ShelterReqs = require(__server + '/shelters');


describe('Organization DB Calls', function(){
  var app = TestHelper.createApp();
  app.testReady();

  beforeEach(function(){
    return db.deleteEverything();
  });
  //response should have just ID
  it('should insert organizations', function(){
    var org = {organizations: {orgName: 'FrontSteps'}};

    return OrgReqs.insertOrganization(org)
              .expect(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp.length).to.have.length(1);
                expect(resp[0].organizationID).to.not.equal('undefined');

                var orgId = resp[0].organizationID;
              });
  });

  it('should fetch organizations', function(){
    return OrgReqs.selectOrganization(org)
              .expect(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp.length).to.have.length(1);
                expect(resp[0].organizationID).to.not(orgId);
      });
  });


  it('should delete organizations', function(){
    return OrgReqs.deleteOrganization(org)
                  .expect(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp.length).to.have.length(1);
                    expect(resp[0].organizationName).to.equal('FrontSteps');
                  });
  });

  it('should not fetch deleted Organizations', function(){
    return ShelterReqs.selectOrganization(org)
                    .expect(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp.length).to.have.length(0);
      });
  });
});



// module.exports.deleteShelterEligibility = function(req, shelterEligibilityID){
//   //function for deleting specific shelter eligibility rule
// }
// module.exports.insertShelterOccupancy = function(req, shelterID, userID){
//   //inserting new 
// }
// module.exports.updateShelterOccupancy = function(req, occupancyID){
//   //function for updating shelter occupancy for a given user
// }
// module.exports.deleteShelterOccupancy = function(req, occupancyID){
//   //function for deleting specific shelter occupancy record
// }
describe('Shelter DB calls', function(){
  var app = TestHelper.createApp();
  app.testReady();

  beforeEach(function(){
    db.deleteEverything();
    var orgId = OrgReq.insertOrganization({organizations: {organizationName: 'FrontSteps'}});
    var eligibilityID = 
  });

it('should insert Shelters', function(){
    var shelter = {shelters:
      {shelterName: 'Arches', shelterEmail: 'example@example.com', shelterEmergencyPhone: '555-5555', shelterAddress: 'an address', shelterDayTimePhone: '555-5555'}
    };
    var shelterName = {shelters: shelter.shelters.shelterName};

    return ShelterReqs.insertShelter(shelter)
              .expect(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp.length).to.have.length(1);
                expect(resp[0].shelterID).to.not.equal('undefined');
                expect(resp[0].shelterName).to.equal('Arches');
                expect(resp[0].shelterEmail).to.equal('example@example.com');


                var shelterId = resp[0].shelterID;
              });
  });

  it('should fetch Shelters', function(){
    return ShelterReqs.selectShelter(shelterName)
              .expect(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].shelterID).to.equal(shelterId);
                expect(resp[0].shelterName).to.equal('Arches');
      });
  });

  it('should insert Shelter units', function(){
      var unit = {shelterUnit: {unitSize: '2BD'}};
      return ShelterReqs.insertShelterUnit(unit, shelterId)
              .expect(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].unitSize).to.equal('2BD');

                var unitId = resp[0].shelterUnitID;
              });
  });

// module.exports.insertShelterEligibility = function(req, shelterID){
//   //function for inserting shelter elgibiltiy rules
// }
  it('should insert Shelter eligibility', function(){
    var eligibility = {}
    return
  });

  it('should insert shelter occupancy', function(){

  });

  it('should update shelter occupancy', function(){

  });

  it('should fetch shelter occupancy', function(){

  });

  // module.exports.deleteShelterUnit = function(req, shelterUnitID){
//   //function for deleting specific shelter unit
// }
  it('should delete shelter occupancy', function(){

  });

  it('should not fetch deleted occupancy', function(){

  });

  it('should delete shelter eligibility', function(){

  });

  it('should delete shelter units', function(){

  });

  it('should not fetch deleted units', function(){

  });

  it('should delete Shelters', function(){
    return ShelterReqs.deleteShelter(org)
                  .expect(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp.length).to.have.length(1);
                    expect(resp[0].shelterName).to.equal('Arches');
                  });
  });

  it('should not fetch deleted Shelters', function(){
    return ShelterReqs.selectShelter(shelterName)
                  .expect(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp.length).to.have.length(0);
      });
  });
});

