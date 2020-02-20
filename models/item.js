const mongoose = require('mongoose');
//const tools = require('../tools');

const itemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true 
    },
    name: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: false 
    },
    image: {
        type: String,
        required: true 
    },
    slot: {
        type: String,
        required: true 
    },
    attack: {
        type: Number,
        required: false 
    },
    armor: {
        type: Number,
        required: true 
    },
    strength: {
        type: Number,
        required: true 
    },
    vitality: {
        type: Number,
        required: false 
    }
});

module.exports = mongoose.model('Item', itemSchema);