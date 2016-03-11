require('../test-helper.js');
var request = require('supertest-as-promised');
var orgRecs = require(__server + '/dbHelpers/organizations');
var shelterRecs = require(__server + '/dbHelpers/shelters');
var locRecs = require(__server + '/dbHelpers/locations');
var userRecs = require(__server + '/dbHelpers/users');
var db = require(__db + '/db.js');
var config = require('../../knexfile.js').test;
var knex = require('knex')(config);



xdescribe('users DB calls', function(){
  var publicUser = {pubUser: {firstName: 'Joe', lastName: 'Schmoe', password: 'longencryptedstring', email: 'joe@example.com'}};
  var adminUser = {adminUser: {firstName: 'Billy', lastName: 'the kid', password: 'anotherlongstring', email: 'billy@example.com'}, organizations:{orgName:'FrontSteps'}};    
  var newAdmin = {adminUser: {firstName: 'Jane', lastName: 'Smith', password: 'k9isthebest', email: 'jane@example.com'}, organizations: {orgName: 'FrontSteps'}};
  var email = {user: {email: 'jane@example.com'}};
  var org = {organizations: {orgName: 'FrontSteps'}};
  var managerUser = {managerUser: {firstName: 'Tilly', lastName: 'Smalls', email: 'tilly@example.com'}, 
  organizations: {orgName: 'FrontSteps'}, 
  shelters:{shelterName: 'Arches', shelterEmail: 'example@example.com', shelterEmergencyPhone: '555-5555', shelterAddress: 'an address', shelterDayTimePhone: '555-5555'},
};
  var newManagerUser = {managerUser: {firstName: 'Bob', lastName: 'Bobingson', email: 'newGuy@example.com'}, organizations: {orgName: 'FrontSteps'}, shelters: {shelterName: 'Arches'}};

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

  it('should create new public users', function(){
    return userRecs.addNewPublic(publicUser)
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].userFirstName).to.equal('Joe');
                      expect(resp[0].userID).to.not.equal(undefined);
                    });
  });

  it('should create new admins for new organizations', function(){
    return userRecs.addNewAdmin(adminUser)
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(1);
                    expect(resp[0].user.userFirstName).to.equal('Billy');
                    expect(resp[0].adminID.orgAdminID).to.not.equal(undefined);
                  });
  });

  it('should allow admin users to be added to existing organizations', function(){
        return orgRecs.insertOrganization(org)
                  .then(function(){
                    return userRecs.addNewAdmin(adminUser);
                  })
                  .then(function(){
                      return userRecs.addNewAdmin(newAdmin);
                  })
                  .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].user.userFirstName).to.equal('Jane');
                      expect(resp[0].adminID.orgAdminID).to.not.equal(undefined);
                      expect(resp[0].user.userID).to.not.equal(undefined);
                  });
  });

  it('should allow orgAdmin users to create new shelterManagers', function(){
    return orgRecs.insertOrganization(org)
                  .then(function(){
                    return userRecs.addNewManager(managerUser);
                  })
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(1);
                    expect(resp[0].user.userFirstName).to.equal('Tilly');
                    expect(resp[0].shelterID.managerID).to.not.equal(undefined);
                    expect(resp[0].user.userID).to.not.equal(undefined);
                  });
  });

  it('should allow orgAdmin users to add managers to existing shelters', function(){
    return orgRecs.insertOrganization(org)
                  .then(function(){
                    return userRecs.addNewManager(managerUser);
                  })
                  .then(function(){
                    return userRecs.addNewManager(newManagerUser);
                  })
                  .then(function(resp){
                    expect(resp).to.be.an.instanceOf(Array);
                    expect(resp).to.have.length(1);
                    expect(resp[0].user.userFirstName).to.equal('Bob');
                    expect(resp[0].user.userID).to.not.equal(undefined);
                    expect(resp[0].shelterID.managerID).to.not.equal(undefined);
                  });
  });

  it('should allow users to update passwords', function(){
    var adminUserId, oldPass;
    var newPass = {body: {user: {password: 'newlongstring'}}, session: {}};
    return userRecs.addNewAdmin(adminUser)
                    .then(function(resp){
                      newPass.session.fk_userID = resp[0].user.userID;
                      oldPass = resp[0].user.userPassword;
                      return userRecs.updateUser(newPass);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                    });
  });

  it('should allow users to update email', function(){
    var adminUserId;
    var newEmail = {body: {user: {email: 'jane2@email.com'}}, session: {}};
        return userRecs.addNewAdmin(adminUser)
                    .then(function(resp){
                      newEmail.session.fk_userID = resp[0].user.userID;
                      return userRecs.updateUser(newEmail);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].userEmail).to.equal('jane2@email.com');
                    });
  });

  it('should allow users to update firstname', function(){
    var adminUserId;
    var newfirst = {body: {user: {firstName: 'Jill'}}, session: {}};
    return userRecs.addNewAdmin(adminUser)
                    .then(function(resp){
                      newfirst.session.fk_userID = resp[0].user.userID;
                      return userRecs.updateUser(newfirst);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].userFirstName).to.not.equal('Jane');
                    });
  });

  it('should allow users to update lastname', function(){
    var adminUserId;
    var newlast = {body: {user: {lastName: 'Hill'}}, session: {}};
    return userRecs.addNewAdmin(adminUser)
                    .then(function(resp){
                      newlast.session.fk_userID = resp[0].user.userID;
                      return userRecs.updateUser(newlast);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].userLastName).to.not.equal('Smith');
                    });
  });

  it('should find users by userID', function(){
    var adminUserId;
        return userRecs.addNewAdmin(newAdmin)
                    .then(function(resp){
                      adminUserId = resp[0].user.userID;
                      return userRecs.findByUserID(adminUserId);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].userFirstName).to.equal('Jane');
                      expect(resp[0].userEmail).to.equal('jane@example.com');
                    });

  });

  it('should find users by email', function(){
    return userRecs.addNewAdmin(newAdmin)
                    .then(function(){
                      return userRecs.findByUserEmail(email);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].userFirstName).to.equal('Jane');
                    });
  });

  it('should be able to return users role', function(){
    return userRecs.addNewAdmin(newAdmin)
                    .then(function(resp){
                      var adminUserId = resp[0].user.userID;
                      return userRecs.findUserRole(adminUserId);
                    })
                    .then(function(resp){
                      expect(resp).to.equal('Admin');
                    });

  });

  it('should be able to find an admins organization', function(){
    return userRecs.addNewAdmin(newAdmin)
                    .then(function(resp){
                      var adminUserId = resp[0].user.userID;
                      return userRecs.findUserOrganization(adminUserId);
                    })
                    .then(function(resp){
                      expect(resp).to.be.an.instanceOf(Array);
                      expect(resp).to.have.length(1);
                      expect(resp[0].organizationName).to.equal('FrontSteps');
                    });
  });

  after(function(){
    return db.deleteEverything();
  });
});