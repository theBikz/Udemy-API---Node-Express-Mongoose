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

// db.save(MultipleRows, function (err, saved) {
//   if (err) {
//     console.log("failed multiple rows save");
//   } else {
//     console.log("Success: Multiple rows - %s", saved.name);
//   }
// });

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

// var updateCriteria = { name: "BAHAMAS1000" };
// var doc = { description: "Updated desc for testing" };
// db.update(updateCriteria, doc, function (err, doc) {
//   if (err) {
//     console.log("Failed to get vupdate %s");
//     console.log(err);
//   } else {
//     console.log("successfully updated criteria", updateCriteria);
//   }
// });