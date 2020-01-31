const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    user: {
        type: Number,
        required: false 
    },
    date: {
        type: Number,
        required: true 
    },
    arrival: {
        type: Number,
        required: true 
    },
    departure: {
        type: Number,
        required: true 
    },
    breakLength: {
        type: Number,
        required: true 
    },
    shiftLength: {
        type: Number,
        required: false 
    },
    overtime: {
        type: Number,
        required: false 
    },
    type: {
        type: Number,
        required: true 
    }
});

module.exports = mongoose.model('Shift', shiftSchema);