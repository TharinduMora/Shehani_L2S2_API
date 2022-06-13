const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tripHaultSchema = new Schema({
    name: { type: String, required: true },
    tripId: { type: Schema.Types.ObjectId, ref: 'Trip' },
    timeSinceTripStart: { type: Number, required: true }, // minutes since trip start time. if start time 12am and hault-time is 1am -> timeSinceTripStart = 60
    location: {
        type: { type: String },
        coordinates: []
    }
});
module.exports = mongoose.model('Trip-Hault', tripHaultSchema);
