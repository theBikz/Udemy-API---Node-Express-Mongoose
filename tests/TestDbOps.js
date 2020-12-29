process.env.DB_URI = require("../db/clouddb").DB_URI;

var db = require("../db/udemy");
var { SingleRow, MultipleRows } = require("../data/udemy");

db.save(SingleRow, function (err, saved) {
  if (err) {
    console.log(err);
  } else {
    console.log("Success: save single row - %s", saved.name);
  }
});

db.saveMany(MultipleRows, function (err, docs) {
  if (err) {
    console.log("Failed multiple row insert");
    //console.log(err)
    //process.exit(1)
  } else {
    console.log("Success - Multiple rows inserted - %d", docs.length);
  }
});

var selectCriteria = { duration: {$gte: 10} };
db.select(selectCriteria, function (err, data) {
  if (err) {
    console.log("Failed to get vacations %s", selectCriteria);
    console.log(err);
  } else {
    console.log(
      "successfully selected docs for",
      data.length,
      JSON.stringify(selectCriteria)
    );
  }
});

var updateCriteria = { name: "PHP for Beginners - Become a PHP Master - CMS Project" };
var doc = { description: "Updated desc for testing" };
db.update(updateCriteria, doc, function (err, doc) {
  if (err) {
    console.log("Failed to get vupdate %s");
    console.log(err);
  } else {
    console.log("successfully updated criteria", updateCriteria);
  }
});

// var selectCriteriaNew = {}
//     var options = {fields:{name:1,type:1,city:1}}
//     db.select(selectCriteriaNew, options, function (err, data) {
//         if (err) {
//             console.log("Failed to get courses : %s", selectCriteriaNew)
//             console.log(err)
//             process.exit(1)
//         } else {
//             console.log("Successfully selected %d documents for %s", data.length, JSON.stringify(selectCriteriaNew))
//             console.log(data)
//             process.exit(0)
//         }
//     });
