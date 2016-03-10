require('../test-helper.js');
var userRecs = require(__server + '/dbHelpers/users');
var request = require('supertest-as-promised');
var db = require(__db + '/db.js');
var config = require('../../knexfile.js').test;
var routes  = require(__server + '/server.js');
var knex = require('knex')(config);

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
  var publicUser = {pubUser: {firstName: 'Joe', lastName: 'Schmoe', password: 'longencryptedstring', email: 'joe@example.com'}};
  var newAdmin = {adminUser: {firstName: 'Jane', lastName: 'Smith', password: 'k9isthebest', email: 'jane@example.com'}, organizations: {orgName: 'FrontSteps'}};
  var managerUser = {managerUser: {firstName: 'Tilly', lastName: 'Smalls', email: 'tilly@example.com'},
  
  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  beforeEach(function() {
    return db.deleteEverything();
  });

  beforeEach(function() {
      return db.deleteEverything()
        .then(function(){
          return knex.insert([{userRoleName: 'Public', userRoleDescription: 'a public user'}, 
                              {userRoleName: 'Admin', userRoleDescription: 'an admin user'},
                              {userRoleName: 'Manager', userRoleDescription: 'a shelter manager user'}])
                      .into('userRoles')
                      .returning('*');
        });
  });

    describe('Examining api/austin/shelters', function(){

          it('exists',function(){
              return request(app)
                .get('/api/austin/shelters')
                .expect(200)
          })

          it('returns an array of shelters',function(){
            return request(app)
              .get('/api/austin/shelters')
              .expect(200)
              .expect(function(response){
                var shelters = response.body;
                expect(shelters).to.be.an.instanceOf(Array);
                expect(shelters[0]).to.be.an('object');
                })
          })
    });
//var publicUser = {pubUser: {firstName: 'Joe', lastName: 'Schmoe', password: 'longencryptedstring', email: 'joe@example.com'}};
    describe('Examining api/signin', function(){

          beforeEach(function(){
            return userRecs.addNewPublic(publicUser);
          })

          it('signs a public user in', function(){
            return request(app)
            .post('/api/signin')
            .send({'user':{email: 'machoman@example.com', password: 'creamalwaysrises'}})
            .expect('Set-Cookie')
            .expect('sessionID=' + sessionId)
            .expect(200)
          })

          it('rejects a user with an incorrect password', function(){
            return request(app)
            .post('/api/signin')
            .send({'user':{email: 'machoman@example.com', password: 'hulkamaniac4life'}})
            .expect(500)
          })
    });

    describe('Examining api/signUpAdmin', function(){
      
          it('signs up a newAdmin', function(){
            return request(app)
            .post('/api/signUpAdmin')
            .send(newAdmin)
            .expect(201)
          })

          xit('rejects a post request from a user without admin privileges', function(){
            return request(app)
            .post('/api/signUpAdmin')
            .send(newAdmin)
            .expect(500)
          })
    }); 

    describe('Examining api/signup', function(){
          beforeEach(function(){
            return userRecs.addNewPublic(publicUser);
          })       
         
          it('signs up a public user', function(){
            return request(app)
            .post('/api/signup')
            .send({pubUser: {firstName: 'Joe', lastName: 'Schmoe', password: 'creamalwaysrises', email: 'machoman@randysavage.com'}})
            .expect(201)
            .then(function(res){
                return request(app)
                .post('/api/signin')
                .send({user: {password: 'creamalwaysrises', email: 'machoman@randysavage.com'}})
                .expect(201)
            })
          })

          it('rejects if an email already exists', function(){
            return request(app)
            .post('/api/signup')
            .send(publicUser)
            .expect(400)
          })
    });   

    xdescribe('Examining api/createManager', function(){
      
          it('signs up a new manager', function(){
            return request(app)
            .post('/api/createManager')
            .send(managerUser)
            .expect(201)
          })

          xit('rejects a post request from a user without a session', function(){
            return request(app)
            .post('/api/createManager')
            .send(newAdmin)
            .expect(500)
          })
    });

    xdescribe('Examining api/createManager', function(){
      
          it('signs up a newAdmin', function(){
            return request(app)
            .post('/api/createManager')
            .send(managerUser)
            .expect(201)
          })

          xit('rejects a post request from a user without a session', function(){
            return request(app)
            .post('/api/createManager')
            .send(newAdmin)
            .expect(500)
          })
    });  


    // describe('Examining api/austin/addShelterManager', function(){
    //       // beforeEach(function() {
    //       //   return knex.deleteEverything();
    //       // });

    //       it('exists',function(){
    //           return request(app)
    //             .get('/api/austin/addShelterManager')
    //             .expect(200)
    //       })

    //       it('accepts a post request', function(){
    //         return request(app)
    //         .post('/api/addShelterManager')
    //         .send({ username: 'MachoMan', password: 'creamalwaysrises' })
    //         .expect(201)
    //         .expect('Location', '/')
    //       })

    //       it('Redirects on a taken username', function(){
    //         return request(app)
    //         .post('/api/addShelterManager')
    //         .send({ username: 'MachoMan', password: 'creamalwaysrises' })
    //         .expect(302)
    //         .expect('Location', '/')
    //         .then(function(res){
    //           return request(app)
    //           .post('/api/addShelterManager')
    //           .send({ username: 'MachoMan', password: 'creamalwaysrises' })
    //           .expect(302)
    //           .expect('Location', '/sign-up')
    //         })
    //       })
    // }); 

    // describe('Examining api/austin/createManager', function(){

    //       it('exists',function(){
    //           return request(app)
    //             .get('/api/austin/createManager')
    //             .expect(200)
    //       })

    //       it('creates a manager record and redirects to shelter admin page', function(){
    //         return request(app)
    //         .post('/api/createManager')
    //         .send({ username: 'MachoMan', password: 'creamalwaysrises' })
    //         .expect(302)
    //         .expect('Location', '/updateShelter')
    //       })

    //       it('Redirects on a taken username', function(){
    //         return request(app)
    //         .post('/api/createManager')
    //         .send({ username: 'MachoMan', password: 'creamalwaysrises' })
    //         .expect(302)
    //         .expect('Location', '/updateShelter')
    //         .then(function(res){
    //           return request(app)
    //           .post('/api/createManager')
    //           .send({ username: 'MachoMan', password: 'creamalwaysrises' })
    //           .expect(302)
    //           .expect('Location', '/sign-up')
    //         })
    //       })
    // })       
})