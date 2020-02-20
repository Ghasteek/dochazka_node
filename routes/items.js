const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const tools = require('../tools');

// all shifts route
router.get('/', async (req, res) => {
    let searchOptions = {};
    // if there is passed "filter" bz GET, use it to filter search, because of that is date saved in db as text...
    if (req.query.filter != null && req.query.filter !=='') {
        searchOptions.date = new RegExp(req.query.filter  , 'i');
    }
    try {
        const items = await Item.find(searchOptions);
        //console.log(shifts.length);
        res.render('items/index', { 
            items: items, 
            searchFilter: req.query.filter
        });
    } catch {
        res.redirect('/');
    }
});

// add new shift page route
router.get('/new', (req, res) => {
    res.render('items/new', { item: new Item()})
});

// edit shift page route
router.get('/edit', (req, res) => {
    res.render('items/edit')
});

// Create new shift route
router.post('/', async (req, res) => {

    const item = new Item({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        slot: req.body.slot,
        armor: req.body.armor,
        attack: req.body.attack,
        strength: req.body.strength,
        vitality: req.body.vitality
    });

        try {
            const newItem = await item.save();
            //res.redirect(`shifts/${newShift.id}`);
            res.redirect('items');
        } catch {
            res.render('items/new', {
                item: item,
                errorMessage: 'Error creating new item...'
            });
        }
});

module.exports = router