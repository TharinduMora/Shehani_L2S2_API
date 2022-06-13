const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    comment: { type: String, required: true },
    email: { type: String, required: true },
    rate: { type: Number, required: true },
    patientId: { type: String, required: true },
    doctorId: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);