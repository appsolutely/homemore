require('../test-helper.js');

var request = require('supertest-as-promised');
var knex = require(__db + '/db.js');
var config = require('../../knexfile.js').test;
var routes  = require(__server + '/server.js');

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

    describe('Examining api/austin/shelters', function(){

          it('exists',function(){
              return request(app)
                .get('/api/austin/shelters')
                .expect(200)
          })

          it('api/austin/shelters returns an array of shelters',function(){
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

    describe('Examining api/austin/signin', function(){
          // beforeEach(function() {
          //   return knex.deleteEverything();
          // });

          it('exists',function(){
              return request(app)
                .get('/api/austin/signin')
                .expect(200)
          })

    });

    describe('Examining api/austin/signup', function(){

          it('exists',function(){
              return request(app)
                .get('/api/austin/signup')
                .expect(200)
          })

          it('creates a user record and redirects', function(){
            return request(app)
            .post('/api/signup')
            .send({ username: 'MachoMan', password: 'creamalwaysrises' })
            .expect(302)
            .expect('Location', '/')
          })

          it('Redirects on a taken username', function(){
            return request(app)
            .post('/api/signup')
            .send({ username: 'MachoMan', password: 'creamalwaysrises' })
            .expect(302)
            .expect('Location', '/')
            .then(function(res){
              return request(app)
              .post('/api/signup')
              .send({ username: 'MachoMan', password: 'creamalwaysrises' })
              .expect(302)
              .expect('Location', '/sign-up')
            })
          })
    });
      describe('Examining api/austin/signupAdmin', function(){
          // beforeEach(function() {
          //   return knex.deleteEverything();
          // });

          it('exists',function(){
              return request(app)
                .get('/api/austin/signupAdmin')
                .expect(200)
          })

          it('creates a user record and redirects', function(){
            return request(app)
            .post('/api/signupAdmin')
            .send({ username: 'MachoMan', password: 'creamalwaysrises' })
            .expect(302)
            .expect('Location', '/')
          })

          it('Redirects on a taken username', function(){
            return request(app)
            .post('/api/signupAdmin')
            .send({ username: 'MachoMan', password: 'creamalwaysrises' })
            .expect(302)
            .expect('Location', '/')
            .then(function(res){
              return request(app)
              .post('/api/signup')
              .send({ username: 'MachoMan', password: 'creamalwaysrises' })
              .expect(302)
              .expect('Location', '/sign-up')
            })
          })
    }); 

    describe('Examining api/austin/createManager', function(){

          it('exists',function(){
              return request(app)
                .get('/api/austin/createManager')
                .expect(200)
          })

          it('creates a manager record and redirects to shelter admin page', function(){
            return request(app)
            .post('/api/createManager')
            .send({ username: 'MachoMan', password: 'creamalwaysrises' })
            .expect(302)
            .expect('Location', '/updateShelter')
          })

          it('Redirects on a taken username', function(){
            return request(app)
            .post('/api/createManager')
            .send({ username: 'MachoMan', password: 'creamalwaysrises' })
            .expect(302)
            .expect('Location', '/updateShelter')
            .then(function(res){
              return request(app)
              .post('/api/createManager')
              .send({ username: 'MachoMan', password: 'creamalwaysrises' })
              .expect(302)
              .expect('Location', '/sign-up')
            })
          })
    }) 

    describe('Examining api/austin/addShelterManager', function(){
          // beforeEach(function() {
          //   return knex.deleteEverything();
          // });

          it('exists',function(){
              return request(app)
                .get('/api/austin/addShelterManager')
                .expect(200)
          })

          it('accepts a post request', function(){
            return request(app)
            .post('/api/addShelterManager')
            .send({ username: 'MachoMan', password: 'creamalwaysrises' })
            .expect(201)
            .expect('Location', '/')
          })

          it('Redirects on a taken username', function(){
            return request(app)
            .post('/api/addShelterManager')
            .send({ username: 'MachoMan', password: 'creamalwaysrises' })
            .expect(302)
            .expect('Location', '/')
            .then(function(res){
              return request(app)
              .post('/api/addShelterManager')
              .send({ username: 'MachoMan', password: 'creamalwaysrises' })
              .expect(302)
              .expect('Location', '/sign-up')
            })
          })
    }); 

    describe('Examining api/austin/createManager', function(){

          it('exists',function(){
              return request(app)
                .get('/api/austin/createManager')
                .expect(200)
          })

          it('creates a manager record and redirects to shelter admin page', function(){
            return request(app)
            .post('/api/createManager')
            .send({ username: 'MachoMan', password: 'creamalwaysrises' })
            .expect(302)
            .expect('Location', '/updateShelter')
          })

          it('Redirects on a taken username', function(){
            return request(app)
            .post('/api/createManager')
            .send({ username: 'MachoMan', password: 'creamalwaysrises' })
            .expect(302)
            .expect('Location', '/updateShelter')
            .then(function(res){
              return request(app)
              .post('/api/createManager')
              .send({ username: 'MachoMan', password: 'creamalwaysrises' })
              .expect(302)
              .expect('Location', '/sign-up')
            })
          })
    })       
})