const express = require('express');
const router = express.Router();
const Shift = require('../models/shift');
const tools = require('../tools');

// all shifts route
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.year != null && req.query.year !=='' && req.query.month != null && req.query.month !=='') {
        searchOptions.date = new RegExp(req.query.year + '-' + req.query.month, 'i');
    }
    try {
        const shifts = await Shift.find(searchOptions);
        let remakedShifts = [];
        //remakedShifts = tools.remakeShift(shifts);
        //tools.remakeShift(shifts);
        res.render('shifts/index', { 
            shifts: shifts, 
            searchMonth: req.query.month,
            searchYear: req.query.year
        });
    } catch {
        res.redirect('/');
    }
});

// add new shift route
router.get('/new', (req, res) => {
    res.render('shifts/new', { shift: new Shift()})
});

// edit shift route
router.get('/edit', (req, res) => {
    res.render('shifts/edit')
});

// Create shift route
router.post('/', async (req, res) => {
    //const newType = tools.multiply(req.body.type);
    const shift = new Shift({
        date: tools.dateToInt(req.body.date),
        arrival: tools.timeToMinutes(req.body.arrival),
        departure: tools.timeToMinutes(req.body.departure),
        breakLength: tools.timeToMinutes(req.body.breakLength),
        type: req.body.type
    });
    try {
        const newShift = await shift.save();
        //res.redirect(`shifts/${newShift.id}`);
        res.redirect('shifts');
    } catch {
        res.render('shifts/new', {
            shift: shift,
            errorMessage: 'Error creating new shift...'
        });
    }
});


module.exports = router