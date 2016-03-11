require('../test-helper.js');
var userRecs = require(__server + '/dbHelpers/users');
var request = require('supertest-as-promised');
var db = require(__db + '/db.js');
var config = require('../../knexfile.js').test;
var routes  = require(__server + '/server.js');
var knex = require('knex')(config);

var orgRecs = require(__server + '/dbHelpers/organizations');
var shelterRecs = require(__server + '/dbHelpers/shelters');
var locRecs = require(__server + '/dbHelpers/locations');
var userRecs = require(__server + '/dbHelpers/users');



describe('Sheltered API', function(){
  
  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();
  // var agent = request.agent(app);

  var unit = {shelterUnit: {unitSize: '2BD'}, shelterName: 'Arches'};
  var org = {organizations: {orgName: 'FrontSteps'}};
  var shelter = {shelters:
      {shelterName: 'Arches', shelterEmail: 'example@example.com', shelterEmergencyPhone: '555-5555', shelterAddress: 'an address', shelterDayTimePhone: '555-5555'},
      organizations: org.organizations};
  var occupant = {occupancy: {name: 'John Smith', unitSize: '2BD'}};
  var eligibility = {eligibility: {eligibilityOption: 'Vets'}, shelterName: 'Arches'};
  var publicUser = {pubUser: {firstName: 'Joe', lastName: 'Schmoe', password: 'longencryptedstring', email: 'joe@example.com'}};
  var newAdmin = {adminUser: {firstName: 'Jane', lastName: 'Smith', password: 'k9isthebest', email: 'jane@example.com'}, organizations: {orgName: 'FrontSteps'}};
  var managerUser = {headers: {}, managerUser: {firstName: 'Tilly', lastName: 'Smalls', email: 'tilly@example.com'}, 
    organizations: {orgName: 'FrontSteps'}, 
    shelters:{shelterName: 'Arches', shelterEmail: 'example@example.com', shelterEmergencyPhone: '555-5555', shelterAddress: 'an address', shelterDayTimePhone: '555-5555'},
  };

  var signInAdmin = {user: {password: 'k9isthebest', email: 'jane@example.com'}};
  var signInPublic = {user: {password: 'longencryptedstring', email: 'joe@example.com'}};
  var signInManager = {user: {email: 'tilly@example.com'}}; //add password after creation

  beforeEach(function() {
    return db.deleteEverything()
      .then(function(){
        return knex.insert([{userRoleName: 'Public', userRoleDescription: 'a public user'}, 
                            {userRoleName: 'Admin', userRoleDescription: 'an admin user'},
                            {userRoleName: 'Manager', userRoleDescription: 'a shelter manager user'}])
                    .into('userRoles');
      })
      .then(function(){
        return knex.insert({eligibilityOption: 'Vets', 
                            eligibilityOptionDescription: 'beds for vets'})
                   .into('eligibilityOptions');
      });
  });

    describe('Examining api/austin/shelters', function(){
      beforeEach(function(){
        return orgRecs.insertOrganization(org)
        .then(function(){
          return shelterRecs.insertShelter(shelter);
        });
      });

      it('should return an array of shelters',function(){
          return request(app)
            .get('/api/austin/shelters')
            .expect(200)
            .expect(function(resp){
              var shelters = resp.body;
              expect(shelters).to.be.an.instanceOf(Array);
              expect(shelters).to.have.length(1);
              expect(shelters[0].shelterName).to.equal('Arches');
              expect(shelters[0].organizationName).to.equal('FrontSteps');
            });
      });
    });


    describe('Examining api/signUpAdmin', function(){
      
      it('should sign up a newAdmin', function(){
        return request(app)
        .post('/api/signUpAdmin')
        .send(newAdmin)
        .expect(201)
        .expect(function(resp){
          var admin = resp.body;
          expect(admin).to.be.an.instanceOf(Object);
          expect(admin.success).to.not.equal(undefined);
          expect(admin.user.userFirstName).to.equal('Jane');
        });
      });

      it('should reject if an email is taken', function(){
        return userRecs.addNewAdmin(newAdmin)
          .then(function(){
            return request(app)
            .post('/api/signup')
            .send(newAdmin)
            .expect(400)
            .expect(function(resp){
              expect(resp).to.be.an.instanceOf(Object);
              expect(resp.error).to.not.equal(undefined);
            });
          });
       });

    }); 

    describe('Examining api/signup', function(){     
         
      it('should sign up a public user', function(){
        return request(app)
        .post('/api/signup')
        .send(publicUser)
        .expect(201)
        .expect(function(resp){
          var public = resp.body;
          expect(public).to.be.an.instanceOf(Object);
          expect(public.success).to.not.equal(undefined);
          expect(public.user.userFirstName).to.equal('Joe');
        });
      });

      it('should reject if an email is taken', function(){
        return userRecs.addNewPublic(publicUser)
          .then(function(){
            return request(app)
            .post('/api/signup')
            .send(publicUser)
            .expect(400)
            .expect(function(resp){
              expect(resp).to.be.an.instanceOf(Object);
              expect(resp.error).to.not.equal(undefined);
            });
          });
       });
    });  

    describe('Examining api/signin', function(){

      beforeEach(function(){
        return userRecs.addNewPublic(publicUser)
          .then(function(){
            return userRecs.addNewAdmin(newAdmin);
          })
          .then(function(){
            return userRecs.addNewManager(managerUser);
          })
          .then(function(resp){
            signInManager.user.password = resp[0].genPass;
          });
      });

      it('signs a public user in', function(){
        return request(app)
          .post('/api/signin')
          .send(signInPublic)
          .expect(201)
          .expect(function(resp){
            expect(resp.body.success).to.equal('User signed in');
            expect(resp.headers['set-cookie']).to.not.equal(undefined);
          });
      });

      it('should sign in an admin', function(){
        return request(app)
          .post('/api/signin')
          .send(signInAdmin)
          .expect(201)
          .expect(function(resp){
            expect(resp.body.success).to.equal('User signed in');
            expect(resp.headers['set-cookie']).to.not.equal(undefined);
          });
      });

      it('should sign in a manager', function(){
        return request(app)
          .post('/api/signin')
          .send(signInManager)
          .expect(201)
          .expect(function(resp){
            expect(resp.body.success).to.equal('User signed in');
            expect(resp.headers['set-cookie']).to.not.equal(undefined);
          });
      });

      it('rejects a user with an incorrect password', function(){
        signInPublic.user.password = 'notrightpassword';
        return request(app)
          .post('/api/signin')
          .send(signInPublic)
          .expect(400)
          .then(function(){
            signInPublic.user.password = 'longencryptedstring';
          });
      });
    });

    describe('Examining api/createManager', function(){

      beforeEach(function(){
        return userRecs.addNewAdmin(newAdmin)
              .then(function(){
                return userRecs.addNewPublic(publicUser);
              });
      });

      it('should create a new manager', function(){
        return request(app)
          .post('/api/signin')
          .send(signInAdmin)
          .then(function(resp){
            console.log('set session ', resp.headers['set-cookie'][0]);
            return request(app)
              .post('/api/createManager')
              .set('Cookie', resp.headers['set-cookie'][0])
              .send(managerUser)
              .expect(201)
              .expect(function(resp){
                var manager = resp.body;
                expect(manager).to.be.an.instanceOf(Object);
                expect(manager.user[0].user.userFirstName).to.equal('Tilly');
              });
            });
      });

      it('should reject a post request from a user without a session', function(){
        return request(app)
        .post('/api/createManager')
        .send(newAdmin)
        .expect(401);
      });

      it('should reject a post request from a user with a session but without permission', function(){
        return request(app)
          .post('/api/signin')
          .send(signInPublic)
          .then(function(resp){
            return request(app)
              .post('/api/createManager')
              .set('Cookie', resp.headers['set-cookie'][0])
              .send(managerUser)
              .expect(401);
          });
      });
    });

  describe('Examine updating and fetching logged in users', function(){
    var cookie;
    beforeEach(function(){
      return userRecs.addNewAdmin(newAdmin)
        .then(function(){
          return request(app)
              .post('/api/signin')
              .send(signInAdmin)
              .then(function(resp){
                cookie = resp.headers['set-cookie'][0];
              });
        });
    });

    it('should allow users to fetch their own data', function(){
      return request(app)
              .get('/api/fetchUser')
              .set('Cookie', cookie)
              .send()
              .expect(200)
              .expect(function(resp){
                var user = resp.body;
                expect(user).to.be.an.instanceOf(Array);
                expect(user).to.have.length(1);
                expect(user[0].userFirstName).to.equal('Jane');
              });
    });

    it('should allow users to update their own data', function(){
      var newPass = {user: {password: 'newlongstring'}};
      return request(app)
              .post('/api/updateUser')
              .set('Cookie', cookie)
              .send(newPass)
              .expect(201)
              .expect(function(resp){
                var user = resp.body;
                expect(user).to.be.an.instanceOf(Array);
                expect(user).to.have.length(1);
              });
    });

  });

  after(function(){
    return db.deleteEverything();
  });      
});