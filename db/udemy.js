const model = require("../models/udemy");
var settings = require("../db/settings");

exports.save = function(data, callback) {
    new model.Course(data).save(function(err, inserted) {
        callback(err, inserted)
    })
}

exports.saveMany = function(rows, callback) {
    model.Course.insertMany(rows, function(err, docs) {
        callback(err, docs)
    })
}

exports.update = function(criteria, doc, callback) {
    model.Course.updateMany(criteria, doc, function(err, data){
        callback(err, data)
    })
}

exports.select = function(criteria, callback) {
    model.Course.find(criteria, function(err, data) {
        callback(err, data)
    })
}