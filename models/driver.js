const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var driverSchema = new Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    licenseNo: { type: String },
    address: { province: { type: String }, district: { type: String } },
    qualifications: { type: String },
    rating: { type: Number },
    noOfRaters: { type: Number },
    contactNumbers: [{ contactNumber: { type: Number } }]
});

module.exports = mongoose.model('Driver', driverSchema);