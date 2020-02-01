const mongoose = require('mongoose');
const tools = require('../tools');

const shiftSchema = new mongoose.Schema({
    user: {
        type: Number,
        required: false 
    },
    date: {
        type: String,   // String, because of filtering on strings site
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

shiftSchema.virtual('dateString').get(function () {
    return tools.intToDate(this.date);
});
shiftSchema.virtual('arrivalString').get(function () {
    return tools.minutesToTime(this.arrival);
});
shiftSchema.virtual('departureString').get(function () {
    return tools.minutesToTime(this.departure);
});
shiftSchema.virtual('breakLengthString').get(function () {
    return tools.minutesToTime(this.breakLength);
});

module.exports = mongoose.model('Shift', shiftSchema);
module.exports.dateString = this.dateString;
module.exports.arrivalString = this.arrivalString;
module.exports.departureString = this.departureString;
module.exports.breakLengthString = this.breakLengthString;