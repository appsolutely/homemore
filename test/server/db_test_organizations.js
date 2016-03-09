require('../test-helper.js');
var request = require('supertest-as-promised');
var orgRecs = require(__server + '/dbHelpers/organizations');
var shelterRecs = require(__server + '/dbHelpers/shelters');
var locRecs = require(__server + '/dbHelpers/locations');
var userRecs = require(__server + '/dbHelpers/users');
var db = require(__db + '/db.js');
var config = require('../../knexfile.js').test;
var knex = require('knex')(config);

xdescribe('Organization DB Calls', function(){
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
    var orgId;
    return orgRecs.insertOrganization(org)
                  .then(function(resp){
                    orgId = resp[0].organizationID;
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

  it('should select all organizations', function(){
    return orgRecs.insertOrganization(org)
    .then(function(){
      org.orgName = 'Homeless Org';
      return orgRecs.insertOrganization(org);
    })
    .then(function(){
      return orgRecs.selectAllOrganizations();
    })
    .then(function(){
      expect(resp).to.be.an.instanceOf(Array);
      expect(resp).to.have.length(2);
    });
  });

  after(function(){
   return db.deleteEverything();
  });
});

