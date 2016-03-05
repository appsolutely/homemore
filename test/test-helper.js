process.env.NODE_ENV = 'test';

global.__server = __dirname + '/../server';
global.__db = __dirname + '/../db';
global.__client = __dirname + '/../client';

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
global.expect = chai.expect;

//test helper object
global.TestHelper = {};


var express = require('express');

TestHelper.createApp = function(loader) {
  var app = express();

  app.use(require('body-parser').json());

  app.testReady = function() {
    app.use(function(err, req, res, next){
      console.error("==ERROR==");
      console.error(err.stack);
      next(err);
    });
  };
  return app;
};

TestHelper.startDB = function(){
  require(__db + '/db.js');
};

var Bluebird = require('bluebird');

//promisifing coroutines
global.before_ = function(f) {before (Bluebird.coroutine(f));};
global.beforeEach_ = function(f) { beforeEach (Bluebird.coroutine(f));};
global.it_ = function(description, f) {it (description, Bluebird.coroutine(f));};
global.xit_ = function(description, f) {xit(description, f);};
global.it_.only = function(description, f) {it.only(description, Bluebird.coroutine(f));};
