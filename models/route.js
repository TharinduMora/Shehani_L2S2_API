const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var routeSchema = new Schema({
    name: { type: String, required: true },
    routeNumber: { type: Number, required: false }
});

module.exports = mongoose.model('Route', routeSchema);