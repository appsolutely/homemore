require('../test-helper.js');
var request = require('supertest-as-promised');
var orgRecs = require(__server + '/dbHelpers/organizations');
var shelterRecs = require(__server + '/dbHelpers/shelters');
var locRecs = require(__server + '/dbHelpers/locations');
var userRecs = require(__server + '/dbHelpers/users');
var locationsRecs = require(__server + '/dbHelpers/locations.js');
var db = require(__db + '/db.js');
var config = require('../../knexfile.js').test;
var knex = require('knex')(config);

describe('locations dbHelpers', function(){
  var newLocation = {locations:{name: 'Greenfield Apartments', street: '9th', city: 'Austin', state: 'TX', zip: '78703', phone: '555-5555'}, 
  hours: {monday: 'Open 9-18', tuesday: 'Open 9-18', wednesday: 'Open 9-18', thursday: 'Open 9-18', friday: 'Open 9-18', saturday: 'Open 9-18', sunday: 'Open 9-18'}};
  beforeEach(function(){
    return db.deleteEverything();
  });

  it('should insert into locations table', function(){
    return locationsRecs.insertLocation(newLocation)
            .then(function(resp){
              expect(resp).to.be.an.instanceOf(Array);
              expect(resp).to.have.length(1);
              expect(resp[0].locationName).to.equal('Greenfield Apartments');
              expect(resp[0].fk_hourID).to.not.equal(undefined);
              expect(resp[0].locationID).to.not.equal(undefined);
            });
  });

  it('should select locations', function(){
    var locationID;
    return locationsRecs.insertLocation(newLocation)
            .then(function(resp){
              locationID = resp[0].locationID;
              return locationsRecs.selectLocation(newLocation);
            })
            .then(function(resp){
              expect(resp).to.be.an.instanceOf(Array);
              expect(resp).to.have.length(1);
              expect(resp[0].locationName).to.equal('Greenfield Apartments');
            });
  });

  it('should update locations', function(){
    var locationID;
    return locationsRecs.insertLocation(newLocation)
              .then(function(resp){
                newLocation.locations.thisLocationID = resp[0].locationID;
                newLocation.locations.thishourID_fk = resp[0].fk_hourID;
                newLocation.locations.name = 'Different location';
                locationID = resp[0].locationID;
                return locationsRecs.updateLocation(newLocation);
              })
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
                expect(resp[0].locationID).to.equal(locationID);
                expect(resp[0].locationName).to.equal('Different location');
              });
  });


  // it('should update hours', function(){
  //   var locationID;
  //   return locationsRecs.insertLocation(newLocation)
  //             .then(function(resp){
  //               newLocation.locations.name = 'Different location';
  //               locationID = resp[0].locationID;
  //               return locationsRecs.updateLocation(newLocation);
  //             })
  //             .then(function(resp){
  //               expect(resp).to.be.an.instanceOf(Array);
  //               expect(resp).to.have.length(1);
  //               expect(resp[0].locationID).to.equal(locationID);
  //               expect(resp[0].locationName).to.equal('Different location');
  //             });
  // });

  it('should delete locations', function(){
        return locationsRecs.insertLocation(newLocation)
              .then(function(resp){
                // console.log("DELETE RESP", resp);
                newLocation.locations.thisLocationID = resp[0].locationID;
                newLocation.locations.thishourID_fk = resp[0].fk_hourID;               
                return locationsRecs.deleteLocation(newLocation);
              })
              .then(function(resp){
                expect(resp).to.be.an.instanceOf(Array);
                expect(resp).to.have.length(1);
              })
              .then(function(){
                it('should not fetch deleted locations', function(){
                  return shelterRecs.selectLocation(newLocation)
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