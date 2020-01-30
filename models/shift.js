const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    user: {
        type: String,
        required: false 
    },
    date: {
        type: String,
        required: true 
    },
    arrival: {
        type: String,
        required: true 
    },
    departure: {
        type: String,
        required: true 
    },
    breakLength: {
        type: String,
        required: true 
    },
    shiftLength: {
        type: String,
        required: false 
    },
    overtime: {
        type: String,
        required: false 
    },
    type: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('Shift', shiftSchema);