const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Inventory = require('../models/inventory');
//const tools = require('../tools');

// all shifts route
router.get('/', async (req, res) => {
    res.render('inventory/index');
});

// add new shift page route
router.get('/add', async (req, res) => {

    let searchOptions = {};

    try {
        const inventory = await Inventory.find(searchOptions);
        //console.log(shifts.length);
        res.render('inventory/add', { 
            inventory: inventory
        });
    } catch {
        res.redirect('/');
    }

    /* let searchOptions = {};
    const inventory = Inventory.find(searchOptions);
    //console.log(shifts.length);
    res.render('inventory/add', { 
        inventory: inventory
    }); */
});

// Create new shift route
router.post('/', async (req, res) => {
   
    let searchTryOptions = {};
    let tryNewLength = 0;
    let multiple = 1;

    // checking db for record with user-selected date
    try {
        searchTryOptions.user = 1;
        searchTryOptions.item = req.body.itemId;
        const tryNew = await Inventory.find(searchTryOptions);
        tryNewLength = tryNew.length;
        //console.log('found ' + tryNewLength + ' values'); // debug console
    } catch {
        res.redirect('/');
    }

    if (tryNewLength != 0) {    // if there was record with user-selected date found, show warning and pass inserted values, so user can edit them
        multiple = tryNewLength + 1;
    }

    const inventory = new Inventory({
        user: 1,
        item: req.body.itemId,
        multiple: multiple
    });

    try {
        const newInventory = await inventory.save();
        //res.redirect(`shifts/${newShift.id}`);
        res.redirect('inventory/add');
    } catch {
        res.render('inventory/add', {
            inventory: inventory,
            errorMessage: 'Error adding item into inventory...'
        });
    }

});

module.exports = router