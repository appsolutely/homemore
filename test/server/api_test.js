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



xdescribe('Sheltered API', function(){
  
  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  var unit = {shelterUnit: {unitSize: '2BD'}, shelterName: 'Arches'};
  var org = {organizations: {orgName: 'FrontSteps'}};
  var shelter = {shelters:
      {shelterName: 'Arches', shelterEmail: 'example@example.com', shelterEmergencyPhone: '555-5555', shelterAddress: 'an address', shelterDayTimePhone: '555-5555'},
      organizations: org.organizations};
  var occupant = {occupancy: {name: 'John Smith', unitSize: '2BD'}};
  var eligibility = {eligibility: {eligibilityOption: 'Vets'}, shelterName: 'Arches'};
  var publicUser = {pubUser: {firstName: 'Joe', lastName: 'Schmoe', password: 'longencryptedstring', email: 'joe@example.com'}};
  var newAdmin = {adminUser: {firstName: 'Jane', lastName: 'Smith', password: 'k9isthebest', email: 'jane@example.com'}, organizations: {orgName: 'FrontSteps'}};
  var managerUser = {managerUser: {firstName: 'Tilly', lastName: 'Smalls', email: 'tilly@example.com'}};


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
            .expect(200)
            .expect(function(resp){
              expect(resp.cookie).to.not.equal(undefined);
            });
          });

          it('should sign in an admin', function(){
            return request(app)
            .post('/api/signin')
            .send(signInAdmin)
            .expect(200)
            .expect(function(resp){
              expect(resp.cookie).to.not.equal(undefined);
            });
          });

          it('should sign in a manager', function(){
            return request(app)
            .post('/api/signin')
            .send(signInManager)
            .expect(200)
            .expect(function(resp){
              expect(resp.cookie).to.not.equal(undefined);
            });
          });

          it('rejects a user with an incorrect password', function(){
            signInPublic.user.password = 'notrightnow';
            return request(app)
            .post('/api/signin')
            .send(signInPublic)
            .expect(400);
          });
    });

    xdescribe('Examining api/createManager', function(){
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
                managerUser.cookie = resp.cookie;
                return request(app)
                  .post('/api/createManager')
                  .send(managerUser)
                  .expect(201)
                  .expect(function(resp){
                    var manager = resp.body;
                    expect(manager).to.be.an.instanceOf(Array);
                    expect(manager.userFirstName).to.equal('Tilly');
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
                managerUser.cookie = resp.cookie;
                return request(app)
                  .post('/api/createManager')
                  .send(newAdmin)
                  .expect(401);
              });
          });
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