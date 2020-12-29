var RESOURCE_NAME = 'udemy';
var VERSION = 'v1';
var URI = '/' + VERSION + '/' + RESOURCE_NAME;

var db = require("../../db/udemy");
var apiErrors = require("../../util/errors")
var apiMessages = require("../../util/messages")
var mcache = require("memory-cache");
var cache = (duration) => {
  return (req, res, next) => {
    let key = "_express_" + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = function(router) {
    'use strict';

    router.route(URI).get(cache(10),function(req, res, next) {
        console.log("GET Udemy course");
        //1. fields
        var fields ={}
        if(req.query && req.query.fields !== undefined){
           fields =  createFields(req.query.fields)
        }

        //2. paginations
        var pagination = {limit:0, offset:0}
        if(req.query && req.query.limit !== undefined){
            // checks should be made that limit is a number
            pagination.limit = req.query.limit
        }
        if(req.query && req.query.offset !== undefined){
            // checks should be made that limit is a number
            pagination.offset = req.query.offset
        }

        //2. Setup options
        var options = {fields:fields, pagination:pagination}
        console.log(options)

        //3. execute the query
        
        var criteria = { duration: {$gte: 40}}

        db.select(criteria,options, function(err, docs) {
            if(err) {
              var userError = processMongooseErrors(apiMessages.errors.API_MESSAGE_CREATE_FAILED, "GET", URI, err,{});
              res.setHeader('content-type', 'application/json')
              res.status(400).send(userError)
            } else {
                if(docs.length == 0) {
                    res.status(400)
                }
                console.log("Retrieved courses = %d", docs.length);
                res.send(docs)
            }
        })
    })

    function createFields(str){
      var arr = str.split(',')
      str = '{'
      for(var i=0; i < arr.length; i++){
          str += '\"' + arr[i] + '\":1'
          if(i < arr.length - 1) str += ","
      }
      str += '}'
      return JSON.parse(str)
  }

    router.route(URI).post((req, res, next) => {
        console.log("Post Courses");
    
        var doc = req.body;
    
        db.save(doc, (err, saved) => {
          if (err) {
            var userError = processMongooseErrors(apiMessages.errors.API_MESSAGE_CREATE_FAILED, "POST", URI, err,{});
                res.setHeader('content-type', 'application/json')
                res.status(400).send(userError)
          }
        });
      });
    };
    var processMongooseErrors = function (message, method, endpoint, err,payload) {
      var errorList = []
      // Check for validation error
      if (err.name === 'ValidationError'){
          errorList = processValidationErrors(err)
      } else if(err.code == 11000){
          // it could be database error - 11000 is for duplicate key
          errorList.push(apiErrors.errors.PACKAGE_ALREADY_EXISTS)
      } else {
          var errUnknown = apiErrors.errors.UNKNOWN_ERROR
          errUnknown.payload = err
          errorList = [apiErrors.errors.UNKNOWN_ERROR]
      }
      return apiErrors.create(message, method, endpoint, errorList, payload)
  }
  
 