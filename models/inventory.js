const mongoose = require('mongoose');
//const tools = require('../tools');

const inventorychema = new mongoose.Schema({
    user: {
        type: Number,
        required: true 
    },
    item: {
        type: String,
        required: true 
    },
    multiple: {
        type: Number,
        required: true 
    }
});

module.exports = mongoose.model('Inventory', inventorychema);