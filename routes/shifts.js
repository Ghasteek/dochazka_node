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
        res.render('shifts/index', { 
            shifts: shifts, 
            searchFilter: req.query.filter
        });
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
   
    let searchTryOptions = {};
    let tryNewLength = 1;

    const shift = new Shift({
        date: tools.dateToInt(req.body.date),
        arrival: tools.timeToMinutes(req.body.arrival),
        departure: tools.timeToMinutes(req.body.departure),
        breakLength: tools.timeToMinutes(req.body.breakLength),
        type: req.body.type
    });

    // checking db for record with user-selected date
    try {
        searchTryOptions.date = new RegExp(tools.dateToInt(req.body.date) , 'i');
        const tryNew = await Shift.find(searchTryOptions);
        tryNewLength = tryNew.length;
        //console.log('found ' + tryNewLength + ' values'); // debug console
    } catch {
        res.redirect('/');
    }

    if (tryNewLength != 0) {    // if there was record with user-selected date found, show warning and pass inserted values, so user can edit them
        res.render('shifts/new', {
            shift: {
                date: req.body.date,
                arrival: req.body.arrival,
                departure: req.body.departure,
                breakLength: req.body.breakLength,
                type: req.body.type
            },
            errorMessage: 'This shift already exists...'
        });
        //console.log('exists - ' + tryNewLength); // debug console
    } else {    // if user-selected date is free, add new record to db and redirect on all records page
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
    }
});

module.exports = router