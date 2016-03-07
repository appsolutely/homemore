var request = require('supertest-as-promised');
// var should = chai.should();
var chai = require('chai');
var knex = require(__db + '/db.js');
var config = require('../../knexfile.js').test;
var routes  = require(__server + '/server.js');
var expect = chai.expect();
//var shelteredAPI = require(__server + '123123.js');
//

// // all paths GET: api/shelterlist     -- all shelters
//           POST: api/shelterlist    -- filtered results
//           POST: api/newPublicUser  -- non-admin     -sign-up
//           POST: api/newAdminUser   -- array of objects   - test that it's not trying to create a user twice - should check if user already exists
//           POST: api/signin         -- check for session   - look in shelters.js 
//           //paths to let them update their names, emails
//          
// 

describe('Sheltered API', function(){

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()
  
  // before(function(){
  //   return
  // })
  //clear DB before each test
  beforeEach(function() {
    return knex.deleteEverything();
  });

    it('exists',function(){
        return request(app)
          .get('/api/shelters')
          .expect(200)
          .expect(function(response){
            var shelters = response.body;
            expect(shelters).to.be.an.instanceOf(Array);
            expect(shelters).to.have.length.above(0);
          })
    })







});