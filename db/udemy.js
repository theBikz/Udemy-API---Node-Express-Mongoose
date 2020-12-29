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
    model.Course.updateOne(criteria, doc, function(err, data){
        callback(err, data)
    })
}

// exports.select = function(criteria, callback) {
//     model.Course.find(criteria, function(err, data) {
//         callback(err, data)
//     })
// }

exports.select = function (criteria,options, callback) {

    // Local variable for capturing limit & offset
    var lim = 5
    var off = 1
    if(options.pagination !== undefined){
        if(options.pagination.limit !== undefined)  lim = parseInt(options.pagination.limit)
        if(options.pagination.offset !== undefined)  off = parseInt(options.pagination.offset)
    }

    model.Course.find(criteria, function (err, data) {
        callback(err, data)
    }).select(options.fields).skip(off).limit(lim)
}
