require('../testHelper.js');
var db = require(__db + '/db');
var OrgReqs = require(__server + '/organizations');
var ShelterReqs = require(__server + '/shelters');
var request = require('supertest-as-promised');
var config = require('../knexfile.js');  
var env =  'test';  
var knex = require('knex')(config[env]);


describe('Database Calls', function(){
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
              });
  });

}); 

