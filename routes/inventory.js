const express = require('express');
const router = express.Router();
const Shift = require('../models/shift');
const tools = require('../tools');

// all shifts route
router.get('/', async (req, res) => {
    let searchOptions = {};
    // if there is passed "filter" bz GET, use it to filter search, because of that is date saved in db as text...
    if (req.query.filter != null && req.query.filter !=='') {
        searchOptions.date = new RegExp(req.query.filter  , 'i');
    }
    try {
        const shifts = await Shift.find(searchOptions);
        //console.log(shifts.length);
        res.render('inventory/index');
    } catch {
        res.redirect('/');
    }
});

// add new shift page route
router.get('/new', (req, res) => {
    res.render('shifts/new', { shift: new Shift()})
});

// edit shift page route
router.get('/edit', (req, res) => {
    res.render('shifts/edit')
});

// Create new shift route
router.post('/', async (req, res) => {
   
    
});

module.exports = router