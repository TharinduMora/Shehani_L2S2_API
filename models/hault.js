const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var haultSchema = new Schema({
    name: { type: String, required: true },
    sequence: { type: Number, required: true },
    routeId: { type: Schema.Types.ObjectId, ref: 'Route' },
    location: {
        type: { type: String },
        coordinates: []
    }
});
haultSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Hault', haultSchema);

// loc : {
//     type : "Point",
//     coordinates : [lng, lat]
// }