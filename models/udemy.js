var settings = require("../db/settings");

var UdemySchema = settings.mongoose.Schema(
    {
        name: { type: String, required: [ true, 'Name is needed' ]},
        description: { type: String, required: true },
        instructor: [{ name: String, rating: Number }],
        amount: Number,
        offer: {
            discount: Number,
            description: String,
            expires: { type: Date, required: false }
        },
        subtitles: { type: Boolean, required: true, default: false },
        language: String,
        prerequisite: { type: String, required: true },
        duration: { type: Number, required: true },
        rating: Number
    }
);

exports.Course = settings.mongoose.model('udemy', UdemySchema);